import { createOnboardingLocaleText } from "./types";

const fr = createOnboardingLocaleText({
  text: {
    continueButton: "Continuer",
    doneButton: "Terminé",
    tapToContinueButton: "Touchez pour continuer",
    landingTitle: "Bienvenue sur\nPost Black Belt !",
    loginLabel: "Connexion",
    loginPrompt: "Vous avez déjà un compte ? ",
    mockTitle: "Ne mémorisez pas\ndes centaines de techniques.",
    notificationNowLabel: "Maintenant",
    notNowButton: "Pas maintenant",
    returnButton: "Pas maintenant",
    startButton: "Commencer",
  },
  permissionPrompt: { allowButton: "Autoriser", denyButton: "Ne pas autoriser" },
  nicknameInput: { title: "Comment devons-nous vous appeler ?", inputPlaceholder: "Votre surnom", inputAccessibilityLabel: "Surnom", welcomeTitle: "Bienvenue, {nickname}!" },
});

export default fr;
