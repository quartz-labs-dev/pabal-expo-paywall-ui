import type { ReactNode } from "react";

export type PaywallPlanPeriod = "weekly" | "monthly" | "annual" | "lifetime";

export type PaywallTrialUnit = "day" | "week";

export interface PaywallTrialDuration {
  value: number;
  unit: PaywallTrialUnit;
}

export type PaywallPlanFreeTrialConfig =
  | boolean
  | {
      duration?: PaywallTrialDuration;
    };

export interface PaywallFreeTrialConfig {
  duration?: PaywallTrialDuration;
  byPeriod?: Partial<
    Record<
      Exclude<PaywallPlanPeriod, "lifetime">,
      PaywallPlanFreeTrialConfig
    >
  >;
  byPlanId?: Record<string, PaywallPlanFreeTrialConfig>;
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
  selectedDescription?: string;
  isRecommended?: boolean;
  rawPackage: TPackage;
}

export interface PaywallPurchaseButtonLabelContext<TPackage = unknown> {
  plan: PaywallPlan<TPackage>;
  hasFreeTrial: boolean;
  trialDuration?: PaywallTrialDuration;
}

export interface PaywallCopy {
  title: string;
  titleSegments?: PaywallTitleSegment[];
  subtitle?: string;
  purchaseButton: string;
  continueButton?: string;
  purchasingButton?: string;
  restoreButton: string;
  termsText: string;
  privacyText: string;
  legalPrefix?: string;
  supportMessageLabel?: string;
  supportMessage?: string;
  closeButtonAccessibilityLabel?: string;
  formatTrialDuration?: (duration: PaywallTrialDuration) => string;
  formatTrialPriceDisclosure?: (
    duration: PaywallTrialDuration,
    pricePerPeriodText: string
  ) => string;
  formatPurchaseButtonLabel?: (
    context: PaywallPurchaseButtonLabelContext
  ) => string;
  formatTrialIncludedTitle?: (duration: PaywallTrialDuration) => string;
  trialIncludedDescription?: string;
  trialNoPaymentDueNow?: string;
}

export interface PaywallBenefitDetail {
  title: string;
  description?: string;
  icon?: ReactNode;
  onClick?: () => Promise<void> | void;
}

export type PaywallBenefit = string | PaywallBenefitDetail;

export type PaywallTitleSegment =
  | string
  | {
      text: string;
      emphasized?: boolean;
    };

export type PaywallFeatureComparisonCell =
  | {
      kind: "included";
      accessibilityLabel?: string;
    }
  | {
      kind: "excluded";
      accessibilityLabel?: string;
    }
  | {
      kind: "text";
      text: string;
      /**
       * What a screen reader announces instead of `text`. Defaults to `text`,
       * which is right for a plain value like "3" and wrong for a symbol:
       * a cell reading "∞" should announce "Unlimited" in the app's language
       * rather than leave the glyph to the platform.
       */
      accessibilityLabel?: string;
    };

export interface PaywallFeatureComparisonRow {
  id: string;
  label: string;
  labelContent?: ReactNode;
  free: PaywallFeatureComparisonCell;
  paid: PaywallFeatureComparisonCell;
  onPress?: () => Promise<void> | void;
}

export type PaywallFeatureComparisonIncludedStyle = "check" | "circledCheck";

export type PaywallFeatureComparisonExcludedStyle = "dash" | "hidden";

export interface PaywallFeatureComparisonCollapse {
  /**
   * How many rows stay visible before the user expands the table. Values at
   * or above `rows.length` disable collapsing.
   */
  visibleRowCount: number;
  /**
   * Toggle labels. App-provided and app-localized, the same contract as
   * `freeColumnTitle` and `paidColumnTitle`, so apps can fold a remaining
   * count into the label.
   */
  expandLabel: string;
  collapseLabel: string;
}

export interface PaywallFeatureComparison {
  title?: string;
  featureColumnTitle?: string;
  freeColumnTitle: string;
  paidColumnTitle: string;
  /**
   * Renders only the first `visibleRowCount` rows with a toggle that expands
   * the rest in place. Omit to always show every row.
   */
  collapse?: PaywallFeatureComparisonCollapse;
  /**
   * Color for "included" checkmarks in both columns. Defaults to the
   * theme accent for `circledCheck`, and to the legacy column colors
   * (accent for paid, primary text for free) for plain `check`.
   * Set e.g. a green to make checkmarks read as universal "yes" marks.
   */
  includedColor?: string;
  /**
   * `check` renders a plain checkmark glyph; `circledCheck` renders the
   * checkmark inside a tinted circular badge. Defaults to `check`.
   */
  includedStyle?: PaywallFeatureComparisonIncludedStyle;
  /**
   * `dash` renders an en-dash for excluded cells; `hidden` leaves the
   * cell visually empty (accessibility label still applies). Defaults
   * to `dash`.
   */
  excludedStyle?: PaywallFeatureComparisonExcludedStyle;
  rows: PaywallFeatureComparisonRow[];
}

export type PaywallStepMode = "twoStep" | "singleStep";

/**
 * The step a two-step paywall is showing: `value` argues why, `purchase`
 * asks for the sale. A single-step paywall is always on `purchase`.
 */
export type PaywallStep = "value" | "purchase";

/**
 * `scroll` (default): the hero scrolls with the rest of the content, as
 * one continuous page.
 * `pinned`: the hero stays fixed behind the screen and the content
 * becomes a rounded-top sheet that rises up and scrolls over it, so the
 * hero image never moves.
 */
export type PaywallHeroLayout = "scroll" | "pinned";

export type PaywallAnimationMode = "default" | "opacity" | "none";

export interface PaywallValueStep {
  title: string;
  titleSegments?: PaywallTitleSegment[];
  subtitle?: string;
  content?: ReactNode;
  closeButtonVisibility?: "hidden" | "visible";
  /**
   * Hero rendered on the value step instead of the top-level `hero`, for a
   * paywall that leads with one hero and sells with another — an aspirational
   * photo first, the product itself once the user reaches the plans.
   *
   * Omit it and both steps share the top-level hero, unchanged.
   */
  hero?: ReactNode;
  /**
   * Value-step overrides for the top-level hero layout props. Each falls back
   * to its top-level value on its own, so a value step carrying only `hero`
   * keeps the shared ratio, fade, and layout.
   */
  heroHeightRatio?: number;
  heroFade?: boolean;
  heroLayout?: PaywallHeroLayout;
}

export type PaywallReviewRating = 1 | 2 | 3 | 4 | 5;

export interface PaywallReview {
  quote: string;
  author?: string;
  rating?: PaywallReviewRating;
}

export interface PaywallReviewSection {
  reviews: PaywallReview[];
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
  cardBorderRadius: number;
  buttonBorderRadius: number;
  titleFontSize: number;
}

export interface PaywallProps<TPackage = unknown> {
  plans: PaywallPlan<TPackage>[];
  hero: ReactNode;
  heroHeightRatio?: number;
  heroFade?: boolean;
  heroLayout?: PaywallHeroLayout;
  backgroundOverlay?: ReactNode;
  stepMode?: PaywallStepMode;
  animationMode?: PaywallAnimationMode;
  valueStep?: PaywallValueStep;
  benefits?: PaywallBenefit[];
  featureComparison?: PaywallFeatureComparison;
  content?: ReactNode;
  reviewSection?: PaywallReviewSection;
  purchaseButtonBackground?: ReactNode;
  supportMessageIcon?: ReactNode;
  copy: PaywallCopy;
  freeTrial?: boolean | PaywallFreeTrialConfig;
  selectedPlanId?: string;
  theme?: Partial<PaywallTheme>;
  isPurchasing?: boolean;
  isRestoring?: boolean;
  onSelectPlan: (planId: string) => void;
  onPurchase: (plan: PaywallPlan<TPackage>) => Promise<void> | void;
  onRestore: () => Promise<void> | void;
  onOpenDeveloperWebsite?: () => Promise<void> | void;
  onClose: () => void;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
  /**
   * Called once for every step the user lands on, the first one included:
   * a two-step paywall reports `value` on mount and `purchase` when the
   * user advances, a single-step paywall reports `purchase` on mount.
   *
   * Entry rather than change, because the step lives inside this component
   * and a consumer that only heard about changes could not tell where the
   * user started — every analytics adapter would have to re-derive the
   * initial step from `stepMode` and `valueStep` to count the funnel.
   * Returning to a step (the purchase step's back button) reports it again.
   */
  onStepView?: (step: PaywallStep) => void;
}

export interface PaywallConfig {
  hero: ReactNode;
  heroHeightRatio?: number;
  heroFade?: boolean;
  heroLayout?: PaywallHeroLayout;
  backgroundOverlay?: ReactNode;
  stepMode?: PaywallStepMode;
  animationMode?: PaywallAnimationMode;
  valueStep?: PaywallValueStep;
  benefits?: PaywallBenefit[];
  featureComparison?: PaywallFeatureComparison;
  content?: ReactNode;
  reviewSection?: PaywallReviewSection;
  purchaseButtonBackground?: ReactNode;
  supportMessageIcon?: ReactNode;
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
  supportMessageLabel?: string;
  supportMessage?: string;
}

export type ProfileBenefitDisplayMode = "list" | "usage";

export interface ProfileBenefitUsageItem {
  id: string;
  title: string;
  titleContent?: ReactNode;
  usageText: string;
  proLimitText: string;
  onPress?: () => Promise<void> | void;
}

export interface ProfileBenefitUsageSection {
  usageColumnTitle: string;
  proLimitColumnTitle: string;
  items: ProfileBenefitUsageItem[];
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
  benefitDisplayMode?: ProfileBenefitDisplayMode;
  benefitUsageSection?: ProfileBenefitUsageSection;
  content?: ReactNode;
  copy: ProfileSubscriptionCopy;
  headerIcon?: ReactNode;
  supportMessageIcon?: ReactNode;
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
  onOpenDeveloperWebsite?: () => Promise<void> | void;
  onUpgrade?: () => Promise<void> | void;
  onManageSubscription?: () => Promise<void> | void;
  onRestorePurchases: () => Promise<void> | void;
  onRedeemPromoCode?: () => Promise<void> | void;
}

export interface ProfileSubscriptionConfig {
  benefits?: PaywallBenefit[];
  benefitDisplayMode?: ProfileBenefitDisplayMode;
  benefitUsageSection?: ProfileBenefitUsageSection;
  content?: ReactNode;
  copy: ProfileSubscriptionCopy;
  headerIcon?: ReactNode;
  supportMessageIcon?: ReactNode;
  identifierSection?: ProfileIdentifiersSectionProps;
  locale?: string;
  theme?: Partial<PaywallTheme>;
  onOpenDeveloperWebsite?: () => Promise<void> | void;
}

export interface PurchasesPackageLike {
  identifier: string;
  packageType?: string;
  product: {
    price: number;
    priceString: string;
    pricePerPeriodString?: string | null;
    price_per_period?: string | null;
    pricePerWeekString?: string | null;
    pricePerMonthString?: string | null;
    pricePerYearString?: string | null;
    title?: string;
    description?: string;
    subscriptionPeriod?: string | null;
  };
}

export interface CreatePaywallPlansOptions {
  weeklyPackageIds?: string[];
  monthlyPackageIds?: string[];
  annualPackageIds?: string[];
  lifetimePackageIds?: string[];
  weeklyTitle?: string;
  monthlyTitle?: string;
  annualTitle?: string;
  lifetimeTitle?: string;
  weeklyDescription?: string;
  monthlyDescription?: string;
  annualDescription?: string;
  lifetimeDescription?: string;
  weeklySelectedDescription?: string;
  monthlySelectedDescription?: string;
  annualSelectedDescription?: string;
  lifetimeSelectedDescription?: string;
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
