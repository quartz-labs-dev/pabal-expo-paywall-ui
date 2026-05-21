import { createOnboardingLocaleText } from "./types";

const bg = createOnboardingLocaleText({
  text: {
    continueButton: "Продължи",
    doneButton: "Готово",
    tapToContinueButton: "Докоснете, за да продължите",
    landingTitle: "Добре дошли в\nPost Black Belt!",
    loginLabel: "Вход",
    loginPrompt: "Вече имате акаунт? ",
    mockTitle: "Не запаметявайте\nстотици техники.",
    notificationNowLabel: "Сега",
    notNowButton: "Не сега",
    returnButton: "Не сега",
    startButton: "Започни",
  },
  permissionPrompt: { allowButton: "Разреши", denyButton: "Не разрешавай" },
  nicknameInput: { title: "Как да се обръщаме към вас?", inputPlaceholder: "Вашият псевдоним", inputAccessibilityLabel: "Псевдоним", welcomeTitle: "Добре дошли, {nickname}!" },
});

export default bg;
