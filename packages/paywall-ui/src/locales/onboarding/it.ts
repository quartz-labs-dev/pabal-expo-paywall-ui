import { createOnboardingLocaleText } from "./types";

const it = createOnboardingLocaleText({
  text: {
    continueButton: "Continua",
    doneButton: "Fatto",
    tapToContinueButton: "Tocca per continuare",
    landingTitle: "Benvenuto in\nPost Black Belt!",
    loginLabel: "Accedi",
    loginPrompt: "Hai già un account? ",
    mockTitle: "Non memorizzare\ncentinaia di tecniche.",
    notificationNowLabel: "Ora",
    notNowButton: "Non ora",
    returnButton: "Non ora",
    startButton: "Inizia",
  },
  permissionPrompt: { allowButton: "Consenti", denyButton: "Non consentire" },
  nicknameInput: { title: "Come dobbiamo chiamarti?", inputPlaceholder: "Il tuo nickname", inputAccessibilityLabel: "Nickname", welcomeTitle: "Benvenuto/a, {nickname}!" },
});

export default it;
