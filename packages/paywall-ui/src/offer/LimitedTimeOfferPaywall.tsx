import { useMemo, useState } from "react";
import {
  LayoutAnimation,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { OfferCountdown } from "./OfferCountdown";
import { OfferPriceCard } from "./OfferPriceCard";
import {
  getLimitedTimeOfferAlternativePlans,
  resolveLimitedTimeOfferSelectedPlan,
} from "./limited-time-offer";
import { LegalLinks } from "../paywall/LegalLinks";
import { PaywallBenefitList } from "../paywall/PaywallBenefitList";
import { PlanCard } from "../paywall/PlanCard";
import { PurchaseButton } from "../paywall/PurchaseButton";
import { ChevronDownIcon, CloseIcon } from "../shared/icons";
import { mergePaywallTheme } from "../shared/theme";
import type {
  LimitedTimeOfferPaywallProps,
  PaywallCopy,
} from "../types";

export const LimitedTimeOfferPaywall = <TPackage,>({
  alternativePlans: alternativePlanCandidates = [],
  benefits = [],
  billingDisclosure,
  content,
  copy,
  discountText,
  expiresAt,
  hero,
  isPurchasing = false,
  isRestoring = false,
  originalPriceText,
  plan,
  purchaseButtonBackground,
  theme: themeOverride,
  onClose,
  onExpire,
  onOpenPrivacy,
  onOpenTerms,
  onPurchase,
  onRestore,
  onSelectPlan,
  onViewAllPlans,
}: LimitedTimeOfferPaywallProps<TPackage>) => {
  const insets = useSafeAreaInsets();
  const theme = mergePaywallTheme(themeOverride);
  const [isAlternativePlansExpanded, setIsAlternativePlansExpanded] =
    useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(plan.id);
  const alternativePlans = useMemo(
    () =>
      getLimitedTimeOfferAlternativePlans(plan, alternativePlanCandidates),
    [alternativePlanCandidates, plan],
  );
  const selectedPlan = resolveLimitedTimeOfferSelectedPlan(
    plan,
    alternativePlans,
    selectedPlanId,
  );
  const hasAlternativePlans = alternativePlans.length > 0;
  const hasAllPlansAction = Boolean(onViewAllPlans);
  const purchaseButtonLabel =
    copy.purchaseButtonByPeriod?.[selectedPlan.period] ?? copy.purchaseButton;
  const legalCopy: PaywallCopy = {
    privacyText: copy.privacyText,
    purchaseButton: copy.purchaseButton,
    restoreButton: copy.restoreButton,
    termsText: copy.termsText,
    title: copy.title,
  };
  const selectPlan = (nextPlan: typeof selectedPlan) => {
    setSelectedPlanId(nextPlan.id);
    onSelectPlan?.(nextPlan);
  };
  const toggleAlternativePlans = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (isAlternativePlansExpanded) selectPlan(plan);
    setIsAlternativePlansExpanded(!isAlternativePlansExpanded);
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.backgroundColor }]}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom:
              Math.max(insets.bottom, 12) +
              (hasAllPlansAction ? 176 : 138),
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>{hero}</View>
        <Pressable
          accessibilityLabel={copy.closeButtonAccessibilityLabel}
          accessibilityRole="button"
          hitSlop={10}
          onPress={onClose}
          style={[
            styles.closeButton,
            { top: Math.max(insets.top, 12), backgroundColor: "rgba(0,0,0,0.28)" },
          ]}
        >
          <CloseIcon color="#FFFFFF" />
        </Pressable>
        <View
          style={[
            styles.content,
            {
              backgroundColor: theme.backgroundColor,
              borderColor: theme.borderColor,
            },
          ]}
        >
          <View style={styles.titleBlock}>
            <View style={[styles.offerBadge, { backgroundColor: theme.accentColor }]}>
              <Text style={[styles.offerBadgeText, { color: theme.accentTextColor }]}>
                {copy.badgeText}
              </Text>
            </View>
            <Text style={[styles.title, { color: theme.primaryTextColor }]}>
              {copy.title}
            </Text>
            {copy.subtitle ? (
              <Text style={[styles.subtitle, { color: theme.secondaryTextColor }]}>
                {copy.subtitle}
              </Text>
            ) : null}
          </View>
          <OfferCountdown
            expiresAt={expiresAt}
            formatRemainingTime={copy.formatRemainingTime}
            label={copy.countdownLabel}
            theme={theme}
            onExpire={onExpire}
          />
          <OfferPriceCard
            billingDisclosure={billingDisclosure}
            discountText={discountText}
            isSelected={selectedPlan.id === plan.id}
            originalPriceText={originalPriceText}
            plan={plan}
            theme={theme}
            onPress={hasAlternativePlans ? () => selectPlan(plan) : undefined}
          />
          {hasAlternativePlans ? (
            <View style={styles.alternativePlansSection}>
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ expanded: isAlternativePlansExpanded }}
                disabled={isPurchasing || isRestoring}
                onPress={toggleAlternativePlans}
                style={({ pressed }) => [
                  styles.alternativePlansButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text
                  style={[
                    styles.alternativePlansText,
                    { color: theme.secondaryTextColor },
                  ]}
                >
                  {isAlternativePlansExpanded
                    ? copy.collapseAlternativePlansButton ??
                      copy.viewAllPlansButton
                    : copy.viewAllPlansButton}
                </Text>
                <View
                  style={
                    isAlternativePlansExpanded
                      ? styles.alternativePlansChevronExpanded
                      : undefined
                  }
                >
                  <ChevronDownIcon color={theme.secondaryTextColor} />
                </View>
              </Pressable>
              {isAlternativePlansExpanded ? (
                <View style={styles.alternativePlansList}>
                  {alternativePlans.map((alternativePlan) => (
                    <PlanCard
                      key={alternativePlan.id}
                      isSelected={selectedPlan.id === alternativePlan.id}
                      plan={alternativePlan}
                      shouldAnimate={false}
                      theme={theme}
                      onPress={() => selectPlan(alternativePlan)}
                    />
                  ))}
                </View>
              ) : null}
            </View>
          ) : null}
          <PaywallBenefitList
            benefits={benefits}
            content={content}
            size="large"
            theme={theme}
          />
        </View>
      </ScrollView>
      <View
        style={[
          styles.footer,
          {
            backgroundColor: theme.backgroundColor,
            borderColor: theme.borderColor,
            paddingBottom: Math.max(insets.bottom, 12),
          },
        ]}
      >
        <PurchaseButton
          background={purchaseButtonBackground}
          isDisabled={isRestoring}
          isLoading={isPurchasing}
          label={purchaseButtonLabel}
          loadingLabel={copy.purchasingButton}
          theme={theme}
          onPress={() => void onPurchase(selectedPlan)}
        />
        {onViewAllPlans ? (
          <Pressable
            accessibilityRole="button"
            disabled={isPurchasing || isRestoring}
            onPress={onViewAllPlans}
            style={({ pressed }) => [
              styles.allPlansButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={[styles.allPlansText, { color: theme.accentColor }]}>
              {copy.viewAllPlansButton}
            </Text>
          </Pressable>
        ) : null}
        <LegalLinks
          copy={legalCopy}
          isRestoreDisabled={isPurchasing || isRestoring}
          shouldShowLegalPrefix={false}
          theme={theme}
          onOpenPrivacy={onOpenPrivacy}
          onOpenTerms={onOpenTerms}
          onRestore={onRestore}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  alternativePlansButton: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    minHeight: 40,
  },
  alternativePlansChevronExpanded: {
    transform: [{ rotate: "180deg" }],
  },
  alternativePlansList: {
    gap: 10,
  },
  alternativePlansSection: {
    gap: 10,
  },
  alternativePlansText: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },
  allPlansButton: {
    alignItems: "center",
    minHeight: 34,
    justifyContent: "center",
  },
  allPlansText: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
  },
  closeButton: {
    alignItems: "center",
    borderRadius: 999,
    height: 36,
    justifyContent: "center",
    position: "absolute",
    right: 16,
    width: 36,
  },
  content: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: StyleSheet.hairlineWidth,
    gap: 24,
    marginTop: -28,
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    bottom: 0,
    gap: 4,
    left: 0,
    paddingHorizontal: 16,
    paddingTop: 12,
    position: "absolute",
    right: 0,
  },
  hero: {
    height: 252,
    overflow: "hidden",
    width: "100%",
  },
  offerBadge: {
    alignSelf: "center",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  offerBadgeText: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.8,
    lineHeight: 18,
    textTransform: "uppercase",
  },
  pressed: {
    opacity: 0.72,
  },
  screen: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 23,
    maxWidth: 420,
    textAlign: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    lineHeight: 38,
    maxWidth: 420,
    textAlign: "center",
  },
  titleBlock: {
    alignItems: "center",
    gap: 10,
  },
});
