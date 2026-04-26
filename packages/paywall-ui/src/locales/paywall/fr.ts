import { createPaywallLocaleText } from "./types";

const fr = createPaywallLocaleText({
  valueStep: {
    nextButton: "Suivant",
    nextButtonAccessibilityLabel: "Continuer vers le choix du forfait",
  },
  text: {
    annualPlanTitle: "Annuel",
    benefitsTitle: "Vos avantages Pro",
    enterPromoCode: "Saisir un code promo",
    freeBadge: "GRATUIT",
    lifetimePlanTitle: "À vie",
    manageSubscription: "Gérer l'abonnement",
    monthlyPlanTitle: "Mensuel",
    oneTime: "Paiement unique",
    oneTimePayment: "Paiement unique",
    opening: "Ouverture...",
    openingPaywall: "Ouverture du paywall...",
    privacyText: "Confidentialité",
    purchaseButton: "Démarrer l'essai",
    purchasingButton: "Traitement",
    restoreButton: "Restaurer les achats",
    restoring: "Restauration...",
    subscriptionRenewsAutomatically: "L'abonnement se renouvelle automatiquement.",
    subscribedSubtitle: "Merci pour votre soutien !",
    termsText: "Conditions",
    monthlyPricePrefix: "par mois ",
    renewsOnPrefix: "Renouvellement le ",
    savePrefix: "Économisez ",
    upgradePrefix: "Passer à ",
  },
});

export default fr;
