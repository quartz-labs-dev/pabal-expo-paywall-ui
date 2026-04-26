import { createPaywallLocaleText } from "./types";

const el = createPaywallLocaleText({
  valueStep: {
    nextButton: "Επόμενο",
    nextButtonAccessibilityLabel: "Συνέχεια στην επιλογή προγράμματος",
  },
  text: {
    annualPlanTitle: "Ετήσιο",
    benefitsTitle: "Προνόμια Pro",
    enterPromoCode: "Εισαγωγή κωδικού προσφοράς",
    freeBadge: "ΔΩΡΕΑΝ",
    lifetimePlanTitle: "Εφ' όρου ζωής",
    manageSubscription: "Διαχείριση συνδρομής",
    monthlyPlanTitle: "Μηνιαίο",
    oneTime: "Εφάπαξ",
    oneTimePayment: "Εφάπαξ πληρωμή",
    opening: "Άνοιγμα...",
    openingPaywall: "Άνοιγμα paywall...",
    privacyText: "Απόρρητο",
    purchaseButton: "Έναρξη δοκιμής",
    purchasingButton: "Επεξεργασία",
    restoreButton: "Επαναφορά αγορών",
    restoring: "Επαναφορά...",
    subscriptionRenewsAutomatically: "Η συνδρομή ανανεώνεται αυτόματα.",
    subscribedSubtitle: "Ευχαριστούμε για την υποστήριξη!",
    termsText: "Όροι",
    monthlyPricePrefix: "ανά μήνα ",
    renewsOnPrefix: "Ανανεώνεται στις ",
    savePrefix: "Εξοικονομήστε ",
    upgradePrefix: "Αναβάθμιση σε ",
  },
});

export default el;
