import { createOnboardingLocaleText } from "./types";

const sk = createOnboardingLocaleText({
  text: {
    continueButton: "Pokračovať",
    doneButton: "Hotovo",
    tapToContinueButton: "Pokračujte ťuknutím",
    landingTitle: "Vitajte v\nPost Black Belt!",
    loginLabel: "Prihlásiť sa",
    loginPrompt: "Už máte účet? ",
    mockTitle: "Nememorujte si\nstovky techník.",
    notificationNowLabel: "Teraz",
    notNowButton: "Teraz nie",
    returnButton: "Teraz nie",
    startButton: "Začať",
  },
  permissionPrompt: { allowButton: "Povoliť", denyButton: "Nepovoliť" },
  nicknameInput: { title: "Ako vás máme volať?", inputPlaceholder: "Vas nickname", inputAccessibilityLabel: "Nickname", welcomeTitle: "Vitajte, {nickname}!" },
});

export default sk;
