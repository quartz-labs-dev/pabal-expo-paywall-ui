import { createOnboardingLocaleText } from "./types";

const sv = createOnboardingLocaleText({
  text: {
    continueButton: "Fortsätt",
    doneButton: "Klar",
    tapToContinueButton: "Tryck för att fortsätta",
    landingTitle: "Välkommen till\nPost Black Belt!",
    loginLabel: "Logga in",
    loginPrompt: "Har du redan ett konto? ",
    mockTitle: "Memorera inte\nhundratals tekniker.",
    notificationNowLabel: "Nu",
    notNowButton: "Inte nu",
    returnButton: "Inte nu",
    startButton: "Kom igång",
  },
  permissionPrompt: { allowButton: "Tillåt", denyButton: "Tillåt inte" },
  nicknameInput: { title: "Vad ska vi kalla dig?", inputPlaceholder: "Ditt smeknamn", inputAccessibilityLabel: "Smeknamn", welcomeTitle: "Välkommen, {nickname}!" },
});

export default sv;
