import { createOnboardingLocaleText } from "./types";

const be = createOnboardingLocaleText({
  text: {
    continueButton: "Працягнуць",
    doneButton: "Гатова",
    tapToContinueButton: "Націсніце, каб працягнуць",
    landingTitle: "Вітаем у\nPost Black Belt!",
    loginLabel: "Увайсці",
    loginPrompt: "Ужо ёсць уліковы запіс? ",
    mockTitle: "Не завучвайце\nсотні тэхнік.",
    notificationNowLabel: "Цяпер",
    notNowButton: "Не цяпер",
    returnButton: "Не цяпер",
    startButton: "Пачаць",
  },
  permissionPrompt: { allowButton: "Дазволіць", denyButton: "Не дазваляць" },
  nicknameInput: { title: "Як да вас звяртацца?", inputPlaceholder: "Ваш нікнэйм", inputAccessibilityLabel: "Нікнэйм", welcomeTitle: "Вітаем, {nickname}!" },
});

export default be;
