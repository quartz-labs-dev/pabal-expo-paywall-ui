import { createPaywallLocaleText } from "./types";

const mk = createPaywallLocaleText({
  valueStep: {
    nextButton: "Следно",
    nextButtonAccessibilityLabel: "Продолжи кон избор на план",
  },
  text: {
    annualPlanTitle: "Годишно",
    benefitsTitle: "Вашите Pro придобивки",
    enterPromoCode: "Внесете промо код",
    freeBadge: "БЕСПЛАТНО",
    lifetimePlanTitle: "Доживотно",
    manageSubscription: "Управувај со претплата",
    monthlyPlanTitle: "Месечно",
    oneTime: "Еднократно купување",
    oneTimePayment: "Еднократно купување",
    opening: "Се отвора...",
    openingPaywall: "Се отвора страница за плаќање...",
    privacyText: "Приватност",
    purchaseButton: "Започни проба",
    purchasingButton: "Се обработува",
    restoreButton: "Врати купувања",
    restoring: "Се враќа...",
    subscriptionRenewsAutomatically: "Претплатата се обновува автоматски.",
    subscribedSubtitle: "Ви благодариме за поддршката!",
    termsText: "Услови",
    monthlyPricePrefix: "месечно ",
    renewsOnPrefix: "Се обновува ",
    savePrefix: "Заштедете ",
    upgradePrefix: "Надгради на ",
  },
});

export default mk;
