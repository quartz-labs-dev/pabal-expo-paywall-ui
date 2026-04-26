import { createPaywallLocaleText } from "./types";

const ptBr = createPaywallLocaleText({
  valueStep: {
    nextButton: "Avançar",
    nextButtonAccessibilityLabel: "Continuar para a escolha do plano",
  },
  text: {
    annualPlanTitle: "Anual",
    benefitsTitle: "Seus benefícios Pro",
    enterPromoCode: "Inserir código promocional",
    freeBadge: "GRÁTIS",
    lifetimePlanTitle: "Vitalício",
    manageSubscription: "Gerenciar assinatura",
    monthlyPlanTitle: "Mensal",
    oneTime: "Pagamento único",
    oneTimePayment: "Pagamento único",
    opening: "Abrindo...",
    openingPaywall: "Abrindo paywall...",
    privacyText: "Privacidade",
    purchaseButton: "Iniciar teste",
    purchasingButton: "Processando",
    restoreButton: "Restaurar compras",
    restoring: "Restaurando...",
    subscriptionRenewsAutomatically: "A assinatura renova automaticamente.",
    subscribedSubtitle: "Obrigado pelo apoio!",
    termsText: "Termos",
    monthlyPricePrefix: "por mês ",
    renewsOnPrefix: "Renova em ",
    savePrefix: "Economize ",
    upgradePrefix: "Fazer upgrade para ",
  },
});

export default ptBr;
