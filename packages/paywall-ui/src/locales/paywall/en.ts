import { createPaywallLocaleText } from "./types";

const en = createPaywallLocaleText({
  valueStep: {
    nextButton: "Next",
    nextButtonAccessibilityLabel: "Continue to plan selection",
  },
  text: {
    annualPlanTitle: "Yearly",
    benefitsTitle: "Your Pro Benefits",
    continueButton: "Continue",
    enterPromoCode: "Enter promo code",
    freeBadge: "FREE",
    lifetimePlanTitle: "Lifetime",
    manageSubscription: "Manage subscription",
    monthlyPlanTitle: "Monthly",
    oneTime: "One-time payment",
    oneTimePayment: "One-time payment",
    opening: "Opening...",
    openingPaywall: "Opening paywall...",
    privacyText: "Privacy",
    purchaseButton: "Start trial",
    purchasingButton: "Processing",
    restoreButton: "Restore purchases",
    restoring: "Restoring...",
    subscriptionRenewsAutomatically: "Subscription renews automatically.",
    subscribedSubtitle: "Thank you for your support!",
    termsText: "Terms",
    monthlyPricePrefix: "",
    renewsOnPrefix: "",
    savePrefix: "",
    upgradePrefix: "",
    closeButtonAccessibilityLabel: "Close paywall",
    monthlyPriceSuffix: " / mo",
    pricePerAnnualPeriodSuffix: " / year",
    pricePerMonthlyPeriodSuffix: " / month",
    renewsOnSuffix: "",
    saveSuffix: "",
    trialDayPlural: "days",
    trialDaySingular: "day",
    trialDurationSeparator: " ",
    trialIncludedTitlePrefix: "",
    trialIncludedTitleSuffix: " free trial included",
    trialPriceDisclosureFreeSuffix: " free",
    trialPriceDisclosureThenPrefix: "then ",
    trialWeekPlural: "weeks",
    trialWeekSingular: "week",
    upgradeSuffix: "",
    formatTrialIncludedTitle: (duration) => {
      const unit = duration.unit === "week" ? "Week" : "Day";
      return `${duration.value}-${unit} Free Trial Included`;
    },
    trialIncludedDescription:
      "Cancel anytime in your subscription settings. No charge if cancelled before trial ends.",
  },
});

export default en;
