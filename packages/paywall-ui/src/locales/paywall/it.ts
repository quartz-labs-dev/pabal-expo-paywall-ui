import { createPaywallLocaleText } from "./types";

const it = createPaywallLocaleText({
  valueStep: {
    nextButton: "Avanti",
    nextButtonAccessibilityLabel: "Continua alla selezione del piano",
  },
  text: {
    annualPlanTitle: "Annuale",
    benefitsTitle: "I tuoi vantaggi Pro",
    enterPromoCode: "Inserisci codice promo",
    freeBadge: "GRATIS",
    lifetimePlanTitle: "A vita",
    manageSubscription: "Gestisci abbonamento",
    monthlyPlanTitle: "Mensile",
    oneTime: "Una tantum",
    oneTimePayment: "Pagamento una tantum",
    opening: "Apertura...",
    openingPaywall: "Apertura paywall...",
    privacyText: "Privacy",
    purchaseButton: "Inizia prova",
    purchasingButton: "Elaborazione",
    restoreButton: "Ripristina acquisti",
    restoring: "Ripristino...",
    subscriptionRenewsAutomatically: "L'abbonamento si rinnova automaticamente.",
    subscribedSubtitle: "Grazie per il supporto!",
    termsText: "Termini",
    monthlyPricePrefix: "al mese ",
    renewsOnPrefix: "Si rinnova il ",
    savePrefix: "Risparmia ",
    upgradePrefix: "Passa a ",
  },
});

export default it;
