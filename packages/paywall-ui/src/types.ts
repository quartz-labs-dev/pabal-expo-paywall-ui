import type { ReactNode } from "react";

export type PaywallPlanPeriod = "monthly" | "annual" | "lifetime";

export type PaywallTrialUnit = "day" | "week";

export interface PaywallTrialDuration {
  value: number;
  unit: PaywallTrialUnit;
}

export interface PaywallFreeTrialConfig {
  duration?: PaywallTrialDuration;
}

export interface PaywallPlan<TPackage = unknown> {
  id: string;
  period: PaywallPlanPeriod;
  title: string;
  priceText: string;
  pricePerPeriodText?: string;
  monthlyPriceText?: string;
  discountText?: string;
  badgeText?: string;
  description?: string;
  isRecommended?: boolean;
  rawPackage: TPackage;
}

export interface PaywallCopy {
  title: string;
  subtitle?: string;
  purchaseButton: string;
  continueButton?: string;
  purchasingButton?: string;
  restoreButton: string;
  termsText: string;
  privacyText: string;
  legalPrefix?: string;
  closeButtonAccessibilityLabel?: string;
  nextButton?: string;
  nextButtonAccessibilityLabel?: string;
  formatTrialDuration?: (duration: PaywallTrialDuration) => string;
  formatTrialPriceDisclosure?: (
    duration: PaywallTrialDuration,
    pricePerPeriodText: string
  ) => string;
  formatTrialIncludedTitle?: (duration: PaywallTrialDuration) => string;
  trialIncludedDescription?: string;
}

export interface PaywallBenefitDetail {
  title: string;
  description?: string;
  icon?: ReactNode;
  onClick?: () => Promise<void> | void;
}

export type PaywallBenefit = string | PaywallBenefitDetail;

export type PaywallStepMode = "twoStep" | "singleStep";

export type PaywallAnimationMode = "default" | "none";

export interface PaywallValueStep {
  title: string;
  subtitle?: string;
  content?: ReactNode;
  nextButton?: string;
  nextButtonAccessibilityLabel?: string;
  closeButtonVisibility?: "hidden" | "visible";
}

export interface PaywallTheme {
  backgroundColor: string;
  surfaceColor: string;
  selectedSurfaceColor: string;
  borderColor: string;
  selectedBorderColor: string;
  primaryTextColor: string;
  secondaryTextColor: string;
  accentColor: string;
  accentTextColor: string;
  mutedTextColor: string;
}

export interface PaywallProps<TPackage = unknown> {
  plans: PaywallPlan<TPackage>[];
  hero: ReactNode;
  heroHeightRatio?: number;
  stepMode?: PaywallStepMode;
  animationMode?: PaywallAnimationMode;
  valueStep?: PaywallValueStep;
  benefits?: PaywallBenefit[];
  content?: ReactNode;
  purchaseButtonBackground?: ReactNode;
  copy: PaywallCopy;
  freeTrial?: boolean | PaywallFreeTrialConfig;
  selectedPlanId?: string;
  theme?: Partial<PaywallTheme>;
  isPurchasing?: boolean;
  onSelectPlan: (planId: string) => void;
  onPurchase: (plan: PaywallPlan<TPackage>) => Promise<void> | void;
  onRestore: () => Promise<void> | void;
  onClose: () => void;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
}

export interface PaywallConfig {
  hero: ReactNode;
  heroHeightRatio?: number;
  stepMode?: PaywallStepMode;
  animationMode?: PaywallAnimationMode;
  valueStep?: PaywallValueStep;
  benefits?: PaywallBenefit[];
  content?: ReactNode;
  purchaseButtonBackground?: ReactNode;
  copy: PaywallCopy;
  freeTrial?: boolean | PaywallFreeTrialConfig;
  theme?: Partial<PaywallTheme>;
  planOptions?: CreatePaywallPlansOptions;
}

export interface ProfileSubscriptionCopy {
  subscribedTitle: string;
  subscribedSubtitle?: string;
  notSubscribedTitle: string;
  notSubscribedSubtitle?: string;
  subscribedBadge?: string;
  notSubscribedBadge?: string;
  benefitsTitle?: string;
  upgradeButton?: string;
  upgradingButton?: string;
  manageSubscriptionButton: string;
  managingSubscriptionButton?: string;
  restorePurchasesButton: string;
  restoringPurchasesButton?: string;
  redeemPromoCodeButton?: string;
  redeemingPromoCodeButton?: string;
}

export interface ProfileIdentifierItem {
  key: string;
  label: string;
  value?: string | null;
  copyAccessibilityLabel?: string;
}

export interface ProfileIdentifiersCopy {
  showButtonLabel: string;
  hideButtonLabel: string;
  copyButtonAccessibilityLabel: string;
}

export interface ProfileIdentifiersConfig {
  copy?: Partial<ProfileIdentifiersCopy>;
  defaultExpanded?: boolean;
  isEnabled?: boolean;
}

export interface ProfileIdentifiersSectionProps
  extends ProfileIdentifiersConfig {
  items: ProfileIdentifierItem[];
  onCopy?: (item: ProfileIdentifierItem) => Promise<void> | void;
}

export interface ProfileSubscriptionSectionProps {
  isSubscribed: boolean;
  benefits?: PaywallBenefit[];
  content?: ReactNode;
  copy: ProfileSubscriptionCopy;
  headerIcon?: ReactNode;
  identifierSection?: ProfileIdentifiersSectionProps;
  locale?: string;
  theme?: Partial<PaywallTheme>;
  planLabel?: string;
  renewalLabel?: string;
  showPromoCodeButton?: boolean;
  isUpgrading?: boolean;
  isManagingSubscription?: boolean;
  isRestoringPurchases?: boolean;
  isRedeemingPromoCode?: boolean;
  onUpgrade?: () => Promise<void> | void;
  onManageSubscription: () => Promise<void> | void;
  onRestorePurchases: () => Promise<void> | void;
  onRedeemPromoCode?: () => Promise<void> | void;
}

export interface ProfileSubscriptionConfig {
  benefits?: PaywallBenefit[];
  content?: ReactNode;
  copy: ProfileSubscriptionCopy;
  headerIcon?: ReactNode;
  identifierSection?: ProfileIdentifiersSectionProps;
  locale?: string;
  theme?: Partial<PaywallTheme>;
}

export interface PurchasesPackageLike {
  identifier: string;
  packageType?: string;
  product: {
    price: number;
    priceString: string;
    pricePerPeriodString?: string | null;
    price_per_period?: string | null;
    pricePerMonthString?: string | null;
    pricePerYearString?: string | null;
    title?: string;
    description?: string;
    subscriptionPeriod?: string | null;
  };
}

export interface CreatePaywallPlansOptions {
  monthlyPackageIds?: string[];
  annualPackageIds?: string[];
  lifetimePackageIds?: string[];
  monthlyTitle?: string;
  annualTitle?: string;
  lifetimeTitle?: string;
  monthlyDescription?: string;
  annualDescription?: string;
  lifetimeDescription?: string;
  annualBadgeText?: string;
  lifetimeBadgeText?: string;
  formatDiscountText?: (discountPercentage: number) => string;
  formatMonthlyPriceText?: (monthlyPriceText: string) => string;
  formatPricePerPeriodText?: (
    priceText: string,
    period: Exclude<PaywallPlanPeriod, "lifetime">
  ) => string;
  displayOrder?: PaywallPlanPeriod[];
}
