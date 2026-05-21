import { createOnboardingLocaleText } from "./types";

const af = createOnboardingLocaleText({
  text: {
    continueButton: "Gaan voort",
    doneButton: "Klaar",
    tapToContinueButton: "Tik om voort te gaan",
    landingTitle: "Welkom by\nPost Black Belt!",
    loginLabel: "Meld aan",
    loginPrompt: "Het jy reeds ’n rekening? ",
    mockTitle: "Moenie honderde tegnieke\nprobeer memoriseer nie.",
    notificationNowLabel: "Nou",
    notNowButton: "Nie nou nie",
    returnButton: "Nie nou nie",
    startButton: "Begin",
  },
  permissionPrompt: { allowButton: "Laat toe", denyButton: "Moenie toelaat nie" },
  nicknameInput: { title: "Hoe moet ons jou noem?", inputPlaceholder: "Jou bynaam", inputAccessibilityLabel: "Bynaam", welcomeTitle: "Welkom, {nickname}!" },
});

export default af;
