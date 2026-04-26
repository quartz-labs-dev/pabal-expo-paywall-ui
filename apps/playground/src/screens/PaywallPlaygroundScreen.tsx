import { useEffect, useMemo, useState } from "react";
import { Alert, ImageBackground, StyleSheet, View } from "react-native";
import {
  Paywall,
  createPaywallPlans,
  getDefaultSelectedPlanId,
  type PaywallConfig,
  type PaywallPlan,
  type PurchasesPackageLike,
} from "@pabal/expo-paywall-ui";

import { getPackagesForScenario } from "../fixtures/paywall-plans";
import type {
  PlaygroundPaywallFlow,
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

const playgroundPaywallConfig = {
  hero: <Hero />,
  valueStep: {
    title: "Get the full Pabal experience",
    subtitle: "See the value first, then choose a plan on the next step.",
    benefits: [
      {
        title: "Hard paywall feel without the harsh first impression",
        description: "The first step explains value before showing prices.",
      },
      {
        title: "A separate navigation action",
        description: "The compact Next button does not look like payment.",
      },
    ],
    nextButton: "Next",
    nextButtonAccessibilityLabel: "Continue to plan selection",
  },
  benefits: [
    {
      title: "Unlock all premium features",
      description: "Use title and description rows without custom layout code.",
    },
    {
      title: "Keep access across devices",
      description: "App config can still switch to content for full control.",
    },
  ],
  copy: {
    title: "Upgrade to Pro",
    subtitle: "Unlock every feature.",
    purchaseButton: "Start trial",
    purchasingButton: "Processing",
    restoreButton: "Restore purchases",
    legalPrefix: "Subscription renews automatically.",
    termsText: "Terms",
    privacyText: "Privacy",
  },
  planOptions: {
    annualBadgeText: "Best value",
    annualTitle: "Yearly",
    lifetimeBadgeText: "One-time",
    lifetimeTitle: "Lifetime",
    monthlyTitle: "Monthly",
    recommendedPeriod: "annual",
  },
  theme: {
    accentColor: "#5AC8B7",
    backgroundColor: "#05080C",
    primaryTextColor: "#F5F7FA",
  },
} satisfies PaywallConfig;

const { planOptions: playgroundPlanOptions, ...playgroundPaywallProps } =
  playgroundPaywallConfig;

interface PaywallPlaygroundScreenProps {
  scenario: PlaygroundScenario;
  paywallFlow: PlaygroundPaywallFlow;
  onClose: () => void;
}

export const PaywallPlaygroundScreen = ({
  scenario,
  paywallFlow,
  onClose,
}: PaywallPlaygroundScreenProps) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string | undefined>();
  const [isPurchasing, setIsPurchasing] = useState(false);

  const plans = useMemo(() => {
    return createPaywallPlans(
      getPackagesForScenario(scenario),
      playgroundPlanOptions,
    );
  }, [scenario]);

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
        {...playgroundPaywallProps}
        plans={plans}
        stepMode={paywallFlow}
        selectedPlanId={selectedPlanId}
        isPurchasing={isPurchasing}
        onSelectPlan={setSelectedPlanId}
        onPurchase={handlePurchase}
        onRestore={() => Alert.alert("Restore callback")}
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
});
