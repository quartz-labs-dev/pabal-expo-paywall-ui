import { createOnboardingLocaleText } from "./types";

const nb = createOnboardingLocaleText({
  text: {
    continueButton: "Fortsett",
    doneButton: "Ferdig",
    tapToContinueButton: "Trykk for å fortsette",
    landingTitle: "Velkommen til\nPost Black Belt!",
    loginLabel: "Logg inn",
    loginPrompt: "Har du allerede en konto? ",
    mockTitle: "Ikke memorer\nhundrevis av teknikker.",
    notificationNowLabel: "Nå",
    notNowButton: "Ikke nå",
    returnButton: "Ikke nå",
    startButton: "Kom i gang",
  },
  permissionPrompt: { allowButton: "Tillat", denyButton: "Ikke tillat" },
  nicknameInput: { title: "Hva skal vi kalle deg?", inputPlaceholder: "Kallenavnet ditt", inputAccessibilityLabel: "Kallenavn", welcomeTitle: "Velkommen, {nickname}!" },
});

export default nb;
