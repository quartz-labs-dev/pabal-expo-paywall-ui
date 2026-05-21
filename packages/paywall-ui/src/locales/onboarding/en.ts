import { createOnboardingLocaleText } from "./types";

const en = createOnboardingLocaleText({
  text: {
    continueButton: "Continue",
    doneButton: "Done",
    tapToContinueButton: "Tap to continue",
    landingTitle: "Welcome to\nPost Black Belt!",
    loginLabel: "Log in",
    loginPrompt: "Already have an account? ",
    mockTitle: "Do not memorize\nhundreds of techniques.",
    notificationNowLabel: "now",
    notNowButton: "Not now",
    returnButton: "Return",
    startButton: "Get started",
  },
  permissionPrompt: { allowButton: "Allow", denyButton: "Don't Allow" },
  nicknameInput: { title: "What should we call you?", inputPlaceholder: "Nickname", inputAccessibilityLabel: "Nickname", welcomeTitle: "Welcome, {nickname}!" },
});

export default en;
