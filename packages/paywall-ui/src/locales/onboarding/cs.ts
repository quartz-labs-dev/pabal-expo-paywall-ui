import { createOnboardingLocaleText } from "./types";

const cs = createOnboardingLocaleText({
  text: {
    continueButton: "Pokračovat",
    doneButton: "Hotovo",
    tapToContinueButton: "Pokračujte klepnutím",
    landingTitle: "Vítejte v\nPost Black Belt!",
    loginLabel: "Přihlásit se",
    loginPrompt: "Už máte účet? ",
    mockTitle: "Nememorujte si\nstovky technik.",
    notificationNowLabel: "Teď",
    notNowButton: "Teď ne",
    returnButton: "Teď ne",
    startButton: "Začít",
  },
  permissionPrompt: { allowButton: "Povolit", denyButton: "Nepovolit" },
  nicknameInput: { title: "Jak vám máme říkat?", inputPlaceholder: "Vase prezdivka", inputAccessibilityLabel: "Prezdivka", welcomeTitle: "Vitejte, {nickname}!" },
});

export default cs;
