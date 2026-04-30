import type {
  PaywallPlanPeriod,
  PaywallTrialDuration,
  PaywallTrialUnit,
} from "../../types";

export interface PaywallText {
  annualPlanTitle: string;
  benefitsTitle: string;
  closeButtonAccessibilityLabel: string;
  continueButton: string;
  copyIdentifierAccessibilityLabel: string;
  enterPromoCode: string;
  freeBadge: string;
  hideIdentifiersButton: string;
  lifetimePlanTitle: string;
  manageSubscription: string;
  monthlyPlanTitle: string;
  oneTime: string;
  oneTimePayment: string;
  opening: string;
  openingPaywall: string;
  privacyText: string;
  purchaseButton: string;
  purchasingButton: string;
  paywallSupportMessage: string;
  profileSupportMessage: string;
  subscriptionRenewsAutomatically: string;
  restoreButton: string;
  restoring: string;
  showIdentifiersButton: string;
  subscribedSubtitle: string;
  termsText: string;
  trialIncludedDescription: string;
  annualProfilePlan: (productName: string) => string;
  formatPricePerPeriodText: (
    priceText: string,
    period: Exclude<PaywallPlanPeriod, "lifetime">
  ) => string;
  formatTrialDuration: (duration: PaywallTrialDuration) => string;
  formatTrialIncludedTitle: (duration: PaywallTrialDuration) => string;
  formatTrialPriceDisclosure: (
    duration: PaywallTrialDuration,
    pricePerPeriodText: string
  ) => string;
  lifetimeProfilePlan: (productName: string) => string;
  monthlyPrice: (priceText: string) => string;
  monthlyProfilePlan: (productName: string) => string;
  renewsOn: (dateText: string) => string;
  saveDiscount: (discountPercentage: number) => string;
  upgradeTo: (productName: string) => string;
}

export interface PaywallValueStepText {
  nextButton: string;
  nextButtonAccessibilityLabel: string;
}

export interface PaywallReviewSectionText {
  reviewSectionTitle: string;
}

interface PaywallTextInput
  extends Omit<
    PaywallText,
    | "annualProfilePlan"
    | "formatPricePerPeriodText"
    | "formatTrialDuration"
    | "formatTrialIncludedTitle"
    | "formatTrialPriceDisclosure"
    | "lifetimeProfilePlan"
    | "monthlyPrice"
    | "monthlyProfilePlan"
    | "renewsOn"
    | "saveDiscount"
    | "upgradeTo"
  > {
  annualPlanPrefix?: string;
  formatPricePerPeriodText?: (
    priceText: string,
    period: Exclude<PaywallPlanPeriod, "lifetime">
  ) => string;
  formatTrialDuration?: (duration: PaywallTrialDuration) => string;
  formatTrialIncludedTitle?: (duration: PaywallTrialDuration) => string;
  formatTrialPriceDisclosure?: (
    duration: PaywallTrialDuration,
    pricePerPeriodText: string
  ) => string;
  lifetimePlanPrefix?: string;
  monthlyPlanPrefix?: string;
  monthlyPricePrefix: string;
  monthlyPriceSuffix: string;
  pricePerAnnualPeriodSuffix: string;
  pricePerMonthlyPeriodSuffix: string;
  renewsOnPrefix: string;
  renewsOnSuffix: string;
  savePrefix: string;
  saveSuffix: string;
  trialDaySingular: string;
  trialDayPlural: string;
  trialDurationSeparator: string;
  trialIncludedTitlePrefix: string;
  trialIncludedTitleSuffix: string;
  trialPriceDisclosureFreeSuffix: string;
  trialPriceDisclosureThenPrefix: string;
  trialWeekSingular: string;
  trialWeekPlural: string;
  upgradePrefix: string;
  upgradeSuffix: string;
}

export interface PaywallLocaleText {
  text: PaywallText;
  valueStep: PaywallValueStepText;
  reviewSection: PaywallReviewSectionText;
}

const getDefaultTrialUnitLabel = (
  value: number,
  unit: PaywallTrialUnit,
  text: PaywallTextInput,
): string => {
  if (unit === "week") {
    return value === 1 ? text.trialWeekSingular : text.trialWeekPlural;
  }

  return value === 1 ? text.trialDaySingular : text.trialDayPlural;
};

const createPaywallText = (text: PaywallTextInput): PaywallText => {
  const formatDefaultTrialDuration = (duration: PaywallTrialDuration) => {
    return `${duration.value}${text.trialDurationSeparator}${getDefaultTrialUnitLabel(
      duration.value,
      duration.unit,
      text,
    )}`;
  };
  const formatTrialDuration =
    text.formatTrialDuration ?? formatDefaultTrialDuration;

  return {
    ...text,
    continueButton: text.continueButton,
    trialIncludedDescription: text.trialIncludedDescription,
    annualProfilePlan: (productName) =>
      `${text.annualPlanPrefix ?? text.annualPlanTitle} ${productName}`,
    formatPricePerPeriodText:
      text.formatPricePerPeriodText ??
      ((priceText, period) =>
        period === "annual"
          ? `${priceText}${text.pricePerAnnualPeriodSuffix}`
          : `${priceText}${text.pricePerMonthlyPeriodSuffix}`),
    formatTrialDuration,
    formatTrialIncludedTitle:
      text.formatTrialIncludedTitle ??
      ((duration) =>
        `${text.trialIncludedTitlePrefix}${formatTrialDuration(duration)}${
          text.trialIncludedTitleSuffix
        }`),
    formatTrialPriceDisclosure:
      text.formatTrialPriceDisclosure ??
      ((duration, pricePerPeriodText) =>
        `${formatTrialDuration(duration)}${
          text.trialPriceDisclosureFreeSuffix
        }, ${text.trialPriceDisclosureThenPrefix}${pricePerPeriodText}`),
    lifetimeProfilePlan: (productName) =>
      `${text.lifetimePlanPrefix ?? text.lifetimePlanTitle} ${productName}`,
    monthlyPrice: (priceText) =>
      `${text.monthlyPricePrefix}${priceText}${text.monthlyPriceSuffix}`,
    monthlyProfilePlan: (productName) =>
      `${text.monthlyPlanPrefix ?? text.monthlyPlanTitle} ${productName}`,
    renewsOn: (dateText) =>
      `${text.renewsOnPrefix}${dateText}${text.renewsOnSuffix}`,
    saveDiscount: (discountPercentage) =>
      `${text.savePrefix}${discountPercentage}%${text.saveSuffix}`,
    upgradeTo: (productName) =>
      `${text.upgradePrefix}${productName}${text.upgradeSuffix}`,
  };
};

export const createPaywallLocaleText = (localeText: {
  text: PaywallTextInput;
  valueStep: PaywallValueStepText;
  reviewSection: PaywallReviewSectionText;
}): PaywallLocaleText => {
  return {
    text: createPaywallText(localeText.text),
    valueStep: localeText.valueStep,
    reviewSection: localeText.reviewSection,
  };
};
