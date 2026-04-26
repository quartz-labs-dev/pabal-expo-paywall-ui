import { createPaywallLocaleText } from "./types";

const fi = createPaywallLocaleText({
  valueStep: {
    nextButton: "Seuraava",
    nextButtonAccessibilityLabel: "Jatka paketin valintaan",
  },
  text: {
    annualPlanTitle: "Vuosittain",
    benefitsTitle: "Pro-edut",
    enterPromoCode: "Syötä kampanjakoodi",
    freeBadge: "ILMAINEN",
    lifetimePlanTitle: "Elinikäinen",
    manageSubscription: "Hallitse tilausta",
    monthlyPlanTitle: "Kuukausittain",
    oneTime: "Kertamaksu",
    oneTimePayment: "Kertamaksu",
    opening: "Avataan...",
    openingPaywall: "Avataan maksumuuria...",
    privacyText: "Tietosuoja",
    purchaseButton: "Aloita kokeilu",
    purchasingButton: "Käsitellään",
    restoreButton: "Palauta ostot",
    restoring: "Palautetaan...",
    subscriptionRenewsAutomatically: "Tilaus uusiutuu automaattisesti.",
    subscribedSubtitle: "Kiitos tuestasi!",
    termsText: "Ehdot",
    monthlyPricePrefix: "kk ",
    renewsOnPrefix: "Uusiutuu ",
    savePrefix: "Säästä ",
    upgradePrefix: "Päivitä: ",
  },
});

export default fi;
