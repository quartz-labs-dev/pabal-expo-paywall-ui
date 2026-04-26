import { createPaywallLocaleText } from "./types";

const bg = createPaywallLocaleText({
  valueStep: {
    nextButton: "Напред",
    nextButtonAccessibilityLabel: "Продължете към избора на план",
  },
  text: {
    annualPlanTitle: "Годишен",
    benefitsTitle: "Pro предимства",
    enterPromoCode: "Въведете промокод",
    freeBadge: "БЕЗПЛАТНО",
    lifetimePlanTitle: "Доживотен",
    manageSubscription: "Управление на абонамент",
    monthlyPlanTitle: "Месечен",
    oneTime: "Еднократно",
    oneTimePayment: "Еднократно плащане",
    opening: "Отваряне...",
    openingPaywall: "Отваряне на paywall...",
    privacyText: "Поверителност",
    purchaseButton: "Започнете пробен период",
    purchasingButton: "Обработка",
    restoreButton: "Възстановяване на покупки",
    restoring: "Възстановяване...",
    subscriptionRenewsAutomatically: "Абонаментът се подновява автоматично.",
    subscribedSubtitle: "Благодарим за подкрепата!",
    termsText: "Условия",
    monthlyPricePrefix: "месечно ",
    renewsOnPrefix: "Подновява се на ",
    savePrefix: "Спестете ",
    upgradePrefix: "Надстройка до ",
  },
});

export default bg;
