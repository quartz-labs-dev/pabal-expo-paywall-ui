import { createPaywallLocaleText } from "./types";

const eu = createPaywallLocaleText({
  valueStep: {
    nextButton: "Hurrengoa",
    nextButtonAccessibilityLabel: "Jarraitu planaren hautaketara",
  },
  text: {
    annualPlanTitle: "Urtekoa",
    benefitsTitle: "Zure Pro abantailak",
    enterPromoCode: "Sartu promozio-kodea",
    freeBadge: "DOAN",
    lifetimePlanTitle: "Betikoa",
    manageSubscription: "Kudeatu harpidetza",
    monthlyPlanTitle: "Hilekoa",
    oneTime: "Ordainketa bakarra",
    oneTimePayment: "Ordainketa bakarra",
    opening: "Irekitzen...",
    openingPaywall: "Ordainketa-pantaila irekitzen...",
    privacyText: "Pribatutasuna",
    purchaseButton: "Hasi proba",
    purchasingButton: "Prozesatzen",
    restoreButton: "Berrezarri erosketak",
    restoring: "Berrezartzen...",
    subscriptionRenewsAutomatically: "Harpidetza automatikoki berritzen da.",
    subscribedSubtitle: "Eskerrik asko zure laguntzagatik!",
    termsText: "Baldintzak",
    monthlyPricePrefix: "hilean ",
    renewsOnPrefix: "Berrituko da ",
    savePrefix: "Aurreztu ",
    upgradePrefix: "Berritu hona: ",
  },
});

export default eu;
