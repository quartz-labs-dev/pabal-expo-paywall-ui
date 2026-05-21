import { createOnboardingLocaleText } from "./types";

const uk = createOnboardingLocaleText({
  text: {
    continueButton: "Продовжити",
    doneButton: "Готово",
    tapToContinueButton: "Торкніться, щоб продовжити",
    landingTitle: "Ласкаво просимо до\nPost Black Belt!",
    loginLabel: "Увійти",
    loginPrompt: "Уже маєте обліковий запис? ",
    mockTitle: "Не запам’ятовуйте\nсотні технік.",
    notificationNowLabel: "Зараз",
    notNowButton: "Не зараз",
    returnButton: "Не зараз",
    startButton: "Почати",
  },
  permissionPrompt: { allowButton: "Дозволити", denyButton: "Не дозволяти" },
  nicknameInput: { title: "Як нам до вас звертатися?", inputPlaceholder: "Ваш нікнейм", inputAccessibilityLabel: "Нікнейм", welcomeTitle: "Вітаємо, {nickname}!" },
});

export default uk;
