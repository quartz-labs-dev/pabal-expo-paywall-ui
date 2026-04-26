import type { PaywallCopy } from "../../types";
import type {
  PaywallPlanPeriod,
  PaywallTrialDuration,
  PaywallTrialUnit,
} from "../../types";

export interface PaywallText {
  annualPlanTitle: string;
  benefitsTitle: string;
  continueButton: string;
  enterPromoCode: string;
  freeBadge: string;
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
  subscriptionRenewsAutomatically: string;
  restoreButton: string;
  restoring: string;
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

export interface PaywallValueStepText
  extends Required<
    Pick<PaywallCopy, "nextButton" | "nextButtonAccessibilityLabel">
  > {}

interface PaywallTextInput
  extends Omit<
    PaywallText,
    | "annualProfilePlan"
    | "continueButton"
    | "formatPricePerPeriodText"
    | "formatTrialDuration"
    | "formatTrialIncludedTitle"
    | "formatTrialPriceDisclosure"
    | "lifetimeProfilePlan"
    | "monthlyPrice"
    | "monthlyProfilePlan"
    | "renewsOn"
    | "saveDiscount"
    | "trialIncludedDescription"
    | "upgradeTo"
  > {
  annualPlanPrefix?: string;
  continueButton?: string;
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
  monthlyPricePrefix?: string;
  pricePerAnnualPeriodSuffix?: string;
  pricePerMonthlyPeriodSuffix?: string;
  renewsOnPrefix?: string;
  renewsOnSuffix?: string;
  savePrefix?: string;
  saveSuffix?: string;
  trialDaySingular?: string;
  trialDayPlural?: string;
  trialDurationSeparator?: string;
  trialIncludedDescription?: string;
  trialIncludedTitlePrefix?: string;
  trialIncludedTitleSuffix?: string;
  trialPriceDisclosureFreeSuffix?: string;
  trialPriceDisclosureThenPrefix?: string;
  trialWeekSingular?: string;
  trialWeekPlural?: string;
  upgradePrefix?: string;
  upgradeSuffix?: string;
}

export interface PaywallLocaleText {
  text: PaywallText;
  valueStep: PaywallValueStepText;
}

const getDefaultTrialUnitLabel = (
  value: number,
  unit: PaywallTrialUnit,
  text: PaywallTextInput,
): string => {
  if (unit === "week") {
    return value === 1
      ? text.trialWeekSingular ?? "week"
      : text.trialWeekPlural ?? "weeks";
  }

  return value === 1
    ? text.trialDaySingular ?? "day"
    : text.trialDayPlural ?? "days";
};

const createPaywallText = (text: PaywallTextInput): PaywallText => {
  const formatDefaultTrialDuration = (duration: PaywallTrialDuration) => {
    return `${duration.value}${text.trialDurationSeparator ?? " "}${getDefaultTrialUnitLabel(
      duration.value,
      duration.unit,
      text,
    )}`;
  };
  const formatTrialDuration =
    text.formatTrialDuration ?? formatDefaultTrialDuration;

  return {
    ...text,
    continueButton: text.continueButton ?? "Continue",
    trialIncludedDescription:
      text.trialIncludedDescription ??
      "Cancel anytime in your subscription settings. No charge if cancelled before trial ends.",
    annualProfilePlan: (productName) =>
      `${text.annualPlanPrefix ?? text.annualPlanTitle} ${productName}`,
    formatPricePerPeriodText:
      text.formatPricePerPeriodText ??
      ((priceText, period) =>
        period === "annual"
          ? `${priceText}${text.pricePerAnnualPeriodSuffix ?? " / year"}`
          : `${priceText}${text.pricePerMonthlyPeriodSuffix ?? " / month"}`),
    formatTrialDuration,
    formatTrialIncludedTitle:
      text.formatTrialIncludedTitle ??
      ((duration) =>
        `${text.trialIncludedTitlePrefix ?? ""}${formatTrialDuration(duration)}${
          text.trialIncludedTitleSuffix ?? " Free Trial Included"
        }`),
    formatTrialPriceDisclosure:
      text.formatTrialPriceDisclosure ??
      ((duration, pricePerPeriodText) =>
        `${formatTrialDuration(duration)}${
          text.trialPriceDisclosureFreeSuffix ?? " free"
        }, ${text.trialPriceDisclosureThenPrefix ?? "then "}${pricePerPeriodText}`),
    lifetimeProfilePlan: (productName) =>
      `${text.lifetimePlanPrefix ?? text.lifetimePlanTitle} ${productName}`,
    monthlyPrice: (priceText) =>
      `${text.monthlyPricePrefix ?? ""}${priceText}${
        text.monthlyPricePrefix ? "" : " / mo"
      }`,
    monthlyProfilePlan: (productName) =>
      `${text.monthlyPlanPrefix ?? text.monthlyPlanTitle} ${productName}`,
    renewsOn: (dateText) =>
      `${text.renewsOnPrefix ?? "Renews on "}${dateText}${
        text.renewsOnSuffix ?? ""
      }`,
    saveDiscount: (discountPercentage) =>
      `${text.savePrefix ?? "Save "}${discountPercentage}%${text.saveSuffix ?? ""}`,
    upgradeTo: (productName) =>
      `${text.upgradePrefix ?? "Upgrade to "}${productName}${
        text.upgradeSuffix ?? ""
      }`,
  };
};

export const createPaywallLocaleText = (localeText: {
  text: PaywallTextInput;
  valueStep: PaywallValueStepText;
}): PaywallLocaleText => {
  return {
    text: createPaywallText(localeText.text),
    valueStep: localeText.valueStep,
  };
};
