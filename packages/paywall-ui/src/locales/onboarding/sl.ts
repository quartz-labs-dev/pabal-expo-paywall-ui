import { createOnboardingLocaleText } from "./types";

const sl = createOnboardingLocaleText({
  text: {
    continueButton: "Nadaljuj",
    doneButton: "Končano",
    tapToContinueButton: "Tapnite za nadaljevanje",
    landingTitle: "Dobrodošli v\nPost Black Belt!",
    loginLabel: "Prijava",
    loginPrompt: "Že imate račun? ",
    mockTitle: "Ne učite se na pamet\nstotin tehnik.",
    notificationNowLabel: "Zdaj",
    notNowButton: "Ne zdaj",
    returnButton: "Ne zdaj",
    startButton: "Začni",
  },
  permissionPrompt: { allowButton: "Dovoli", denyButton: "Ne dovoli" },
  nicknameInput: { title: "Kako naj vas kličemo?", inputPlaceholder: "Vas vzdevek", inputAccessibilityLabel: "Vzdevek", welcomeTitle: "Dobrodosli, {nickname}!" },
});

export default sl;
