import { createOnboardingLocaleText } from "./types";

const nl = createOnboardingLocaleText({
  text: {
    continueButton: "Doorgaan",
    doneButton: "Gereed",
    tapToContinueButton: "Tik om door te gaan",
    landingTitle: "Welkom bij\nPost Black Belt!",
    loginLabel: "Inloggen",
    loginPrompt: "Heb je al een account? ",
    mockTitle: "Leer geen\nhonderden technieken uit je hoofd.",
    notificationNowLabel: "Nu",
    notNowButton: "Niet nu",
    returnButton: "Niet nu",
    startButton: "Aan de slag",
  },
  permissionPrompt: { allowButton: "Sta toe", denyButton: "Sta niet toe" },
  nicknameInput: { title: "Hoe mogen we je noemen?", inputPlaceholder: "Je bijnaam", inputAccessibilityLabel: "Bijnaam", welcomeTitle: "Welkom, {nickname}!" },
});

export default nl;
