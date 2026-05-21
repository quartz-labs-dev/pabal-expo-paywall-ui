import { createOnboardingLocaleText } from "./types";

const sw = createOnboardingLocaleText({
  text: {
    continueButton: "Endelea",
    doneButton: "Imekamilika",
    tapToContinueButton: "Gusa ili kuendelea",
    landingTitle: "Karibu kwenye\nPost Black Belt!",
    loginLabel: "Ingia",
    loginPrompt: "Tayari una akaunti? ",
    mockTitle: "Usikariri\nmbinu mamia.",
    notificationNowLabel: "Sasa",
    notNowButton: "Si sasa",
    returnButton: "Si sasa",
    startButton: "Anza",
  },
  permissionPrompt: { allowButton: "Ruhusu", denyButton: "Usiruhusu" },
  nicknameInput: { title: "Tukuiteje?", inputPlaceholder: "Jina lako la utani", inputAccessibilityLabel: "Jina la utani", welcomeTitle: "Karibu, {nickname}!" },
});

export default sw;
