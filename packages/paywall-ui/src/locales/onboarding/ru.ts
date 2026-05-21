import { createOnboardingLocaleText } from "./types";

const ru = createOnboardingLocaleText({
  text: {
    continueButton: "Продолжить",
    doneButton: "Готово",
    tapToContinueButton: "Нажмите, чтобы продолжить",
    landingTitle: "Добро пожаловать в\nPost Black Belt!",
    loginLabel: "Войти",
    loginPrompt: "Уже есть аккаунт? ",
    mockTitle: "Не заучивайте\nсотни техник.",
    notificationNowLabel: "Сейчас",
    notNowButton: "Не сейчас",
    returnButton: "Не сейчас",
    startButton: "Начать",
  },
  permissionPrompt: { allowButton: "Разрешить", denyButton: "Не разрешать" },
  nicknameInput: { title: "Как нам к вам обращаться?", inputPlaceholder: "Ваш никнейм", inputAccessibilityLabel: "Никнейм", welcomeTitle: "Добро пожаловать, {nickname}!" },
});

export default ru;
