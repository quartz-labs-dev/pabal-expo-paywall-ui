import { useState } from "react";
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

const FIXED_FOOTER_BUTTON_HEIGHT = 52;
const FIXED_FOOTER_TOP_PADDING = 12;
const FIXED_FOOTER_MIN_BOTTOM_PADDING = 12;
const FIXED_FOOTER_SCROLL_GAP = 24;

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
  const [measuredFooterHeight, setMeasuredFooterHeight] = useState(0);
  const footerBottomPadding = Math.max(
    insets.bottom,
    FIXED_FOOTER_MIN_BOTTOM_PADDING,
  );
  const fallbackFooterHeight =
    FIXED_FOOTER_TOP_PADDING +
    FIXED_FOOTER_BUTTON_HEIGHT +
    footerBottomPadding;
  const fixedFooterHeight = Math.max(
    measuredFooterHeight,
    fallbackFooterHeight,
  );

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
            paddingBottom: fixedFooterHeight + FIXED_FOOTER_SCROLL_GAP,
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

        <LegalLinks
          copy={copy}
          theme={theme}
          onRestore={onRestore}
          onOpenTerms={onOpenTerms}
          onOpenPrivacy={onOpenPrivacy}
        />
      </ScrollView>

      <View
        onLayout={(event) => {
          const nextFooterHeight = Math.ceil(event.nativeEvent.layout.height);
          setMeasuredFooterHeight((previousFooterHeight) =>
            previousFooterHeight === nextFooterHeight
              ? previousFooterHeight
              : nextFooterHeight,
          );
        }}
        style={[
          styles.fixedFooter,
          {
            backgroundColor: theme.backgroundColor,
            paddingBottom: footerBottomPadding,
          },
        ]}
      >
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
      </View>
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
  fixedFooter: {
    bottom: 0,
    left: 0,
    paddingHorizontal: 20,
    paddingTop: FIXED_FOOTER_TOP_PADDING,
    position: "absolute",
    right: 0,
    zIndex: 5,
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
