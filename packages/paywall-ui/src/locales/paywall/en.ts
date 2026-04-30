import { createPaywallLocaleText } from "./types";

const en = createPaywallLocaleText({
  valueStep: {
    nextButton: "Next",
    nextButtonAccessibilityLabel: "Continue to plan selection",
  },
  reviewSection: {
    reviewSectionTitle: "User reviews",
  },
  text: {
    annualPlanTitle: "Yearly",
    benefitsTitle: "Your Pro Benefits",
    continueButton: "Continue",
    enterPromoCode: "Enter promo code",
    copyIdentifierAccessibilityLabel: "Copy IDs",
    hideIdentifiersButton: "Hide IDs",
    showIdentifiersButton: "Show IDs",
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
    supportMessageLabel: "Developer's note",
    paywallSupportMessage: "Your subscription helps keep this app growing. Subscribers get smoother features, a more stable service, and steady updates first.",
    profileSupportMessage: "Your subscription helps keep this app growing. I will keep returning that support with a more stable service and steady updates. Thank you!",
    termsText: "Terms",
    monthlyPricePrefix: "",
    renewsOnPrefix: "",
    savePrefix: "",
    upgradePrefix: "Upgrade to ",
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
