import { createOnboardingLocaleText } from "./types";

const rm = createOnboardingLocaleText({
  text: {
    continueButton: "Cuntinuar",
    doneButton: "Finì",
    tapToContinueButton: "Tutgar per cuntinuar",
    landingTitle: "Bainvegni tar\nPost Black Belt!",
    loginLabel: "S’annunziar",
    loginPrompt: "Has gia in conto? ",
    mockTitle: "Betg emprender ordadora\ntschients tecnicas.",
    notificationNowLabel: "Ussa",
    notNowButton: "Betg ussa",
    returnButton: "Betg ussa",
    startButton: "Cumenzar",
  },
  permissionPrompt: { allowButton: "Permetter", denyButton: "Betg permetter" },
  nicknameInput: { title: "Co duain nus clamar tai?", inputPlaceholder: "Tes surnum", inputAccessibilityLabel: "Surnum", welcomeTitle: "Bainvegni, {nickname}!" },
});

export default rm;
