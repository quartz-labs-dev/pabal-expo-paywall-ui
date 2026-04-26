import { createPaywallLocaleText } from "./types";

const pl = createPaywallLocaleText({
  valueStep: {
    nextButton: "Dalej",
    nextButtonAccessibilityLabel: "Przejdź do wyboru planu",
  },
  text: {
    annualPlanTitle: "Roczny",
    benefitsTitle: "Korzyści Pro",
    enterPromoCode: "Wpisz kod promocyjny",
    freeBadge: "DARMOWE",
    lifetimePlanTitle: "Dożywotni",
    manageSubscription: "Zarządzaj subskrypcją",
    monthlyPlanTitle: "Miesięczny",
    oneTime: "Jednorazowo",
    oneTimePayment: "Płatność jednorazowa",
    opening: "Otwieranie...",
    openingPaywall: "Otwieranie paywalla...",
    privacyText: "Prywatność",
    purchaseButton: "Rozpocznij okres próbny",
    purchasingButton: "Przetwarzanie",
    restoreButton: "Przywróć zakupy",
    restoring: "Przywracanie...",
    subscriptionRenewsAutomatically: "Subskrypcja odnawia się automatycznie.",
    subscribedSubtitle: "Dziękujemy za wsparcie!",
    termsText: "Warunki",
    monthlyPricePrefix: "miesięcznie ",
    renewsOnPrefix: "Odnawia się ",
    savePrefix: "Oszczędź ",
    upgradePrefix: "Ulepsz do ",
  },
});

export default pl;
