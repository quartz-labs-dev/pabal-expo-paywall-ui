import { createOnboardingLocaleText } from "./types";

const is = createOnboardingLocaleText({
  text: {
    continueButton: "Halda áfram",
    doneButton: "Lokið",
    tapToContinueButton: "Pikkaðu til að halda áfram",
    landingTitle: "Velkomin(n) í\nPost Black Belt!",
    loginLabel: "Skrá inn",
    loginPrompt: "Ertu þegar með aðgang? ",
    mockTitle: "Ekki leggja á minnið\nhundruð tækniatriða.",
    notificationNowLabel: "Núna",
    notNowButton: "Ekki núna",
    returnButton: "Ekki núna",
    startButton: "Byrja",
  },
  permissionPrompt: { allowButton: "Leyfa", denyButton: "Ekki leyfa" },
  nicknameInput: { title: "Hvað eigum við að kalla þig?", inputPlaceholder: "Gælunafnið þitt", inputAccessibilityLabel: "Gælunafn", welcomeTitle: "Velkomin(n), {nickname}!" },
});

export default is;
