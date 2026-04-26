import { createPaywallLocaleText } from "./types";

const ru = createPaywallLocaleText({
  valueStep: {
    nextButton: "Далее",
    nextButtonAccessibilityLabel: "Перейти к выбору плана",
  },
  text: {
    annualPlanTitle: "Годовой",
    benefitsTitle: "Ваши преимущества Pro",
    enterPromoCode: "Введите промокод",
    freeBadge: "БЕСПЛАТНО",
    lifetimePlanTitle: "Навсегда",
    manageSubscription: "Управлять подпиской",
    monthlyPlanTitle: "Месячный",
    oneTime: "Разово",
    oneTimePayment: "Разовый платеж",
    opening: "Открытие...",
    openingPaywall: "Открытие paywall...",
    privacyText: "Конфиденциальность",
    purchaseButton: "Начать пробный период",
    purchasingButton: "Обработка",
    restoreButton: "Восстановить покупки",
    restoring: "Восстановление...",
    subscriptionRenewsAutomatically: "Подписка продлевается автоматически.",
    subscribedSubtitle: "Спасибо за поддержку!",
    termsText: "Условия",
    monthlyPricePrefix: "в месяц ",
    renewsOnPrefix: "Продлевается ",
    savePrefix: "Сэкономьте ",
    upgradePrefix: "Перейти на ",
  },
});

export default ru;
