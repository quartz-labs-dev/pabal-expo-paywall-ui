import { useEffect, useMemo, useState } from "react";
import { Alert, ImageBackground, StyleSheet, View } from "react-native";
import {
  Paywall,
  createPaywallPlans,
  getDefaultSelectedPlanId,
  type PaywallPlan,
  type PurchasesPackageLike,
} from "@pabal/expo-paywall-ui";

import { getPackagesForScenario } from "../fixtures/paywall-plans";
import type { PlaygroundScenario } from "../types/playground";

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

interface PaywallPlaygroundScreenProps {
  scenario: PlaygroundScenario;
  onClose: () => void;
}

export const PaywallPlaygroundScreen = ({
  scenario,
  onClose,
}: PaywallPlaygroundScreenProps) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string | undefined>();
  const [isPurchasing, setIsPurchasing] = useState(false);

  const plans = useMemo(() => {
    return createPaywallPlans(getPackagesForScenario(scenario), {
      annualBadgeText: "Best value",
      annualTitle: "Yearly",
      monthlyTitle: "Monthly",
      recommendedPeriod: "annual",
    });
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
        hero={<Hero />}
        plans={plans}
        selectedPlanId={selectedPlanId}
        isPurchasing={isPurchasing}
        benefits={[
          "Unlock all premium features",
          "Keep access across supported devices",
          "Cancel anytime from the App Store or Play Store",
        ]}
        copy={{
          title: "Upgrade to Pro",
          subtitle: "Unlock every feature.",
          purchaseButton: "Continue",
          purchasingButton: "Processing",
          restoreButton: "Restore purchases",
          legalPrefix: "Subscription renews automatically.",
          termsText: "Terms",
          privacyText: "Privacy",
        }}
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
