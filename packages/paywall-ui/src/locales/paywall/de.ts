import { createPaywallLocaleText } from "./types";

const de = createPaywallLocaleText({
  valueStep: {
    nextButton: "Weiter",
    nextButtonAccessibilityLabel: "Weiter zur Planauswahl",
  },
  text: {
    annualPlanTitle: "Jährlich",
    benefitsTitle: "Deine Pro-Vorteile",
    enterPromoCode: "Promocode eingeben",
    freeBadge: "KOSTENLOS",
    lifetimePlanTitle: "Lebenslang",
    manageSubscription: "Abo verwalten",
    monthlyPlanTitle: "Monatlich",
    oneTime: "Einmalig",
    oneTimePayment: "Einmalzahlung",
    opening: "Wird geöffnet...",
    openingPaywall: "Paywall wird geöffnet...",
    privacyText: "Datenschutz",
    purchaseButton: "Testversion starten",
    purchasingButton: "Verarbeitung",
    restoreButton: "Käufe wiederherstellen",
    restoring: "Wiederherstellung...",
    subscriptionRenewsAutomatically: "Das Abonnement verlängert sich automatisch.",
    subscribedSubtitle: "Danke für deine Unterstützung!",
    termsText: "Bedingungen",
    monthlyPricePrefix: "monatlich ",
    renewsOnPrefix: "Verlängert sich am ",
    savePrefix: "Spare ",
    upgradePrefix: "Upgrade auf ",
  },
});

export default de;
