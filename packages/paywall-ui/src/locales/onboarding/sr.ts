import { createOnboardingLocaleText } from "./types";

const sr = createOnboardingLocaleText({
  text: {
    continueButton: "Настави",
    doneButton: "Готово",
    tapToContinueButton: "Додирните за наставак",
    landingTitle: "Добродошли у\nPost Black Belt!",
    loginLabel: "Пријави се",
    loginPrompt: "Већ имате налог? ",
    mockTitle: "Не памтите\nстотине техника.",
    notificationNowLabel: "Сада",
    notNowButton: "Не сада",
    returnButton: "Не сада",
    startButton: "Почни",
  },
  permissionPrompt: { allowButton: "Дозволи", denyButton: "Не дозволи" },
  nicknameInput: { title: "Kako da vas zovemo?", inputPlaceholder: "Vas nadimak", inputAccessibilityLabel: "Nadimak", welcomeTitle: "Dobro dosli, {nickname}!" },
});

export default sr;
