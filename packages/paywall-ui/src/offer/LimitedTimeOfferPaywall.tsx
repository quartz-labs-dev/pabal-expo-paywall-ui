import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { DefaultOfferHero } from "./DefaultOfferHero";
import { OfferCountdown } from "./OfferCountdown";
import { OfferPriceCard } from "./OfferPriceCard";
import {
  getLimitedTimeOfferAlternativePlans,
  resolveLimitedTimeOfferSelectedPlan,
  resolveLimitedTimeOfferPurchasePresentation,
} from "./limited-time-offer";
import { getDefaultLimitedTimeOfferCopy } from "../locales/localized-paywall-copy";
import { LegalLinks } from "../paywall/LegalLinks";
import { PaywallBenefitList } from "../paywall/PaywallBenefitList";
import { PaywallFeatureComparison } from "../paywall/PaywallFeatureComparison";
import { PaywallReviewSection } from "../paywall/PaywallReviewSection";
import { PlanCard } from "../paywall/PlanCard";
import { PurchaseButton } from "../paywall/PurchaseButton";
import { SupportMessageBubble } from "../paywall/SupportMessageBubble";
import { CloseIcon } from "../shared/icons";
import { mergePaywallTheme } from "../shared/theme";
import type {
  LimitedTimeOfferPaywallProps,
  PaywallCopy,
} from "../types";

const DEFAULT_HEADER_BACKGROUND_COLOR = "#FAF7F2";

export const LimitedTimeOfferPaywall = <TPackage,>({
  alternativePlans: alternativePlanCandidates = [],
  benefits = [],
  billingDisclosure,
  content,
  copy,
  discountText,
  expiresAt,
  featureComparison,
  freeTrial = false,
  headerTheme: headerThemeOverride,
  hero,
  isPurchasing = false,
  isRestoring = false,
  locale,
  originalPriceText,
  plan,
  purchaseButtonBackground,
  reviewSection,
  supportMessageIcon,
  theme: themeOverride,
  onClose,
  onExpire,
  onOpenDeveloperWebsite,
  onOpenPrivacy,
  onOpenTerms,
  onPurchase,
  onRestore,
  onSelectPlan,
  onViewAllPlans,
}: LimitedTimeOfferPaywallProps<TPackage>) => {
  const insets = useSafeAreaInsets();
  const theme = mergePaywallTheme(themeOverride);
  const hasCustomHeaderBackground =
    headerThemeOverride?.backgroundColor !== undefined;
  const headerTheme = {
    backgroundColor:
      headerThemeOverride?.backgroundColor ?? DEFAULT_HEADER_BACKGROUND_COLOR,
    primaryTextColor:
      headerThemeOverride?.primaryTextColor ??
      (hasCustomHeaderBackground ? theme.primaryTextColor : "#272523"),
    secondaryTextColor:
      headerThemeOverride?.secondaryTextColor ??
      (hasCustomHeaderBackground ? theme.secondaryTextColor : "#67615D"),
  };
  const [selectedPlanId, setSelectedPlanId] = useState(plan.id);
  const [measuredFooterHeight, setMeasuredFooterHeight] = useState(0);
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
  const footerBottomPadding = Math.max(insets.bottom, 12) + 8;
  const fallbackFooterHeight = 12 + 52 + footerBottomPadding;
  const footerHeight = Math.max(measuredFooterHeight, fallbackFooterHeight);
  const defaultCopy = getDefaultLimitedTimeOfferCopy(locale, {
    badgeText: copy.badgeText,
    countdownLabel: copy.countdownLabel,
    title: copy.title,
  });
  const purchasePresentation = resolveLimitedTimeOfferPurchasePresentation({
    copy,
    freeTrial,
    locale,
    plan: selectedPlan,
  });
  const legalCopy: PaywallCopy = {
    privacyText: copy.privacyText,
    purchaseButton: copy.purchaseButton,
    restoreButton: copy.restoreButton,
    termsText: copy.termsText,
    title: copy.title,
    legalPrefix: copy.legalPrefix,
  };
  const selectPlan = (nextPlan: typeof selectedPlan) => {
    setSelectedPlanId(nextPlan.id);
    onSelectPlan?.(nextPlan);
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.backgroundColor }]}>
      <Pressable
        accessibilityLabel={
          copy.closeButtonAccessibilityLabel ?? defaultCopy.closeButtonAccessibilityLabel
        }
        accessibilityRole="button"
        disabled={isPurchasing || isRestoring}
        onPress={onClose}
        style={({ pressed }) => [
          styles.closeButton,
          { top: Math.max(insets.top, 10) },
          pressed && styles.pressed,
        ]}
      >
        <View
          style={[
            styles.closeIcon,
            { backgroundColor: theme.surfaceColor },
          ]}
        >
          <CloseIcon color={theme.primaryTextColor} />
        </View>
      </Pressable>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: footerHeight + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.offerHeader,
            {
              backgroundColor: headerTheme.backgroundColor,
              paddingTop: Math.max(insets.top, 12),
            },
          ]}
        >
          <View style={styles.hero}>{hero ?? <DefaultOfferHero />}</View>
          <OfferCountdown
            accentColor={theme.accentColor}
            expiresAt={expiresAt}
            formatRemainingTime={copy.formatRemainingTime}
            label={copy.countdownLabel}
            theme={{
              ...theme,
              mutedTextColor: headerTheme.secondaryTextColor,
            }}
            variant="pill"
            onExpire={onExpire}
          />
          <View style={styles.titleBlock}>
            <Text
              style={[styles.offerBadgeText, { color: theme.accentColor }]}
            >
              {copy.badgeText}
            </Text>
            <Text
              style={[styles.title, { color: headerTheme.primaryTextColor }]}
            >
              {copy.title}
            </Text>
            {discountText ? (
              <Text
                style={[styles.headerDiscount, { color: theme.accentColor }]}
              >
                {discountText}
              </Text>
            ) : null}
            {copy.subtitle ? (
              <Text
                style={[
                  styles.subtitle,
                  { color: headerTheme.secondaryTextColor },
                ]}
              >
                {copy.subtitle}
              </Text>
            ) : null}
          </View>
        </View>

        <View style={styles.content}>
          <OfferPriceCard
            billingDisclosure={billingDisclosure}
            discountText={discountText}
            isSelected={selectedPlan.id === plan.id}
            originalPriceText={originalPriceText}
            plan={plan}
            theme={theme}
            onPress={hasAlternativePlans ? () => selectPlan(plan) : undefined}
          />

          {featureComparison && featureComparison.rows.length > 0 ? (
            <PaywallFeatureComparison
              comparison={featureComparison}
              theme={theme}
            />
          ) : null}

          <PaywallBenefitList
            benefits={featureComparison ? [] : benefits}
            content={content}
            size="regular"
            theme={theme}
            variant="plain"
          />

          {hasAlternativePlans ? (
            <View style={styles.alternativePlansSection}>
              <Text
                style={[
                  styles.alternativePlansTitle,
                  { color: theme.primaryTextColor },
                ]}
              >
                {copy.alternativePlansTitle ?? defaultCopy.alternativePlansTitle}
              </Text>
              <View style={styles.alternativePlansList}>
                {alternativePlans.map((alternativePlan) => (
                  <PlanCard
                    key={alternativePlan.id}
                    isSelected={selectedPlan.id === alternativePlan.id}
                    plan={alternativePlan}
                    shouldAnimate
                    theme={theme}
                    onPress={() => selectPlan(alternativePlan)}
                  />
                ))}
              </View>
            </View>
          ) : null}

          {reviewSection ? (
            <PaywallReviewSection
              reviews={reviewSection.reviews}
              theme={theme}
              title={copy.reviewSectionTitle}
            />
          ) : null}

          {copy.supportMessage ? (
            <SupportMessageBubble
              icon={supportMessageIcon}
              label={copy.supportMessageLabel}
              message={copy.supportMessage}
              theme={theme}
              onPress={onOpenDeveloperWebsite}
            />
          ) : null}

          <LegalLinks
            copy={legalCopy}
            isRestoreDisabled={isPurchasing || isRestoring}
            shouldShowLegalPrefix={hasAlternativePlans}
            theme={theme}
            onOpenPrivacy={onOpenPrivacy}
            onOpenTerms={onOpenTerms}
            onRestore={onRestore}
          />
        </View>
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
          styles.footer,
          {
            backgroundColor: theme.backgroundColor,
            paddingBottom: footerBottomPadding,
          },
        ]}
      >
        <PurchaseButton
          background={purchaseButtonBackground}
          isDisabled={isRestoring}
          isLoading={isPurchasing}
          label={purchasePresentation.label}
          loadingLabel={copy.purchasingButton}
          theme={theme}
          onPress={() => void onPurchase(selectedPlan)}
        />
        <Text
          accessibilityLiveRegion="polite"
          style={[styles.purchaseDisclosure, { color: theme.mutedTextColor }]}
        >
          {purchasePresentation.disclosure}
        </Text>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  alternativePlansList: {
    gap: 10,
  },
  alternativePlansSection: {
    gap: 12,
  },
  alternativePlansTitle: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22,
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
    height: 44,
    justifyContent: "center",
    position: "absolute",
    right: 10,
    width: 44,
    zIndex: 10,
  },
  closeIcon: {
    alignItems: "center",
    borderRadius: 17,
    height: 34,
    justifyContent: "center",
    width: 34,
  },
  purchaseDisclosure: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 18,
    paddingTop: 4,
    textAlign: "center",
  },
  content: {
    gap: 28,
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  footer: {
    bottom: 0,
    gap: 4,
    left: 0,
    paddingHorizontal: 16,
    paddingTop: 12,
    position: "absolute",
    right: 0,
  },
  hero: {
    height: 190,
    overflow: "hidden",
    width: "100%",
  },
  headerDiscount: {
    fontFamily: "serif",
    fontSize: 27,
    fontWeight: "800",
    lineHeight: 34,
    textAlign: "center",
  },
  offerBadgeText: {
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.8,
    lineHeight: 18,
    textTransform: "uppercase",
  },
  offerHeader: {
    alignItems: "center",
    backgroundColor: DEFAULT_HEADER_BACKGROUND_COLOR,
    gap: 10,
    paddingBottom: 30,
    paddingHorizontal: 20,
    position: "relative",
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
    fontFamily: "serif",
    fontSize: 31,
    fontWeight: "800",
    lineHeight: 39,
    maxWidth: 420,
    textAlign: "center",
  },
  titleBlock: {
    alignItems: "center",
    gap: 7,
  },
});
