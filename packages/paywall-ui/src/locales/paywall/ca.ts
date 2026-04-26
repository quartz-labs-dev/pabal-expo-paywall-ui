import { createPaywallLocaleText } from "./types";

const ca = createPaywallLocaleText({
  valueStep: {
    nextButton: "Següent",
    nextButtonAccessibilityLabel: "Continua a la selecció del pla",
  },
  text: {
    annualPlanTitle: "Anual",
    benefitsTitle: "Els teus avantatges Pro",
    enterPromoCode: "Introdueix el codi promocional",
    freeBadge: "GRATIS",
    lifetimePlanTitle: "De per vida",
    manageSubscription: "Gestiona la subscripció",
    monthlyPlanTitle: "Mensual",
    oneTime: "Pagament únic",
    oneTimePayment: "Pagament únic",
    opening: "Obrint...",
    openingPaywall: "Obrint la pantalla de pagament...",
    privacyText: "Privadesa",
    purchaseButton: "Comença la prova",
    purchasingButton: "Processant",
    restoreButton: "Restaura compres",
    restoring: "Restaurant...",
    subscriptionRenewsAutomatically: "La subscripció es renova automàticament.",
    subscribedSubtitle: "Gràcies pel teu suport!",
    termsText: "Condicions",
    monthlyPricePrefix: "al mes ",
    renewsOnPrefix: "Es renova el ",
    savePrefix: "Estalvia ",
    upgradePrefix: "Actualitza a ",
  },
});

export default ca;
