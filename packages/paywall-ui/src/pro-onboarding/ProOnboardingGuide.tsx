import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { getDefaultProOnboardingCopy } from "../locales/localized-paywall-copy";
import { ChevronDownIcon } from "../shared/icons";
import { mergePaywallTheme } from "../shared/theme";
import type { ProOnboardingGuideProps, ProOnboardingItem } from "../types";
import { ProOnboardingNextCard } from "./ProOnboardingNextCard";
import { ProOnboardingSectionList } from "./ProOnboardingSectionList";

/**
 * Pro onboarding: a title, one "Try next" card (or an all-explored line) and
 * the app's Pro features by section. Storage, analytics and navigation stay
 * in the app; this only lays them out and reports taps.
 */
export const ProOnboardingGuide = ({
  sections,
  items,
  nextItemId,
  copy: copyOverride,
  locale,
  theme: themeOverride,
  onPressItem,
  onConfirmUsed,
  defaultListExpanded = false,
}: ProOnboardingGuideProps) => {
  const [isListExpanded, setIsListExpanded] = useState(defaultListExpanded);
  const theme = mergePaywallTheme(themeOverride);
  const copy = { ...getDefaultProOnboardingCopy(locale), ...copyOverride };
  const nextItem = nextItemId ? items[nextItemId] : undefined;

  const openItem = (item: ProOnboardingItem, entryPoint: "next" | "list") => {
    onPressItem?.(item.id, entryPoint);
    item.onPress?.();
  };

  return (
    <View style={styles.guide}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: isListExpanded }}
        onPress={() => setIsListExpanded((expanded) => !expanded)}
        style={styles.header}
      >
        <Text style={[styles.title, { color: theme.primaryTextColor }]}>
          {copy.title}
        </Text>
        <View style={[styles.chevron, isListExpanded && styles.chevronExpanded]}>
          <ChevronDownIcon color={theme.secondaryTextColor} />
        </View>
      </Pressable>

      {nextItem ? (
        <ProOnboardingNextCard
          copy={copy}
          item={nextItem}
          theme={theme}
          onConfirmUsed={() => onConfirmUsed?.(nextItem.id)}
          onTry={() => openItem(nextItem, "next")}
        />
      ) : (
        <Text style={[styles.allExplored, { color: theme.secondaryTextColor }]}>
          {copy.allExplored}
        </Text>
      )}

      {isListExpanded ? (
        <ProOnboardingSectionList
          copy={copy}
          items={items}
          sections={sections}
          theme={theme}
          onPressItem={(item) => openItem(item, "list")}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  guide: {
    gap: 24,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    minHeight: 44,
  },
  title: {
    flex: 1,
    flexShrink: 1,
    fontSize: 20,
    fontWeight: "600",
  },
  chevron: {
    alignItems: "center",
    height: 20,
    justifyContent: "center",
    width: 20,
  },
  chevronExpanded: {
    transform: [{ rotate: "180deg" }],
  },
  allExplored: {
    fontSize: 14,
    fontWeight: "400",
  },
});
