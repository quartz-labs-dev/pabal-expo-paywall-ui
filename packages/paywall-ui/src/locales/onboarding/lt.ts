import { createOnboardingLocaleText } from "./types";

const lt = createOnboardingLocaleText({
  text: {
    continueButton: "Tęsti",
    doneButton: "Atlikta",
    tapToContinueButton: "Palieskite, kad tęstumėte",
    landingTitle: "Sveiki atvykę į\nPost Black Belt!",
    loginLabel: "Prisijungti",
    loginPrompt: "Jau turite paskyrą? ",
    mockTitle: "Neįsiminkite\nšimtų technikų.",
    notificationNowLabel: "Dabar",
    notNowButton: "Ne dabar",
    returnButton: "Ne dabar",
    startButton: "Pradėti",
  },
  permissionPrompt: { allowButton: "Leisti", denyButton: "Neleisti" },
  nicknameInput: { title: "Kaip turėtume į jus kreiptis?", inputPlaceholder: "Jusu slapyvardis", inputAccessibilityLabel: "Slapyvardis", welcomeTitle: "Sveiki, {nickname}!" },
});

export default lt;
