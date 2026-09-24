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
  splitLimitedTimeOfferFeatureRows,
} from "./limited-time-offer";
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

export const LimitedTimeOfferPaywall = <TPackage,>({
  alternativePlans: alternativePlanCandidates = [],
  benefits = [],
  billingDisclosure,
  content,
  copy,
  discountText,
  expiresAt,
  featureComparison,
  featurePreviewCount = 4,
  hero,
  isPurchasing = false,
  isRestoring = false,
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
  const featureRows = useMemo(
    () =>
      splitLimitedTimeOfferFeatureRows(
        featureComparison?.rows ?? [],
        featurePreviewCount,
      ),
    [featureComparison?.rows, featurePreviewCount],
  );
  const previewComparison = featureComparison
    ? {
        ...featureComparison,
        collapse: undefined,
        rows: featureRows.previewRows,
      }
    : undefined;
  const remainingComparison = featureComparison
    ? {
        ...featureComparison,
        collapse: undefined,
        rows: featureRows.remainingRows,
      }
    : undefined;
  const footerBottomPadding = Math.max(insets.bottom, 12) + 8;
  const fallbackFooterHeight = 12 + 52 + footerBottomPadding;
  const footerHeight = Math.max(measuredFooterHeight, fallbackFooterHeight);
  const purchaseButtonLabel =
    copy.purchaseButtonByPeriod?.[selectedPlan.period] ?? copy.purchaseButton;
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
            { paddingTop: Math.max(insets.top, 12) },
          ]}
        >
          <Pressable
            accessibilityLabel={copy.closeButtonAccessibilityLabel}
            accessibilityRole="button"
            hitSlop={10}
            onPress={onClose}
            style={[
              styles.closeButton,
              { top: Math.max(insets.top, 12) },
            ]}
          >
            <CloseIcon color="#272523" />
          </Pressable>
          <View style={styles.hero}>{hero ?? <DefaultOfferHero />}</View>
          <OfferCountdown
            accentColor="#F04C3A"
            expiresAt={expiresAt}
            formatRemainingTime={copy.formatRemainingTime}
            label={copy.countdownLabel}
            theme={theme}
            variant="pill"
            onExpire={onExpire}
          />
          <View style={styles.titleBlock}>
            <Text style={styles.offerBadgeText}>{copy.badgeText}</Text>
            <Text style={styles.title}>{copy.title}</Text>
            {discountText ? (
              <Text style={styles.headerDiscount}>{discountText}</Text>
            ) : null}
            {copy.subtitle ? (
              <Text style={styles.subtitle}>{copy.subtitle}</Text>
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

          {previewComparison && previewComparison.rows.length > 0 ? (
            <PaywallFeatureComparison
              comparison={previewComparison}
              theme={theme}
            />
          ) : null}

          {hasAlternativePlans ? (
            <View style={styles.alternativePlansSection}>
              <Text
                style={[
                  styles.alternativePlansTitle,
                  { color: theme.primaryTextColor },
                ]}
              >
                {copy.alternativePlansTitle ?? copy.viewAllPlansButton}
              </Text>
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
            </View>
          ) : null}

          {remainingComparison && remainingComparison.rows.length > 0 ? (
            <PaywallFeatureComparison
              comparison={remainingComparison}
              shouldShowHeader={false}
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
    backgroundColor: "rgba(39, 37, 35, 0.08)",
    borderRadius: 999,
    height: 36,
    justifyContent: "center",
    position: "absolute",
    right: 16,
    width: 36,
    zIndex: 2,
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
    color: "#F04C3A",
    fontFamily: "serif",
    fontSize: 27,
    fontWeight: "800",
    lineHeight: 34,
    textAlign: "center",
  },
  offerBadgeText: {
    color: "#F04C3A",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.8,
    lineHeight: 18,
    textTransform: "uppercase",
  },
  offerHeader: {
    alignItems: "center",
    backgroundColor: "#FAF7F2",
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
    color: "#67615D",
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 23,
    maxWidth: 420,
    textAlign: "center",
  },
  title: {
    color: "#272523",
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
