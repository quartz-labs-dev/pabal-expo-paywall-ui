import { createOnboardingLocaleText } from "./types";

const sq = createOnboardingLocaleText({
  text: {
    continueButton: "Vazhdo",
    doneButton: "U krye",
    tapToContinueButton: "Prek për të vazhduar",
    landingTitle: "Mirë se vini në\nPost Black Belt!",
    loginLabel: "Hyr",
    loginPrompt: "Keni tashmë një llogari? ",
    mockTitle: "Mos mësoni përmendësh\nqindra teknika.",
    notificationNowLabel: "Tani",
    notNowButton: "Jo tani",
    returnButton: "Jo tani",
    startButton: "Fillo",
  },
  permissionPrompt: { allowButton: "Lejo", denyButton: "Mos lejo" },
  nicknameInput: { title: "Si duhet t'ju thërrasim?", inputPlaceholder: "Nofka juaj", inputAccessibilityLabel: "Nofke", welcomeTitle: "Mire se vini, {nickname}!" },
});

export default sq;
