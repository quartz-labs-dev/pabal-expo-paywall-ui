import {
  PAYWALL_TEXT,
  PAYWALL_TEXT_LOCALES,
  PAYWALL_VALUE_STEP_TEXT,
} from "./locales/paywall";
import type { PaywallText, PaywallTextLocale } from "./locales/paywall";
import type {
  CreatePaywallPlansOptions,
  PaywallCopy,
  PaywallPlanPeriod,
  ProfileSubscriptionCopy,
} from "./types";

export { PAYWALL_TEXT_LOCALES };
export type { PaywallTextLocale };

const DEFAULT_PAYWALL_TEXT_LOCALE: PaywallTextLocale = "en";

const isPaywallTextLocale = (locale: string): locale is PaywallTextLocale => {
  return PAYWALL_TEXT_LOCALES.includes(locale as PaywallTextLocale);
};

const getPaywallText = (locale?: string): PaywallText => {
  return PAYWALL_TEXT[resolvePaywallTextLocale(locale)];
};

export const resolvePaywallTextLocale = (
  locale?: string,
): PaywallTextLocale => {
  const normalizedLocale = locale?.replace("_", "-").trim();
  if (!normalizedLocale) return DEFAULT_PAYWALL_TEXT_LOCALE;

  const lowerLocale = normalizedLocale.toLowerCase();
  if (lowerLocale === "ptbr" || lowerLocale === "pt-br") return "ptBr";
  if (lowerLocale === "zhhans" || lowerLocale.includes("zh-hans")) {
    return "zhHans";
  }
  if (lowerLocale === "zhhant" || lowerLocale.includes("zh-hant")) {
    return "zhHant";
  }
  if (
    lowerLocale === "zh-hk" ||
    lowerLocale === "zh-mo" ||
    lowerLocale === "zh-tw"
  ) {
    return "zhHant";
  }
  if (lowerLocale.startsWith("zh")) return "zhHans";
  if (lowerLocale.startsWith("no") || lowerLocale.startsWith("nb")) return "nb";

  const languageCode = lowerLocale.split("-")[0] ?? "";
  if (isPaywallTextLocale(languageCode)) return languageCode;

  return DEFAULT_PAYWALL_TEXT_LOCALE;
};

export const getDefaultPaywallPlanOptions = (
  locale?: string,
): CreatePaywallPlansOptions => {
  const text = getPaywallText(locale);

  return {
    annualTitle: text.annualPlanTitle,
    lifetimeBadgeText: text.oneTime,
    lifetimeTitle: text.lifetimePlanTitle,
    monthlyTitle: text.monthlyPlanTitle,
    formatDiscountText: text.saveDiscount,
    formatMonthlyPriceText: text.monthlyPrice,
  };
};

export const getDefaultPaywallCopy = (
  locale: string | undefined,
  copy: Pick<PaywallCopy, "title"> &
    Partial<
      Omit<
        PaywallCopy,
        "purchaseButton" | "restoreButton" | "termsText" | "title"
      >
    >,
): PaywallCopy => {
  const text = getPaywallText(locale);

  return {
    purchaseButton: text.purchaseButton,
    purchasingButton: text.purchasingButton,
    restoreButton: text.restoreButton,
    termsText: text.termsText,
    privacyText: text.privacyText,
    legalPrefix: text.subscriptionRenewsAutomatically,
    ...PAYWALL_VALUE_STEP_TEXT[resolvePaywallTextLocale(locale)],
    ...copy,
  };
};

export const getDefaultProfileSubscriptionCopy = (
  locale?: string,
  options: { productName?: string } = {},
): ProfileSubscriptionCopy => {
  const productName = options.productName ?? "Pro";
  const text = getPaywallText(locale);

  return {
    subscribedTitle: productName,
    subscribedSubtitle: text.subscribedSubtitle,
    notSubscribedTitle: productName,
    subscribedBadge: "PRO",
    notSubscribedBadge: text.freeBadge,
    benefitsTitle: text.benefitsTitle,
    upgradeButton: text.upgradeTo(productName),
    upgradingButton: text.openingPaywall,
    manageSubscriptionButton: text.manageSubscription,
    managingSubscriptionButton: text.opening,
    restorePurchasesButton: text.restoreButton,
    restoringPurchasesButton: text.restoring,
    redeemPromoCodeButton: text.enterPromoCode,
    redeemingPromoCodeButton: text.opening,
  };
};

export const getDefaultProfilePlanLabel = (
  period: PaywallPlanPeriod,
  locale?: string,
  options: { productName?: string } = {},
): string => {
  const productName = options.productName ?? "Pro";
  const text = getPaywallText(locale);

  if (period === "lifetime") return text.lifetimeProfilePlan(productName);
  if (period === "monthly") return text.monthlyProfilePlan(productName);
  return text.annualProfilePlan(productName);
};

export const getDefaultProfileRenewalLabel = (
  period: PaywallPlanPeriod,
  dateText: string,
  locale?: string,
): string => {
  const text = getPaywallText(locale);
  if (period === "lifetime") return text.oneTimePayment;
  return text.renewsOn(dateText);
};
