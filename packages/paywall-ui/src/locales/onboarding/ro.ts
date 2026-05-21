import { createOnboardingLocaleText } from "./types";

const ro = createOnboardingLocaleText({
  text: {
    continueButton: "Continuă",
    doneButton: "Gata",
    tapToContinueButton: "Atinge pentru a continua",
    landingTitle: "Bun venit la\nPost Black Belt!",
    loginLabel: "Autentificare",
    loginPrompt: "Ai deja un cont? ",
    mockTitle: "Nu memora\nsute de tehnici.",
    notificationNowLabel: "Acum",
    notNowButton: "Nu acum",
    returnButton: "Nu acum",
    startButton: "Începe",
  },
  permissionPrompt: { allowButton: "Permite", denyButton: "Nu permite" },
  nicknameInput: { title: "Cum ar trebui să-ți spunem?", inputPlaceholder: "Porecla ta", inputAccessibilityLabel: "Porecla", welcomeTitle: "Bun venit, {nickname}!" },
});

export default ro;
