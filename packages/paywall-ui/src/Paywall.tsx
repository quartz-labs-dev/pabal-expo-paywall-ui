import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { getDefaultSelectedPlanId } from "./create-paywall-plans";
import { LegalLinks } from "./LegalLinks";
import { PlanSelector } from "./PlanSelector";
import { PurchaseButton } from "./PurchaseButton";
import { mergePaywallTheme } from "./theme";
import type { PaywallPlan, PaywallProps } from "./types";

const getSelectedPlan = <TPackage,>(
  plans: PaywallPlan<TPackage>[],
  selectedPlanId?: string,
): PaywallPlan<TPackage> | undefined => {
  const fallbackPlanId = selectedPlanId ?? getDefaultSelectedPlanId(plans);
  return plans.find((plan) => plan.id === fallbackPlanId);
};

export const Paywall = <TPackage,>({
  plans,
  hero,
  benefits,
  copy,
  selectedPlanId,
  theme: themeOverride,
  isPurchasing = false,
  onSelectPlan,
  onPurchase,
  onRestore,
  onClose,
  onOpenTerms,
  onOpenPrivacy,
}: PaywallProps<TPackage>) => {
  const theme = mergePaywallTheme(themeOverride);
  const insets = useSafeAreaInsets();
  const selectedPlan = getSelectedPlan(plans, selectedPlanId);
  const resolvedSelectedPlanId = selectedPlan?.id;

  return (
    <View style={[styles.root, { backgroundColor: theme.backgroundColor }]}>
      <Pressable
        accessibilityLabel="Close paywall"
        accessibilityRole="button"
        onPress={onClose}
        style={[styles.closeButton, { top: Math.max(insets.top, 10) }]}
      >
        <Text style={[styles.closeText, { color: theme.primaryTextColor }]}>
          x
        </Text>
      </Pressable>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom: Math.max(insets.bottom + 24, 36),
            paddingTop: Math.max(insets.top + 36, 56),
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>{hero}</View>

        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.primaryTextColor }]}>
            {copy.title}
          </Text>
          {copy.subtitle && (
            <Text style={[styles.subtitle, { color: theme.secondaryTextColor }]}>
              {copy.subtitle}
            </Text>
          )}
        </View>

        <View style={styles.benefits}>
          {benefits.map((benefit) => (
            <View key={benefit} style={styles.benefitRow}>
              <Text style={[styles.check, { color: theme.accentColor }]}>
                +
              </Text>
              <Text
                style={[styles.benefitText, { color: theme.primaryTextColor }]}
              >
                {benefit}
              </Text>
            </View>
          ))}
        </View>

        <PlanSelector
          plans={plans}
          selectedPlanId={resolvedSelectedPlanId}
          theme={theme}
          onSelectPlan={onSelectPlan}
        />

        <PurchaseButton
          label={copy.purchaseButton}
          loadingLabel={copy.purchasingButton}
          isLoading={isPurchasing}
          isDisabled={!selectedPlan}
          theme={theme}
          onPress={() => {
            if (selectedPlan) onPurchase(selectedPlan);
          }}
        />

        <LegalLinks
          copy={copy}
          theme={theme}
          onRestore={onRestore}
          onOpenTerms={onOpenTerms}
          onOpenPrivacy={onOpenPrivacy}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  closeButton: {
    alignItems: "center",
    height: 44,
    justifyContent: "center",
    position: "absolute",
    right: 10,
    width: 44,
    zIndex: 10,
  },
  closeText: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 28,
  },
  content: {
    gap: 24,
    paddingHorizontal: 20,
  },
  hero: {
    minHeight: 180,
  },
  header: {
    gap: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 36,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 22,
    textAlign: "center",
  },
  benefits: {
    gap: 12,
  },
  benefitRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 10,
  },
  check: {
    fontSize: 16,
    fontWeight: "900",
    lineHeight: 22,
  },
  benefitText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 22,
  },
});
