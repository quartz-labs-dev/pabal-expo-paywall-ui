import { createPaywallLocaleText } from "./types";

const da = createPaywallLocaleText({
  valueStep: {
    nextButton: "Næste",
    nextButtonAccessibilityLabel: "Fortsæt til valg af plan",
  },
  text: {
    annualPlanTitle: "Årlig",
    benefitsTitle: "Dine Pro-fordele",
    enterPromoCode: "Indtast kampagnekode",
    freeBadge: "GRATIS",
    lifetimePlanTitle: "Livstid",
    manageSubscription: "Administrer abonnement",
    monthlyPlanTitle: "Månedlig",
    oneTime: "Engangs",
    oneTimePayment: "Engangsbetaling",
    opening: "Åbner...",
    openingPaywall: "Åbner betalingsskærm...",
    privacyText: "Privatliv",
    purchaseButton: "Start prøveperiode",
    purchasingButton: "Behandler",
    restoreButton: "Gendan køb",
    restoring: "Gendanner...",
    subscriptionRenewsAutomatically: "Abonnementet fornyes automatisk.",
    subscribedSubtitle: "Tak for din støtte!",
    termsText: "Vilkår",
    monthlyPricePrefix: "pr. md. ",
    renewsOnPrefix: "Fornyes den ",
    savePrefix: "Spar ",
    upgradePrefix: "Opgrader til ",
  },
});

export default da;
