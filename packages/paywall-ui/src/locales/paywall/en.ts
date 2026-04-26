import { createPaywallLocaleText } from "./types";

const en = createPaywallLocaleText({
  valueStep: {
    nextButton: "Next",
    nextButtonAccessibilityLabel: "Continue to plan selection",
  },
  text: {
    annualPlanTitle: "Yearly",
    benefitsTitle: "Your Pro Benefits",
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
  },
});

export default en;
