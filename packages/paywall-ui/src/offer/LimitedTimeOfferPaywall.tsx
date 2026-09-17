import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { OfferCountdown } from "./OfferCountdown";
import { OfferPriceCard } from "./OfferPriceCard";
import { LegalLinks } from "../paywall/LegalLinks";
import { PaywallBenefitList } from "../paywall/PaywallBenefitList";
import { PurchaseButton } from "../paywall/PurchaseButton";
import { CloseIcon } from "../shared/icons";
import { mergePaywallTheme } from "../shared/theme";
import type {
  LimitedTimeOfferPaywallProps,
  PaywallCopy,
} from "../types";

export const LimitedTimeOfferPaywall = <TPackage,>({
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
  onViewAllPlans,
}: LimitedTimeOfferPaywallProps<TPackage>) => {
  const insets = useSafeAreaInsets();
  const theme = mergePaywallTheme(themeOverride);
  const legalCopy: PaywallCopy = {
    privacyText: copy.privacyText,
    purchaseButton: copy.purchaseButton,
    restoreButton: copy.restoreButton,
    termsText: copy.termsText,
    title: copy.title,
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.backgroundColor }]}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 12) + 176 },
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
        <View style={styles.content}>
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
            originalPriceText={originalPriceText}
            plan={plan}
            theme={theme}
          />
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
          label={copy.purchaseButton}
          loadingLabel={copy.purchasingButton}
          theme={theme}
          onPress={() => void onPurchase(plan)}
        />
        <Pressable
          accessibilityRole="button"
          disabled={isPurchasing || isRestoring}
          onPress={onViewAllPlans}
          style={({ pressed }) => [styles.allPlansButton, pressed && styles.pressed]}
        >
          <Text style={[styles.allPlansText, { color: theme.accentColor }]}>
            {copy.viewAllPlansButton}
          </Text>
        </Pressable>
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
  allPlansButton: {
    alignItems: "center",
    minHeight: 34,
    justifyContent: "center",
  },
  allPlansText: {
    fontSize: 14,
    fontWeight: "800",
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
    gap: 22,
    paddingHorizontal: 20,
    paddingTop: 22,
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
    height: 214,
    overflow: "hidden",
    width: "100%",
  },
  offerBadge: {
    alignSelf: "center",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  offerBadgeText: {
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0.4,
    lineHeight: 16,
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
    fontWeight: "600",
    lineHeight: 22,
    maxWidth: 420,
    textAlign: "center",
  },
  title: {
    fontSize: 29,
    fontWeight: "900",
    lineHeight: 35,
    maxWidth: 420,
    textAlign: "center",
  },
  titleBlock: {
    alignItems: "center",
    gap: 9,
  },
});
