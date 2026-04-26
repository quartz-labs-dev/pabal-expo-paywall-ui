import { createPaywallLocaleText } from "./types";

const sv = createPaywallLocaleText({
  valueStep: {
    nextButton: "Nästa",
    nextButtonAccessibilityLabel: "Fortsätt till planval",
  },
  text: {
    annualPlanTitle: "Årlig",
    benefitsTitle: "Dina Pro-förmåner",
    enterPromoCode: "Ange kampanjkod",
    freeBadge: "GRATIS",
    lifetimePlanTitle: "Livstid",
    manageSubscription: "Hantera prenumeration",
    monthlyPlanTitle: "Månadsvis",
    oneTime: "Engångs",
    oneTimePayment: "Engångsbetalning",
    opening: "Öppnar...",
    openingPaywall: "Öppnar betalvägg...",
    privacyText: "Integritet",
    purchaseButton: "Starta provperiod",
    purchasingButton: "Bearbetar",
    restoreButton: "Återställ köp",
    restoring: "Återställer...",
    subscriptionRenewsAutomatically: "Prenumerationen förnyas automatiskt.",
    subscribedSubtitle: "Tack för ditt stöd!",
    termsText: "Villkor",
    monthlyPricePrefix: "per mån ",
    renewsOnPrefix: "Förnyas ",
    savePrefix: "Spara ",
    upgradePrefix: "Uppgradera till ",
  },
});

export default sv;
