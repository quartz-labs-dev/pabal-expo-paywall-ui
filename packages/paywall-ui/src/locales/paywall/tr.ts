import { createPaywallLocaleText } from "./types";

const tr = createPaywallLocaleText({
  valueStep: {
    nextButton: "İleri",
    nextButtonAccessibilityLabel: "Plan seçimine devam et",
  },
  text: {
    annualPlanTitle: "Yıllık",
    benefitsTitle: "Pro avantajları",
    enterPromoCode: "Promosyon kodu gir",
    freeBadge: "ÜCRETSİZ",
    lifetimePlanTitle: "Ömür boyu",
    manageSubscription: "Aboneliği yönet",
    monthlyPlanTitle: "Aylık",
    oneTime: "Tek seferlik",
    oneTimePayment: "Tek seferlik ödeme",
    opening: "Açılıyor...",
    openingPaywall: "Paywall açılıyor...",
    privacyText: "Gizlilik",
    purchaseButton: "Denemeyi başlat",
    purchasingButton: "İşleniyor",
    restoreButton: "Satın alımları geri yükle",
    restoring: "Geri yükleniyor...",
    subscriptionRenewsAutomatically: "Abonelik otomatik olarak yenilenir.",
    subscribedSubtitle: "Desteğiniz için teşekkürler!",
    termsText: "Şartlar",
    monthlyPricePrefix: "aylık ",
    renewsOnPrefix: "Yenilenme tarihi: ",
    savePrefix: "",
    saveSuffix: " tasarruf",
    upgradePrefix: "Şuna yükselt: ",
  },
});

export default tr;
