import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  UIManager,
  View,
  type GestureResponderEvent,
} from "react-native";

import { getColorWithAlpha } from "./color-utils";
import { ChevronDownIcon, CopyIcon } from "./icons";
import type {
  PaywallTheme,
  ProfileIdentifierItem,
  ProfileIdentifiersCopy,
  ProfileIdentifiersSectionProps,
} from "./types";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface ProfileIdentifiersSectionComponentProps {
  section: ProfileIdentifiersSectionProps & { copy: ProfileIdentifiersCopy };
  theme: PaywallTheme;
}

export const ProfileIdentifiersSection = ({
  section,
  theme,
}: ProfileIdentifiersSectionComponentProps) => {
  const [isExpanded, setIsExpanded] = useState(
    section.defaultExpanded ?? true,
  );
  const cardBackgroundColor = getColorWithAlpha(
    theme.surfaceColor,
    0.42,
    theme.surfaceColor,
  );
  const expandProgress = useRef(
    new Animated.Value(section.defaultExpanded ?? true ? 1 : 0),
  ).current;
  const toggleLabel = isExpanded
    ? section.copy.hideButtonLabel
    : section.copy.showButtonLabel;
  const chevronRotation = expandProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });
  const contentOffset = expandProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [-6, 0],
  });

  useEffect(() => {
    Animated.timing(expandProgress, {
      duration: 180,
      easing: Easing.out(Easing.cubic),
      toValue: isExpanded ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [expandProgress, isExpanded]);

  const toggleExpanded = (event: GestureResponderEvent) => {
    event.stopPropagation();
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        190,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity,
      ),
    );
    setIsExpanded((previousValue) => !previousValue);
  };

  return (
    <View style={styles.identifierSection}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: isExpanded }}
        onPress={toggleExpanded}
        style={({ pressed }) => [
          styles.identifierToggle,
          { opacity: pressed ? 0.72 : 1 },
        ]}
      >
        <Text
          style={[
            styles.identifierToggleText,
            { color: theme.secondaryTextColor },
          ]}
        >
          {toggleLabel}
        </Text>
        <Animated.View
          style={[
            styles.chevronIcon,
            { transform: [{ rotate: chevronRotation }] },
          ]}
        >
          <ChevronDownIcon color={theme.secondaryTextColor} />
        </Animated.View>
      </Pressable>

      {isExpanded && (
        <Animated.View
          style={[
            styles.identifierCard,
            {
              backgroundColor: cardBackgroundColor,
              borderColor: theme.borderColor,
              opacity: expandProgress,
              transform: [{ translateY: contentOffset }],
            },
          ]}
        >
          {section.items.map((item) => (
            <ProfileIdentifierRow
              copyButtonAccessibilityLabel={
                item.copyAccessibilityLabel ??
                section.copy.copyButtonAccessibilityLabel
              }
              item={item}
              key={item.key}
              theme={theme}
              onCopy={section.onCopy}
            />
          ))}
        </Animated.View>
      )}
    </View>
  );
};

interface ProfileIdentifierRowProps {
  copyButtonAccessibilityLabel: string;
  item: ProfileIdentifierItem;
  theme: PaywallTheme;
  onCopy?: (item: ProfileIdentifierItem) => Promise<void> | void;
}

const ProfileIdentifierRow = ({
  copyButtonAccessibilityLabel,
  item,
  theme,
  onCopy,
}: ProfileIdentifierRowProps) => {
  const value = item.value ?? "";
  const canCopy = Boolean(value) && Boolean(onCopy);
  const valueBoxBackgroundColor = getColorWithAlpha(
    theme.backgroundColor,
    0.74,
    theme.backgroundColor,
  );

  return (
    <View style={styles.identifierItem}>
      <View style={styles.identifierHeader}>
        <Text
          style={[styles.identifierLabel, { color: theme.secondaryTextColor }]}
        >
          {item.label}
        </Text>
        {onCopy && (
          <Pressable
            accessibilityLabel={copyButtonAccessibilityLabel}
            accessibilityRole="button"
            disabled={!canCopy}
            onPress={(event: GestureResponderEvent) => {
              event.stopPropagation();
              if (!canCopy) return;
              onCopy(item);
            }}
            style={({ pressed }) => [
              styles.identifierCopyButton,
              {
                opacity: !canCopy ? 0.42 : pressed ? 0.72 : 1,
              },
            ]}
          >
            <CopyIcon
              backgroundColor={theme.accentColor}
              color={theme.accentColor}
            />
          </Pressable>
        )}
      </View>
      <View
        style={[
          styles.identifierValueBox,
          { backgroundColor: valueBoxBackgroundColor },
        ]}
      >
        <Text
          selectable
          style={[
            styles.identifierValue,
            {
              color: value ? theme.primaryTextColor : theme.mutedTextColor,
            },
          ]}
        >
          {value || "-"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  identifierSection: {
    gap: 10,
  },
  identifierToggle: {
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    gap: 8,
    minHeight: 32,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  identifierToggleText: {
    flexShrink: 1,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 17,
    textAlign: "center",
  },
  chevronIcon: {
    alignItems: "center",
    height: 18,
    justifyContent: "center",
    width: 18,
  },
  identifierCard: {
    borderCurve: "continuous",
    borderRadius: 8,
    borderWidth: 1,
    gap: 18,
    padding: 14,
  },
  identifierItem: {
    gap: 7,
  },
  identifierHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  identifierLabel: {
    flex: 1,
    flexShrink: 1,
    fontSize: 13,
    fontWeight: "800",
    lineHeight: 18,
    minWidth: 0,
  },
  identifierValueBox: {
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: 8,
    flexDirection: "row",
    minHeight: 42,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  identifierValue: {
    flex: 1,
    flexShrink: 1,
    fontFamily: Platform.select({
      default: "monospace",
      ios: "Menlo",
    }),
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 16,
    minWidth: 0,
  },
  identifierCopyButton: {
    alignItems: "center",
    flexShrink: 0,
    height: 32,
    justifyContent: "center",
    width: 32,
  },
});
