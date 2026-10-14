import { StyleSheet, View } from "react-native";

import { ProOnboardingGuide } from "../pro-onboarding/ProOnboardingGuide";
import { mergePaywallTheme } from "../shared/theme";
import type { ProfileSubscriptionWithOnboardingProps } from "../types";
import { ProfileBenefitUsageList } from "./ProfileBenefitUsageList";
import { ProfileSubscriptionSection } from "./ProfileSubscriptionSection";

/**
 * Subscriber profile with optional Pro onboarding. Without `onboarding` it is
 * exactly ProfileSubscriptionSection. With it: the profile (header, actions,
 * developer message) without the table, a separator, the guide, then the
 * benefit usage table folded behind `copy.viewAllBenefitsTitle`.
 */
export const ProfileSubscriptionWithOnboarding = ({
  onboarding,
  ...sectionProps
}: ProfileSubscriptionWithOnboardingProps) => {
  if (!onboarding) return <ProfileSubscriptionSection {...sectionProps} />;

  const theme = mergePaywallTheme(sectionProps.theme);
  const { benefitUsageSection, copy, locale } = sectionProps;

  return (
    <View style={styles.container}>
      <ProfileSubscriptionSection
        {...sectionProps}
        benefitUsageSection={undefined}
      />
      <View style={[styles.separator, { backgroundColor: theme.borderColor }]} />
      <ProOnboardingGuide {...onboarding} locale={locale} theme={theme} />
      {benefitUsageSection ? (
        <ProfileBenefitUsageList
          collapsible
          section={benefitUsageSection}
          theme={theme}
          title={copy.viewAllBenefitsTitle ?? copy.benefitsTitle}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 32,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
  },
});
