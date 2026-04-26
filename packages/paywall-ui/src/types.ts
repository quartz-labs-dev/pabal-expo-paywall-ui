import type { ReactNode } from "react";

export type PaywallPlanPeriod = "monthly" | "annual" | "lifetime";

export interface PaywallPlan<TPackage = unknown> {
  id: string;
  period: PaywallPlanPeriod;
  title: string;
  priceText: string;
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
  purchasingButton?: string;
  restoreButton: string;
  termsText: string;
  privacyText: string;
  legalPrefix?: string;
  legalSeparator?: string;
  closeButtonAccessibilityLabel?: string;
  nextButton?: string;
  nextButtonAccessibilityLabel?: string;
}

export interface PaywallBenefitDetail {
  title: string;
  description?: string;
  icon?: ReactNode;
}

export type PaywallBenefit = string | PaywallBenefitDetail;

export type PaywallStepMode = "twoStep" | "singleStep";

export type PaywallAnimationMode = "default" | "none";

export interface PaywallValueStep {
  title: string;
  subtitle?: string;
  benefits?: PaywallBenefit[];
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

export interface ProfileSubscriptionSectionProps {
  isSubscribed: boolean;
  benefits?: PaywallBenefit[];
  content?: ReactNode;
  copy: ProfileSubscriptionCopy;
  headerIcon?: ReactNode;
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
  theme?: Partial<PaywallTheme>;
}

export interface PurchasesPackageLike {
  identifier: string;
  packageType?: string;
  product: {
    price: number;
    priceString: string;
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
  recommendedPeriod?: PaywallPlanPeriod;
  displayOrder?: PaywallPlanPeriod[];
}
