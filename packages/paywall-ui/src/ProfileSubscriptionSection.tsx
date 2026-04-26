import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type GestureResponderEvent,
} from "react-native";

import { mergePaywallTheme } from "./theme";
import type {
  PaywallBenefit,
  PaywallTheme,
  ProfileSubscriptionSectionProps,
} from "./types";

const getBenefitTitle = (benefit: PaywallBenefit): string => {
  return typeof benefit === "string" ? benefit : benefit.title;
};

const getBenefitDescription = (benefit: PaywallBenefit): string | undefined => {
  return typeof benefit === "string" ? undefined : benefit.description;
};

const getBenefitIcon = (benefit: PaywallBenefit) => {
  return typeof benefit === "string" ? undefined : benefit.icon;
};

export const ProfileSubscriptionSection = ({
  isSubscribed,
  benefits = [],
  content,
  copy,
  headerIcon,
  theme: themeOverride,
  planLabel,
  renewalLabel,
  showPromoCodeButton = false,
  isUpgrading = false,
  isManagingSubscription = false,
  isRestoringPurchases = false,
  isRedeemingPromoCode = false,
  onUpgrade,
  onManageSubscription,
  onRestorePurchases,
  onRedeemPromoCode,
}: ProfileSubscriptionSectionProps) => {
  const theme = mergePaywallTheme(themeOverride);
  const statusTitle = isSubscribed
    ? copy.subscribedTitle
    : copy.notSubscribedTitle;
  const statusSubtitle = isSubscribed
    ? copy.subscribedSubtitle
    : copy.notSubscribedSubtitle;
  const statusBadge = isSubscribed
    ? copy.subscribedBadge ?? "PRO"
    : copy.notSubscribedBadge ?? "FREE";
  const shouldShowUpgrade =
    !isSubscribed && Boolean(onUpgrade) && Boolean(copy.upgradeButton);
  const shouldShowManageSubscription = isSubscribed;
  const shouldShowRestorePurchases = !isSubscribed;
  const shouldShowPromoCode =
    !isSubscribed &&
    showPromoCodeButton &&
    Boolean(onRedeemPromoCode) &&
    Boolean(copy.redeemPromoCodeButton);
  const cardAction = isSubscribed
    ? onManageSubscription
    : shouldShowUpgrade
    ? onUpgrade
    : undefined;
  const isCardActionDisabled = isSubscribed
    ? isManagingSubscription
    : isUpgrading;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={!cardAction || isCardActionDisabled}
      onPress={cardAction}
      style={[
        styles.card,
        {
          backgroundColor: theme.surfaceColor,
          opacity: isCardActionDisabled ? 0.82 : 1,
        },
      ]}
    >
      <View style={styles.headerSection}>
        <View style={styles.statusHeader}>
          {headerIcon && <View style={styles.headerIcon}>{headerIcon}</View>}
          <View style={styles.statusTextGroup}>
            <View style={styles.titleRow}>
              <Text style={[styles.title, { color: theme.primaryTextColor }]}>
                {statusTitle}
              </Text>
            </View>
            <View style={styles.badgeRow}>
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: isSubscribed
                      ? theme.selectedSurfaceColor
                      : theme.backgroundColor,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    {
                      color: isSubscribed
                        ? theme.accentColor
                        : theme.secondaryTextColor,
                    },
                  ]}
                >
                  {statusBadge}
                </Text>
              </View>
            </View>
            {statusSubtitle && (
              <Text
                style={[styles.subtitle, { color: theme.secondaryTextColor }]}
              >
                {statusSubtitle}
              </Text>
            )}
          </View>
        </View>

        {(planLabel || renewalLabel) && (
          <View
            style={[
              styles.planSummary,
              {
                backgroundColor: theme.backgroundColor,
              },
            ]}
          >
            {planLabel && (
              <Text
                style={[styles.planLabel, { color: theme.primaryTextColor }]}
              >
                {planLabel}
              </Text>
            )}
            {renewalLabel && (
              <Text
                style={[
                  styles.renewalLabel,
                  { color: theme.secondaryTextColor },
                ]}
              >
                {renewalLabel}
              </Text>
            )}
          </View>
        )}
      </View>

      <View
        style={[
          styles.contentPanel,
          { backgroundColor: theme.backgroundColor },
        ]}
      >
        <View style={styles.contentInner}>
          {content ? (
            <View style={styles.contentSlot}>{content}</View>
          ) : (
            <View style={styles.benefitSection}>
              {copy.benefitsTitle && (
                <Text
                  style={[
                    styles.sectionTitle,
                    { color: theme.primaryTextColor },
                  ]}
                >
                  {copy.benefitsTitle}
                </Text>
              )}
              <View style={styles.benefits}>
                {benefits.map((benefit, index) => {
                  const title = getBenefitTitle(benefit);
                  const description = getBenefitDescription(benefit);
                  const icon = getBenefitIcon(benefit);

                  return (
                    <View key={`${title}-${index}`} style={styles.benefitRow}>
                      <View
                        style={[
                          styles.benefitMark,
                          { backgroundColor: theme.selectedSurfaceColor },
                        ]}
                      >
                        {icon ? (
                          icon
                        ) : (
                          <Text
                            style={[
                              styles.benefitMarkText,
                              { color: theme.accentColor },
                            ]}
                          >
                            +
                          </Text>
                        )}
                      </View>
                      <View style={styles.benefitCopy}>
                        <Text
                          style={[
                            styles.benefitTitle,
                            { color: theme.primaryTextColor },
                          ]}
                        >
                          {title}
                        </Text>
                        {description && (
                          <Text
                            style={[
                              styles.benefitDescription,
                              { color: theme.secondaryTextColor },
                            ]}
                          >
                            {description}
                          </Text>
                        )}
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          <View style={styles.actions}>
            {shouldShowUpgrade && (
              <ProfileActionButton
                disabled={isUpgrading}
                label={
                  isUpgrading
                    ? copy.upgradingButton ?? copy.upgradeButton ?? ""
                    : copy.upgradeButton ?? ""
                }
                theme={theme}
                variant="primary"
                onPress={onUpgrade}
              />
            )}

            {shouldShowManageSubscription && (
              <ProfileActionButton
                disabled={isManagingSubscription}
                label={
                  isManagingSubscription
                    ? copy.managingSubscriptionButton ??
                      copy.manageSubscriptionButton
                    : copy.manageSubscriptionButton
                }
                theme={theme}
                variant="primary"
                onPress={onManageSubscription}
              />
            )}

            {(shouldShowRestorePurchases || shouldShowPromoCode) && (
              <View style={styles.secondaryActions}>
                {shouldShowPromoCode && (
                  <ProfileActionButton
                    disabled={isRedeemingPromoCode}
                    label={
                      isRedeemingPromoCode
                        ? copy.redeemingPromoCodeButton ??
                          copy.redeemPromoCodeButton ??
                          ""
                        : copy.redeemPromoCodeButton ?? ""
                    }
                    theme={theme}
                    variant="text"
                    onPress={onRedeemPromoCode}
                  />
                )}
                {shouldShowRestorePurchases && (
                  <ProfileActionButton
                    disabled={isRestoringPurchases}
                    label={
                      isRestoringPurchases
                        ? copy.restoringPurchasesButton ??
                          copy.restorePurchasesButton
                        : copy.restorePurchasesButton
                    }
                    theme={theme}
                    variant="text"
                    onPress={onRestorePurchases}
                  />
                )}
              </View>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

interface ProfileActionButtonProps {
  disabled?: boolean;
  label: string;
  theme: PaywallTheme;
  variant: "primary" | "text";
  onPress?: () => Promise<void> | void;
}

const ProfileActionButton = ({
  disabled = false,
  label,
  theme,
  variant,
  onPress,
}: ProfileActionButtonProps) => {
  const isPrimary = variant === "primary";
  const isDisabled = disabled || !onPress;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      onPress={(event: GestureResponderEvent) => {
        event.stopPropagation();
        onPress?.();
      }}
      style={({ pressed }) => [
        styles.actionButton,
        !isPrimary && styles.textButton,
        {
          backgroundColor: isPrimary ? theme.accentColor : "transparent",
          opacity: isDisabled ? 0.52 : pressed ? 0.82 : 1,
        },
      ]}
    >
      <Text
        style={[
          styles.actionButtonText,
          !isPrimary && styles.textButtonLabel,
          {
            color: isPrimary ? theme.accentTextColor : theme.secondaryTextColor,
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderCurve: "continuous",
    borderRadius: 8,
    overflow: "hidden",
  },
  headerSection: {
    gap: 14,
    padding: 20,
  },
  statusHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: 16,
  },
  headerIcon: {
    alignItems: "center",
    flexShrink: 0,
    height: 58,
    justifyContent: "center",
    width: 58,
  },
  statusTextGroup: {
    flex: 1,
    gap: 8,
    minWidth: 0,
  },
  titleRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  badgeRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  badge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0,
  },
  title: {
    flexShrink: 1,
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 26,
  },
  subtitle: {
    flexShrink: 1,
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 21,
  },
  planSummary: {
    borderCurve: "continuous",
    borderRadius: 8,
    gap: 4,
    padding: 12,
  },
  planLabel: {
    flexShrink: 1,
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 21,
  },
  renewalLabel: {
    flexShrink: 1,
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 18,
  },
  contentPanel: {
    overflow: "hidden",
  },
  contentInner: {
    gap: 22,
    padding: 20,
  },
  contentSlot: {
    width: "100%",
  },
  benefitSection: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 20,
  },
  benefits: {
    gap: 12,
  },
  benefitRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 10,
  },
  benefitMark: {
    alignItems: "center",
    borderRadius: 8,
    height: 24,
    justifyContent: "center",
    width: 24,
  },
  benefitMarkText: {
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 18,
  },
  benefitCopy: {
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
  benefitTitle: {
    flexShrink: 1,
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 21,
  },
  benefitDescription: {
    flexShrink: 1,
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 19,
  },
  actions: {
    gap: 10,
  },
  secondaryActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 14,
  },
  actionButton: {
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: 8,
    justifyContent: "center",
    minHeight: 46,
    paddingHorizontal: 14,
    paddingVertical: 11,
    width: "100%",
  },
  textButton: {
    borderWidth: 0,
    minHeight: 32,
    paddingHorizontal: 4,
    paddingVertical: 6,
    width: "auto",
  },
  actionButtonText: {
    flexShrink: 1,
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
    textAlign: "center",
  },
  textButtonLabel: {
    fontSize: 13,
    lineHeight: 17,
  },
});
