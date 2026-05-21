import { createOnboardingLocaleText } from "./types";

const et = createOnboardingLocaleText({
  text: {
    continueButton: "Jätka",
    doneButton: "Valmis",
    tapToContinueButton: "Jätkamiseks puuduta",
    landingTitle: "Tere tulemast\nPost Black Belti!",
    loginLabel: "Logi sisse",
    loginPrompt: "Kas sul on juba konto? ",
    mockTitle: "Ära jäta pähe\nsadu tehnikaid.",
    notificationNowLabel: "Praegu",
    notNowButton: "Mitte praegu",
    returnButton: "Mitte praegu",
    startButton: "Alusta",
  },
  permissionPrompt: { allowButton: "Luba", denyButton: "Ära luba" },
  nicknameInput: { title: "Kuidas peaksime sind kutsuma?", inputPlaceholder: "Sinu hüüdnimi", inputAccessibilityLabel: "Hüüdnimi", welcomeTitle: "Tere tulemast, {nickname}!" },
});

export default et;
