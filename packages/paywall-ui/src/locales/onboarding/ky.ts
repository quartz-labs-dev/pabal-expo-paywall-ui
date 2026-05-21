import { createOnboardingLocaleText } from "./types";

const ky = createOnboardingLocaleText({
  text: {
    continueButton: "Улантуу",
    doneButton: "Бүттү",
    tapToContinueButton: "Улантуу үчүн таптаңыз",
    landingTitle: "Post Black Beltке\nкош келиңиз!",
    loginLabel: "Кирүү",
    loginPrompt: "Аккаунтуңуз барбы? ",
    mockTitle: "Жүздөгөн ыкмаларды\nжаттабаңыз.",
    notificationNowLabel: "Азыр",
    notNowButton: "Азыр эмес",
    returnButton: "Азыр эмес",
    startButton: "Баштоо",
  },
  permissionPrompt: { allowButton: "Уруксат берүү", denyButton: "Уруксат бербөө" },
  nicknameInput: { title: "Сизди кандай атайлы?", inputPlaceholder: "Лакап атыңыз", inputAccessibilityLabel: "Лакап ат", welcomeTitle: "Кош келиңиз, {nickname}!" },
});

export default ky;
