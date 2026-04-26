import { createPaywallLocaleText } from "./types";

const nl = createPaywallLocaleText({
  valueStep: {
    nextButton: "Volgende",
    nextButtonAccessibilityLabel: "Doorgaan naar plankeuze",
  },
  text: {
    annualPlanTitle: "Jaarlijks",
    benefitsTitle: "Je Pro-voordelen",
    enterPromoCode: "Promocode invoeren",
    freeBadge: "GRATIS",
    lifetimePlanTitle: "Levenslang",
    manageSubscription: "Abonnement beheren",
    monthlyPlanTitle: "Maandelijks",
    oneTime: "Eenmalig",
    oneTimePayment: "Eenmalige betaling",
    opening: "Openen...",
    openingPaywall: "Paywall openen...",
    privacyText: "Privacy",
    purchaseButton: "Proefperiode starten",
    purchasingButton: "Verwerken",
    restoreButton: "Aankopen herstellen",
    restoring: "Herstellen...",
    subscriptionRenewsAutomatically: "Abonnement wordt automatisch verlengd.",
    subscribedSubtitle: "Bedankt voor je steun!",
    termsText: "Voorwaarden",
    monthlyPricePrefix: "per maand ",
    renewsOnPrefix: "Wordt verlengd op ",
    savePrefix: "Bespaar ",
    upgradePrefix: "Upgrade naar ",
  },
});

export default nl;
