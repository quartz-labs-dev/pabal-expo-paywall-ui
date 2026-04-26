import { createPaywallLocaleText } from "./types";

const ko = createPaywallLocaleText({
  valueStep: {
    nextButton: "다음",
    nextButtonAccessibilityLabel: "요금제 선택으로 계속",
  },
  text: {
    annualPlanTitle: "연간",
    benefitsTitle: "Pro 혜택",
    enterPromoCode: "프로모션 코드 입력",
    freeBadge: "무료",
    lifetimePlanTitle: "평생",
    manageSubscription: "구독 관리",
    monthlyPlanTitle: "월간",
    oneTime: "일회성 구매",
    oneTimePayment: "일회성 구매",
    opening: "여는 중...",
    openingPaywall: "페이월 여는 중...",
    privacyText: "개인정보 처리방침",
    purchaseButton: "무료 체험 시작",
    purchasingButton: "처리 중",
    restoreButton: "구매 복원",
    restoring: "복원 중...",
    subscriptionRenewsAutomatically: "구독은 자동으로 갱신됩니다.",
    subscribedSubtitle: "지원해 주셔서 감사합니다!",
    termsText: "이용약관",
    monthlyPricePrefix: "월 ",
    renewsOnSuffix: " 갱신",
    savePrefix: "",
    saveSuffix: " 할인",
    upgradeSuffix: "로 업그레이드",
    upgradePrefix: "",
  },
});

export default ko;
