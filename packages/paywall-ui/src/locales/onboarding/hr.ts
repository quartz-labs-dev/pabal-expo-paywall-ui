import { createOnboardingLocaleText } from "./types";

const hr = createOnboardingLocaleText({
  text: {
    continueButton: "Nastavi",
    doneButton: "Gotovo",
    tapToContinueButton: "Dodirnite za nastavak",
    landingTitle: "Dobro došli u\nPost Black Belt!",
    loginLabel: "Prijava",
    loginPrompt: "Već imate račun? ",
    mockTitle: "Nemojte pamtiti\nstotine tehnika.",
    notificationNowLabel: "Sada",
    notNowButton: "Ne sada",
    returnButton: "Ne sada",
    startButton: "Započni",
  },
  permissionPrompt: { allowButton: "Dopusti", denyButton: "Nemoj dopustiti" },
  nicknameInput: { title: "Kako da vas zovemo?", inputPlaceholder: "Vas nadimak", inputAccessibilityLabel: "Nadimak", welcomeTitle: "Dobro dosli, {nickname}!" },
});

export default hr;
