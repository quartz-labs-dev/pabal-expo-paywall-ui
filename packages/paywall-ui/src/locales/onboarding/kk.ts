import { createOnboardingLocaleText } from "./types";

const kk = createOnboardingLocaleText({
  text: {
    continueButton: "Жалғастыру",
    doneButton: "Дайын",
    tapToContinueButton: "Жалғастыру үшін түртіңіз",
    landingTitle: "Post Black Belt-ке\nқош келдіңіз!",
    loginLabel: "Кіру",
    loginPrompt: "Есебіңіз бар ма? ",
    mockTitle: "Жүздеген техниканы\nжаттамаңыз.",
    notificationNowLabel: "Қазір",
    notNowButton: "Қазір емес",
    returnButton: "Қазір емес",
    startButton: "Бастау",
  },
  permissionPrompt: { allowButton: "Рұқсат ету", denyButton: "Рұқсат етпеу" },
  nicknameInput: { title: "Сізді қалай атайық?", inputPlaceholder: "Лақап атыңыз", inputAccessibilityLabel: "Лақап ат", welcomeTitle: "Қош келдіңіз, {nickname}!" },
});

export default kk;
