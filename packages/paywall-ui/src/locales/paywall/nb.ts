import { createPaywallLocaleText } from "./types";

const nb = createPaywallLocaleText({
  valueStep: {
    nextButton: "Neste",
    nextButtonAccessibilityLabel: "Fortsett til valg av plan",
  },
  text: {
    annualPlanTitle: "Årlig",
    benefitsTitle: "Dine Pro-fordeler",
    enterPromoCode: "Skriv inn kampanjekode",
    freeBadge: "GRATIS",
    lifetimePlanTitle: "Livstid",
    manageSubscription: "Administrer abonnement",
    monthlyPlanTitle: "Månedlig",
    oneTime: "Engangs",
    oneTimePayment: "Engangsbetaling",
    opening: "Åpner...",
    openingPaywall: "Åpner betalingsskjerm...",
    privacyText: "Personvern",
    purchaseButton: "Start prøveperiode",
    purchasingButton: "Behandler",
    restoreButton: "Gjenopprett kjøp",
    restoring: "Gjenoppretter...",
    subscriptionRenewsAutomatically: "Abonnementet fornyes automatisk.",
    subscribedSubtitle: "Takk for støtten!",
    termsText: "Vilkår",
    monthlyPricePrefix: "per md. ",
    renewsOnPrefix: "Fornyes ",
    savePrefix: "Spar ",
    upgradePrefix: "Oppgrader til ",
  },
});

export default nb;
