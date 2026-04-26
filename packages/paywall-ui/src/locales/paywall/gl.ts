import { createPaywallLocaleText } from "./types";

const gl = createPaywallLocaleText({
  valueStep: {
    nextButton: "Seguinte",
    nextButtonAccessibilityLabel: "Continuar á selección do plan",
  },
  text: {
    annualPlanTitle: "Anual",
    benefitsTitle: "As túas vantaxes Pro",
    enterPromoCode: "Introduce o código promocional",
    freeBadge: "GRATIS",
    lifetimePlanTitle: "De por vida",
    manageSubscription: "Xestionar subscrición",
    monthlyPlanTitle: "Mensual",
    oneTime: "Pagamento único",
    oneTimePayment: "Pagamento único",
    opening: "Abrindo...",
    openingPaywall: "Abrindo a pantalla de pagamento...",
    privacyText: "Privacidade",
    purchaseButton: "Comezar proba",
    purchasingButton: "Procesando",
    restoreButton: "Restaurar compras",
    restoring: "Restaurando...",
    subscriptionRenewsAutomatically: "A subscrición renóvase automaticamente.",
    subscribedSubtitle: "Grazas polo teu apoio!",
    termsText: "Termos",
    monthlyPricePrefix: "ao mes ",
    renewsOnPrefix: "Renóvase o ",
    savePrefix: "Aforra ",
    upgradePrefix: "Actualizar a ",
  },
});

export default gl;
