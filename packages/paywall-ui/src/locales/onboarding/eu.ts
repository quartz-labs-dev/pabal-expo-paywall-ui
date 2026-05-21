import { createOnboardingLocaleText } from "./types";

const eu = createOnboardingLocaleText({
  text: {
    continueButton: "Jarraitu",
    doneButton: "Eginda",
    tapToContinueButton: "Ukitu jarraitzeko",
    landingTitle: "Ongi etorri\nPost Black Belt-era!",
    loginLabel: "Hasi saioa",
    loginPrompt: "Baduzu konturik? ",
    mockTitle: "Ez ikasi buruz\nehunka teknika.",
    notificationNowLabel: "Orain",
    notNowButton: "Orain ez",
    returnButton: "Orain ez",
    startButton: "Hasi",
  },
  permissionPrompt: { allowButton: "Baimendu", denyButton: "Ez baimendu" },
  nicknameInput: { title: "Nola deitzea nahi duzu?", inputPlaceholder: "Zure ezizena", inputAccessibilityLabel: "Ezizena", welcomeTitle: "Ongi etorri, {nickname}!" },
});

export default eu;
