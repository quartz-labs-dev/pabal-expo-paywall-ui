import { createPaywallLocaleText } from "./types";

const zhHant = createPaywallLocaleText({
  valueStep: {
    nextButton: "下一步",
    nextButtonAccessibilityLabel: "繼續選擇方案",
  },
  text: {
    annualPlanTitle: "年度",
    benefitsTitle: "Pro 權益",
    enterPromoCode: "輸入優惠碼",
    freeBadge: "免費",
    lifetimePlanTitle: "終身",
    manageSubscription: "管理訂閱",
    monthlyPlanTitle: "月度",
    oneTime: "一次性",
    oneTimePayment: "一次性付款",
    opening: "正在開啟...",
    openingPaywall: "正在開啟付費頁...",
    privacyText: "隱私",
    purchaseButton: "開始試用",
    purchasingButton: "處理中",
    restoreButton: "恢復購買",
    restoring: "正在恢復...",
    subscriptionRenewsAutomatically: "訂閱會自動續訂。",
    subscribedSubtitle: "感謝你的支持！",
    termsText: "條款",
    annualPlanPrefix: "年度",
    lifetimePlanPrefix: "終身",
    monthlyPlanPrefix: "月度",
    monthlyPricePrefix: "每月 ",
    renewsOnSuffix: " 續訂",
    savePrefix: "節省 ",
    upgradeSuffix: "升級",
    upgradePrefix: "",
  },
});

export default zhHant;
