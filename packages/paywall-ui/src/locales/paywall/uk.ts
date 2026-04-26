import { createPaywallLocaleText } from "./types";

const uk = createPaywallLocaleText({
  valueStep: {
    nextButton: "Далі",
    nextButtonAccessibilityLabel: "Перейти до вибору плану",
  },
  text: {
    annualPlanTitle: "Річний",
    benefitsTitle: "Переваги Pro",
    enterPromoCode: "Введіть промокод",
    freeBadge: "БЕЗКОШТОВНО",
    lifetimePlanTitle: "Назавжди",
    manageSubscription: "Керувати підпискою",
    monthlyPlanTitle: "Місячний",
    oneTime: "Одноразово",
    oneTimePayment: "Одноразовий платіж",
    opening: "Відкриття...",
    openingPaywall: "Відкриття paywall...",
    privacyText: "Конфіденційність",
    purchaseButton: "Почати пробний період",
    purchasingButton: "Обробка",
    restoreButton: "Відновити покупки",
    restoring: "Відновлення...",
    subscriptionRenewsAutomatically: "Підписка поновлюється автоматично.",
    subscribedSubtitle: "Дякуємо за підтримку!",
    termsText: "Умови",
    monthlyPricePrefix: "на місяць ",
    renewsOnPrefix: "Поновлюється ",
    savePrefix: "Заощадьте ",
    upgradePrefix: "Оновити до ",
  },
});

export default uk;
