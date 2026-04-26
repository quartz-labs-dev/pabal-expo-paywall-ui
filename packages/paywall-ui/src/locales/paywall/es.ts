import { createPaywallLocaleText } from "./types";

const es = createPaywallLocaleText({
  valueStep: {
    nextButton: "Siguiente",
    nextButtonAccessibilityLabel: "Continuar a la selección del plan",
  },
  text: {
    annualPlanTitle: "Anual",
    benefitsTitle: "Tus ventajas Pro",
    enterPromoCode: "Ingresar código promocional",
    freeBadge: "GRATIS",
    lifetimePlanTitle: "De por vida",
    manageSubscription: "Gestionar suscripción",
    monthlyPlanTitle: "Mensual",
    oneTime: "Pago único",
    oneTimePayment: "Pago único",
    opening: "Abriendo...",
    openingPaywall: "Abriendo paywall...",
    privacyText: "Privacidad",
    purchaseButton: "Iniciar prueba",
    purchasingButton: "Procesando",
    restoreButton: "Restaurar compras",
    restoring: "Restaurando...",
    subscriptionRenewsAutomatically: "La suscripción se renueva automáticamente.",
    subscribedSubtitle: "¡Gracias por tu apoyo!",
    termsText: "Términos",
    monthlyPricePrefix: "al mes ",
    renewsOnPrefix: "Se renueva el ",
    savePrefix: "Ahorra ",
    upgradePrefix: "Mejorar a ",
  },
});

export default es;
