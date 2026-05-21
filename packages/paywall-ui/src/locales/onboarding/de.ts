import { createOnboardingLocaleText } from "./types";

const de = createOnboardingLocaleText({
  text: {
    continueButton: "Weiter",
    doneButton: "Fertig",
    tapToContinueButton: "Tippen zum Fortfahren",
    landingTitle: "Willkommen bei\nPost Black Belt!",
    loginLabel: "Einloggen",
    loginPrompt: "Hast du schon ein Konto? ",
    mockTitle: "Lerne nicht\nhunderte Techniken auswendig.",
    notificationNowLabel: "Jetzt",
    notNowButton: "Nicht jetzt",
    returnButton: "Nicht jetzt",
    startButton: "Starten",
  },
  permissionPrompt: { allowButton: "Erlauben", denyButton: "Nicht erlauben" },
  nicknameInput: { title: "Wie dürfen wir dich nennen?", inputPlaceholder: "Dein Spitzname", inputAccessibilityLabel: "Spitzname", welcomeTitle: "Willkommen, {nickname}!" },
});

export default de;
