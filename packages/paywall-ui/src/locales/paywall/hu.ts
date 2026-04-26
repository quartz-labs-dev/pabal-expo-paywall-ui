import { createPaywallLocaleText } from "./types";

const hu = createPaywallLocaleText({
  valueStep: {
    nextButton: "Tovább",
    nextButtonAccessibilityLabel: "Tovább a csomag kiválasztásához",
  },
  text: {
    annualPlanTitle: "Éves",
    benefitsTitle: "Pro előnyök",
    enterPromoCode: "Promóciós kód megadása",
    freeBadge: "INGYENES",
    lifetimePlanTitle: "Élettartam",
    manageSubscription: "Előfizetés kezelése",
    monthlyPlanTitle: "Havi",
    oneTime: "Egyszeri",
    oneTimePayment: "Egyszeri fizetés",
    opening: "Megnyitás...",
    openingPaywall: "Paywall megnyitása...",
    privacyText: "Adatvédelem",
    purchaseButton: "Próba indítása",
    purchasingButton: "Feldolgozás",
    restoreButton: "Vásárlások visszaállítása",
    restoring: "Visszaállítás...",
    subscriptionRenewsAutomatically: "Az előfizetés automatikusan megújul.",
    subscribedSubtitle: "Köszönjük a támogatást!",
    termsText: "Feltételek",
    monthlyPricePrefix: "havonta ",
    renewsOnPrefix: "Megújul ekkor: ",
    savePrefix: "Megtakarítás ",
    upgradePrefix: "Frissítés erre: ",
  },
});

export default hu;
