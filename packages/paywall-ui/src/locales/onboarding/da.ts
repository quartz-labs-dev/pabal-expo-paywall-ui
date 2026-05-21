import { createOnboardingLocaleText } from "./types";

const da = createOnboardingLocaleText({
  text: {
    continueButton: "Fortsæt",
    doneButton: "Færdig",
    tapToContinueButton: "Tryk for at fortsætte",
    landingTitle: "Velkommen til\nPost Black Belt!",
    loginLabel: "Log ind",
    loginPrompt: "Har du allerede en konto? ",
    mockTitle: "Lad være med at huske\nhundredvis af teknikker.",
    notificationNowLabel: "Nu",
    notNowButton: "Ikke nu",
    returnButton: "Ikke nu",
    startButton: "Kom i gang",
  },
  permissionPrompt: { allowButton: "Tillad", denyButton: "Tillad ikke" },
  nicknameInput: { title: "Hvad skal vi kalde dig?", inputPlaceholder: "Dit kaldenavn", inputAccessibilityLabel: "Kaldenavn", welcomeTitle: "Velkommen, {nickname}!" },
});

export default da;
