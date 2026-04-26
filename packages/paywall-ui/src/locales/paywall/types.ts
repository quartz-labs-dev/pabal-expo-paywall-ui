import type { PaywallCopy } from "../../types";

export interface PaywallText {
  annualPlanTitle: string;
  benefitsTitle: string;
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
  annualProfilePlan: (productName: string) => string;
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
    | "lifetimeProfilePlan"
    | "monthlyPrice"
    | "monthlyProfilePlan"
    | "renewsOn"
    | "saveDiscount"
    | "upgradeTo"
  > {
  annualPlanPrefix?: string;
  lifetimePlanPrefix?: string;
  monthlyPlanPrefix?: string;
  monthlyPricePrefix?: string;
  renewsOnPrefix?: string;
  renewsOnSuffix?: string;
  savePrefix?: string;
  saveSuffix?: string;
  upgradePrefix?: string;
  upgradeSuffix?: string;
}

export interface PaywallLocaleText {
  text: PaywallText;
  valueStep: PaywallValueStepText;
}

const createPaywallText = (text: PaywallTextInput): PaywallText => {
  return {
    ...text,
    annualProfilePlan: (productName) =>
      `${text.annualPlanPrefix ?? text.annualPlanTitle} ${productName}`,
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
