import { Pressable, StyleSheet, Text, View } from "react-native";

import { getColorWithAlpha } from "../shared/color-utils";
import {
  resolveComparisonCellColor,
  resolveComparisonCellGlyph,
} from "./comparison-cells";
import type {
  PaywallFeatureComparison as PaywallFeatureComparisonConfig,
  PaywallFeatureComparisonCell,
  PaywallTheme,
} from "../types";

interface PaywallFeatureComparisonProps {
  comparison: PaywallFeatureComparisonConfig;
  theme: PaywallTheme;
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

export const PaywallFeatureComparison = ({
  comparison,
  theme,
}: PaywallFeatureComparisonProps) => {
  if (comparison.rows.length === 0) return null;

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

        {comparison.rows.map((row, index) => {
          const isLastRow = index === comparison.rows.length - 1;
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
            <View key={row.id} style={styles.row}>
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
        })}
      </View>
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
});
