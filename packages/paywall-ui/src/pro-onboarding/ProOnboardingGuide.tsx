import { StyleSheet, Text, View } from "react-native";

import { getDefaultProOnboardingCopy } from "../locales/localized-paywall-copy";
import { mergePaywallTheme } from "../shared/theme";
import type { ProOnboardingGuideProps, ProOnboardingItem } from "../types";
import { ProOnboardingChecklist } from "./ProOnboardingChecklist";
import { ProOnboardingNextCard } from "./ProOnboardingNextCard";
import { ProOnboardingSectionList } from "./ProOnboardingSectionList";

/**
 * Pro onboarding: a title, a getting-started checklist (`steps`) or one "Try
 * next" card (or an all-explored line), and the app's Pro features by section. Storage, analytics and navigation stay
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
  steps,
  onConfirmStepDone,
  defaultChecklistExpanded = false,
}: ProOnboardingGuideProps) => {
  const theme = mergePaywallTheme(themeOverride);
  const copy = { ...getDefaultProOnboardingCopy(locale), ...copyOverride };
  const nextItem = nextItemId ? items[nextItemId] : undefined;

  const openItem = (item: ProOnboardingItem, entryPoint: "next" | "list") => {
    onPressItem?.(item.id, entryPoint);
    item.onPress?.();
  };

  return (
    <View style={styles.guide}>
      <Text style={[styles.title, { color: theme.primaryTextColor }]}>
        {copy.title}
      </Text>

      {steps && steps.length > 0 ? (
        <ProOnboardingChecklist
          copy={copy}
          defaultExpanded={defaultChecklistExpanded}
          steps={steps}
          theme={theme}
          onConfirmDone={onConfirmStepDone}
          onTry={(step) => step.onPress?.()}
        />
      ) : nextItem ? (
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

      <ProOnboardingSectionList
        copy={copy}
        items={items}
        sections={sections}
        theme={theme}
        onPressItem={(item) => openItem(item, "list")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  guide: {
    gap: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  allExplored: {
    fontSize: 14,
    fontWeight: "400",
  },
});
