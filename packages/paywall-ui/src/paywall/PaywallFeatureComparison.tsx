import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

import { getColorWithAlpha } from "../shared/color-utils";
import { ChevronDownIcon } from "../shared/icons";
import {
  resolveComparisonCellColor,
  resolveComparisonCellGlyph,
} from "./comparison-cells";
import { resolveComparisonRowGroups } from "./feature-comparison-collapse";
import type {
  PaywallFeatureComparison as PaywallFeatureComparisonConfig,
  PaywallFeatureComparisonCell,
  PaywallFeatureComparisonRow as PaywallFeatureComparisonRowConfig,
  PaywallTheme,
} from "../types";

const EXPAND_DURATION_MS = 280;
const COLLAPSE_DURATION_MS = 220;

interface PaywallFeatureComparisonProps {
  comparison: PaywallFeatureComparisonConfig;
  theme: PaywallTheme;
  /**
   * Called with the height the expansion is about to reveal, so the screen can
   * follow the newly shown rows instead of leaving them below the fold.
   */
  onExpand?: (revealedHeight: number) => void;
}

const getCellAccessibilityLabel = (
  cell: PaywallFeatureComparisonCell,
): string | undefined => {
  if (cell.kind === "included" || cell.kind === "excluded") {
    return cell.accessibilityLabel;
  }

  return cell.text;
};

const renderCellContent = (
  cell: PaywallFeatureComparisonCell,
  column: "free" | "paid",
  theme: PaywallTheme,
  comparison: PaywallFeatureComparisonConfig,
) => {
  const glyph = resolveComparisonCellGlyph(cell, comparison.excludedStyle);
  const accessibilityLabel = getCellAccessibilityLabel(cell);

  if (glyph === null) {
    return (
      <View
        accessibilityLabel={accessibilityLabel}
        accessible={Boolean(accessibilityLabel)}
        style={styles.hiddenCell}
      />
    );
  }

  const color = resolveComparisonCellColor(cell, column, theme, comparison);
  const shouldRenderBadge =
    cell.kind === "included" && comparison.includedStyle === "circledCheck";

  if (shouldRenderBadge) {
    return (
      <View
        accessibilityLabel={accessibilityLabel}
        accessible={Boolean(accessibilityLabel)}
        style={[
          styles.checkBadge,
          { backgroundColor: getColorWithAlpha(color, 0.16) },
        ]}
      >
        <Text style={[styles.checkBadgeText, { color }]}>{glyph}</Text>
      </View>
    );
  }

  return (
    <Text
      accessibilityLabel={accessibilityLabel}
      style={[
        styles.cellText,
        cell.kind !== "text" && styles.symbolText,
        { color },
      ]}
    >
      {glyph}
    </Text>
  );
};

interface ComparisonRowProps {
  comparison: PaywallFeatureComparisonConfig;
  isLastRow: boolean;
  row: PaywallFeatureComparisonRowConfig;
  theme: PaywallTheme;
}

const ComparisonRow = ({
  comparison,
  isLastRow,
  row,
  theme,
}: ComparisonRowProps) => {
  const featureLabel = row.labelContent ?? (
    <Text
      style={[
        styles.featureLabel,
        row.onPress && styles.clickableFeatureLabel,
        { color: theme.primaryTextColor },
      ]}
    >
      {row.label}
    </Text>
  );

  return (
    <View style={styles.row}>
      {row.onPress ? (
        <Pressable
          accessibilityLabel={row.label}
          accessibilityRole="button"
          onPress={() => {
            void row.onPress?.();
          }}
          style={({ pressed }) => [
            styles.featureButton,
            pressed && styles.pressedFeatureButton,
          ]}
        >
          {featureLabel}
        </Pressable>
      ) : (
        <View style={styles.featureButton}>{featureLabel}</View>
      )}
      <View style={styles.cell}>
        {renderCellContent(row.free, "free", theme, comparison)}
      </View>
      <View style={[styles.cell, isLastRow && styles.paidCellLast]}>
        {renderCellContent(row.paid, "paid", theme, comparison)}
      </View>
    </View>
  );
};

export const PaywallFeatureComparison = ({
  comparison,
  theme,
  onExpand,
}: PaywallFeatureComparisonProps) => {
  const { collapse } = comparison;
  const { collapsibleRows, isCollapsible, staticRows } =
    resolveComparisonRowGroups(comparison.rows, collapse);
  const [isExpanded, setIsExpanded] = useState(false);
  const [collapsedHeight, setCollapsedHeight] = useState(0);
  const expandProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isCollapsible) return undefined;

    const animation = Animated.timing(expandProgress, {
      duration: isExpanded ? EXPAND_DURATION_MS : COLLAPSE_DURATION_MS,
      toValue: isExpanded ? 1 : 0,
      // Height is a layout prop, so this animation can not use the native
      // driver. The package ships no animation dependency by design.
      useNativeDriver: false,
    });

    animation.start();

    return () => animation.stop();
  }, [expandProgress, isCollapsible, isExpanded]);

  if (comparison.rows.length === 0) return null;

  const handleToggle = () => {
    const nextExpanded = !isExpanded;

    setIsExpanded(nextExpanded);

    if (nextExpanded) onExpand?.(collapsedHeight);
  };

  return (
    <View style={styles.section}>
      {comparison.title && (
        <Text style={[styles.title, { color: theme.primaryTextColor }]}>
          {comparison.title}
        </Text>
      )}

      <View
        style={[
          styles.table,
          {
            borderColor: getColorWithAlpha(
              theme.borderColor,
              0.56,
              theme.borderColor,
            ),
            backgroundColor: "transparent",
            borderRadius: theme.cardBorderRadius,
          },
        ]}
      >
        <View style={styles.headerRow}>
          <View
            style={[
              styles.headerFeature,
            ]}
          >
            {comparison.featureColumnTitle ? (
              <Text
                style={[
                  styles.headerText,
                  styles.featureHeaderText,
                  { color: theme.secondaryTextColor },
                ]}
              >
                {comparison.featureColumnTitle}
              </Text>
            ) : null}
          </View>
          <View
            style={[
              styles.headerPlan,
            ]}
          >
            <Text
              style={[styles.headerText, { color: theme.primaryTextColor }]}
            >
              {comparison.freeColumnTitle}
            </Text>
          </View>
          <View style={[styles.headerPlan, styles.paidHeader]}>
            <Text
              style={[
                styles.headerText,
                styles.paidHeaderText,
                { color: theme.accentColor },
              ]}
            >
              {comparison.paidColumnTitle}
            </Text>
          </View>
        </View>

        {staticRows.map((row, index) => (
          <ComparisonRow
            comparison={comparison}
            isLastRow={!isCollapsible && index === staticRows.length - 1}
            key={row.id}
            row={row}
            theme={theme}
          />
        ))}

        {isCollapsible && (
          <Animated.View
            accessibilityElementsHidden={!isExpanded}
            importantForAccessibility={
              isExpanded ? "auto" : "no-hide-descendants"
            }
            pointerEvents={isExpanded ? "auto" : "none"}
            style={[
              styles.collapser,
              {
                height: expandProgress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, collapsedHeight],
                }),
                opacity: expandProgress,
              },
            ]}
          >
            <View
              onLayout={(event) => {
                const nextHeight = Math.ceil(event.nativeEvent.layout.height);

                setCollapsedHeight((previousHeight) =>
                  previousHeight === nextHeight ? previousHeight : nextHeight
                );
              }}
              // Absolute so its own height never feeds back into the animated
              // height it is being measured for.
              style={styles.measuredRows}
            >
              {collapsibleRows.map((row, index) => (
                <ComparisonRow
                  comparison={comparison}
                  isLastRow={index === collapsibleRows.length - 1}
                  key={row.id}
                  row={row}
                  theme={theme}
                />
              ))}
            </View>
          </Animated.View>
        )}
      </View>

      {isCollapsible && collapse && (
        <View style={styles.toggleRow}>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ expanded: isExpanded }}
            hitSlop={8}
            onPress={handleToggle}
            style={({ pressed }) => [
              styles.toggleButton,
              {
                backgroundColor: theme.surfaceColor,
                borderRadius: theme.buttonBorderRadius,
              },
              pressed && styles.pressedToggleButton,
            ]}
          >
            <Text
              style={[styles.toggleLabel, { color: theme.secondaryTextColor }]}
            >
              {isExpanded ? collapse.collapseLabel : collapse.expandLabel}
            </Text>
            <Animated.View
              style={{
                transform: [
                  {
                    rotate: expandProgress.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "180deg"],
                    }),
                  },
                ],
              }}
            >
              <ChevronDownIcon color={theme.secondaryTextColor} />
            </Animated.View>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    gap: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 20,
  },
  table: {
    borderCurve: "continuous",
    borderWidth: 1,
    overflow: "hidden",
    padding: 12,
  },
  headerRow: {
    alignItems: "center",
    flexDirection: "row",
    minHeight: 34,
  },
  headerText: {
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 20,
    textAlign: "center",
  },
  headerFeature: {
    justifyContent: "center",
    flex: 1,
    minHeight: 34,
    minWidth: 0,
  },
  featureHeaderText: {
    textAlign: "left",
  },
  headerPlan: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 34,
    width: 70,
  },
  paidHeader: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  paidHeaderText: {
    fontSize: 16,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    minHeight: 44,
  },
  featureLabel: {
    flexShrink: 1,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 19,
    minWidth: 0,
  },
  clickableFeatureLabel: {
    textDecorationLine: "underline",
  },
  featureButton: {
    flex: 1,
    justifyContent: "center",
    minHeight: 44,
    minWidth: 0,
    paddingRight: 10,
  },
  pressedFeatureButton: {
    opacity: 0.72,
  },
  cell: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: 4,
    width: 70,
  },
  paidCellLast: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  cellText: {
    flexShrink: 1,
    fontSize: 13,
    fontWeight: "800",
    lineHeight: 17,
    textAlign: "center",
  },
  symbolText: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 24,
  },
  checkBadge: {
    alignItems: "center",
    borderRadius: 13,
    height: 26,
    justifyContent: "center",
    width: 26,
  },
  checkBadgeText: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
  },
  hiddenCell: {
    height: 26,
    width: 26,
  },
  collapser: {
    overflow: "hidden",
    width: "100%",
  },
  measuredRows: {
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  toggleRow: {
    alignItems: "center",
  },
  toggleButton: {
    alignItems: "center",
    borderCurve: "continuous",
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  pressedToggleButton: {
    opacity: 0.72,
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
});
