import { useEffect, useMemo, useState } from "react";
import { Alert, ImageBackground, StyleSheet, View } from "react-native";
import {
  Paywall,
  createPaywallPlans,
  getDefaultPaywallCopy,
  getDefaultPaywallPlanOptions,
  getDefaultSelectedPlanId,
  type PaywallConfig,
  type PaywallFreeTrialConfig,
  type PaywallPlan,
  type PaywallTrialDuration,
  type PurchasesPackageLike,
} from "pabal-expo-paywall-ui";

import { getPackagesForScenario } from "../fixtures/paywall-plans";
import { playgroundBenefits } from "../fixtures/playground-benefits";
import type {
  PlaygroundPaywallAnimation,
  PlaygroundFreeTrialMode,
  PlaygroundPaywallFlow,
  PlaygroundLocale,
  PlaygroundScenario,
} from "../types/playground";

const Hero = () => {
  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=80",
      }}
      imageStyle={styles.heroImage}
      style={styles.hero}
    >
      <View />
    </ImageBackground>
  );
};

const SupportAppLogo = () => {
  return (
    <View style={styles.supportAppLogo}>
      <View style={styles.supportAppLogoSky} />
      <View style={styles.supportAppLogoHorizon} />
      <View style={styles.supportAppLogoGround} />
    </View>
  );
};

const playgroundPaywallConfig = {
  hero: <Hero />,
  supportMessageIcon: <SupportAppLogo />,
  valueStep: {
    title: "Get the full Pabal experience",
    subtitle: "See the value first, then choose a plan on the next step.",
  },
  benefits: playgroundBenefits,
  reviewSection: {
    reviews: [
      {
        rating: 5,
        quote: "The widget is exactly what I needed for quick aurora checks.",
        author: "App Store review",
      },
      {
        rating: 5,
        quote: "Clean, fast, and useful every time the sky starts moving.",
        author: "App Store review",
      },
    ],
  },
  theme: {
    accentColor: "#5AC8B7",
    backgroundColor: "#05080C",
    primaryTextColor: "#F5F7FA",
  },
} satisfies Omit<PaywallConfig, "copy" | "planOptions">;

interface PaywallPlaygroundScreenProps {
  scenario: PlaygroundScenario;
  selectedLocale: PlaygroundLocale;
  paywallFlow: PlaygroundPaywallFlow;
  paywallAnimation: PlaygroundPaywallAnimation;
  freeTrialMode: PlaygroundFreeTrialMode;
  isTrialEligible: boolean;
  onClose: () => void;
}

const getFreeTrialConfig = (
  mode: PlaygroundFreeTrialMode,
  isTrialEligible: boolean,
): boolean | PaywallFreeTrialConfig => {
  if (!isTrialEligible) return false;
  if (mode === "none") return false;
  if (mode === "twoWeeks") return { duration: { value: 2, unit: "week" } };
  return true;
};

const formatTrialDurationLabel = (
  trialDuration: PaywallTrialDuration | undefined,
): string => {
  const duration = trialDuration ?? { value: 7, unit: "day" };
  const unit = duration.unit === "week" ? "week" : "day";
  const unitLabel = duration.value === 1 ? unit : `${unit}s`;

  return `${duration.value} ${unitLabel}`;
};

export const PaywallPlaygroundScreen = ({
  scenario,
  selectedLocale,
  paywallFlow,
  paywallAnimation,
  freeTrialMode,
  isTrialEligible,
  onClose,
}: PaywallPlaygroundScreenProps) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string | undefined>();
  const [isPurchasing, setIsPurchasing] = useState(false);

  const plans = useMemo(() => {
    return createPaywallPlans(
      getPackagesForScenario(scenario),
      {
        ...getDefaultPaywallPlanOptions(selectedLocale),
        annualSelectedDescription:
          "About 90% less than a guided aurora hunt.",
        lifetimeSelectedDescription: "One payment for every aurora season.",
        monthlySelectedDescription:
          "Flexible access for your next aurora window.",
      },
    );
  }, [scenario, selectedLocale]);

  const copy = useMemo(() => {
    return getDefaultPaywallCopy(selectedLocale, {
      title: "Upgrade to Pro",
      subtitle: "Unlock every feature.",
      formatPurchaseButtonLabel: ({ plan, hasFreeTrial, trialDuration }) => {
        if (hasFreeTrial) {
          return `${formatTrialDurationLabel(trialDuration)} free, then ${
            plan.priceText
          }`;
        }

        return `Start ${plan.title} for ${plan.priceText}`;
      },
    });
  }, [selectedLocale]);

  useEffect(() => {
    setSelectedPlanId((currentPlanId) => {
      const stillExists = plans.some((plan) => plan.id === currentPlanId);
      return stillExists ? currentPlanId : getDefaultSelectedPlanId(plans);
    });
  }, [plans]);

  const handlePurchase = async (plan: PaywallPlan<PurchasesPackageLike>) => {
    setIsPurchasing(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setIsPurchasing(false);

    Alert.alert(
      "Purchase callback",
      `App receives rawPackage.identifier: ${plan.rawPackage.identifier}`,
    );
  };

  return (
    <View style={styles.root}>
      <Paywall
        {...playgroundPaywallConfig}
        copy={copy}
        plans={plans}
        stepMode={paywallFlow}
        animationMode={paywallAnimation}
        freeTrial={getFreeTrialConfig(freeTrialMode, isTrialEligible)}
        selectedPlanId={selectedPlanId}
        isPurchasing={isPurchasing}
        onSelectPlan={setSelectedPlanId}
        onPurchase={handlePurchase}
        onRestore={() => Alert.alert("Restore callback")}
        onOpenDeveloperWebsite={() => Alert.alert("Developer website callback")}
        onClose={onClose}
        onOpenTerms={() => Alert.alert("Terms callback")}
        onOpenPrivacy={() => Alert.alert("Privacy callback")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  hero: {
    height: "100%",
    justifyContent: "flex-end",
    overflow: "hidden",
    width: "100%",
  },
  heroImage: {},
  supportAppLogo: {
    borderRadius: 7,
    height: 28,
    overflow: "hidden",
    width: 28,
  },
  supportAppLogoSky: {
    backgroundColor: "#1987F3",
    height: 12,
  },
  supportAppLogoHorizon: {
    backgroundColor: "#9EE6DD",
    height: 7,
  },
  supportAppLogoGround: {
    backgroundColor: "#FFD86F",
    flex: 1,
  },
});
