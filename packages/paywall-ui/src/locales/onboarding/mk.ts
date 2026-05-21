import { createOnboardingLocaleText } from "./types";

const mk = createOnboardingLocaleText({
  text: {
    continueButton: "Продолжи",
    doneButton: "Готово",
    tapToContinueButton: "Допрете за да продолжите",
    landingTitle: "Добредојдовте во\nPost Black Belt!",
    loginLabel: "Најава",
    loginPrompt: "Веќе имате сметка? ",
    mockTitle: "Не меморирајте\nстотици техники.",
    notificationNowLabel: "Сега",
    notNowButton: "Не сега",
    returnButton: "Не сега",
    startButton: "Започни",
  },
  permissionPrompt: { allowButton: "Дозволи", denyButton: "Не дозволувај" },
  nicknameInput: { title: "Како да ви се обраќаме?", inputPlaceholder: "Вашиот прекар", inputAccessibilityLabel: "Прекар", welcomeTitle: "Добредојдовте, {nickname}!" },
});

export default mk;
