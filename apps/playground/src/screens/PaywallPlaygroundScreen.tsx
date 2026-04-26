import { useEffect, useMemo, useState } from "react";
import { Alert, ImageBackground, StyleSheet, Text, View } from "react-native";
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
      <View style={styles.heroOverlay}>
        <Text style={styles.heroEyebrow}>PLAYGROUND MEDIA SLOT</Text>
        <Text style={styles.heroTitle}>Swap this for app image or video</Text>
      </View>
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
      annualDescription: "Save with one payment per year.",
      annualTitle: "Yearly",
      monthlyDescription: "Pay month to month.",
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
          subtitle: "One reusable paywall shell, app-owned purchase logic.",
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
    borderRadius: 8,
    height: 220,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  heroImage: {
    borderRadius: 8,
  },
  heroOverlay: {
    backgroundColor: "rgba(0,0,0,0.36)",
    gap: 4,
    padding: 16,
  },
  heroEyebrow: {
    color: "#B9C4CF",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 0,
  },
});
