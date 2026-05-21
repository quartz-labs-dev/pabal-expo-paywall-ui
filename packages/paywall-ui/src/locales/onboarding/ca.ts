import { createOnboardingLocaleText } from "./types";

const ca = createOnboardingLocaleText({
  text: {
    continueButton: "Continua",
    doneButton: "Fet",
    tapToContinueButton: "Toca per continuar",
    landingTitle: "Benvingut a\nPost Black Belt!",
    loginLabel: "Inicia sessió",
    loginPrompt: "Ja tens un compte? ",
    mockTitle: "No memoritzis\ncentenars de tècniques.",
    notificationNowLabel: "Ara",
    notNowButton: "Ara no",
    returnButton: "Ara no",
    startButton: "Comença",
  },
  permissionPrompt: { allowButton: "Permet", denyButton: "No ho permetis" },
  nicknameInput: { title: "Com vols que et diguem?", inputPlaceholder: "El teu sobrenom", inputAccessibilityLabel: "Sobrenom", welcomeTitle: "Benvingut/da, {nickname}!" },
});

export default ca;
