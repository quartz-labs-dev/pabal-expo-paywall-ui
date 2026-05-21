import { createOnboardingLocaleText } from "./types";

const zu = createOnboardingLocaleText({
  text: {
    continueButton: "Qhubeka",
    doneButton: "Qedile",
    tapToContinueButton: "Thepha ukuze uqhubeke",
    landingTitle: "Siyakwamukela ku\nPost Black Belt!",
    loginLabel: "Ngena",
    loginPrompt: "Usunayo i-akhawunti? ",
    mockTitle: "Ungazami ukukhumbula\namasu amaningi kakhulu.",
    notificationNowLabel: "Manje",
    notNowButton: "Hhayi manje",
    returnButton: "Hhayi manje",
    startButton: "Qala",
  },
  permissionPrompt: { allowButton: "Vumela", denyButton: "Ungavumeli" },
  nicknameInput: { title: "Sikubize ngani?", inputPlaceholder: "Isiteketiso sakho", inputAccessibilityLabel: "Isiteketiso", welcomeTitle: "Siyakwamukela, {nickname}!" },
});

export default zu;
