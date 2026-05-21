import { createOnboardingLocaleText } from "./types";

const fil = createOnboardingLocaleText({
  text: {
    continueButton: "Magpatuloy",
    doneButton: "Tapos",
    tapToContinueButton: "I-tap para magpatuloy",
    landingTitle: "Maligayang pagdating sa\nPost Black Belt!",
    loginLabel: "Mag-log in",
    loginPrompt: "May account ka na? ",
    mockTitle: "Huwag kabisaduhin\nang daan-daang teknik.",
    notificationNowLabel: "Ngayon",
    notNowButton: "Hindi ngayon",
    returnButton: "Hindi ngayon",
    startButton: "Magsimula",
  },
  permissionPrompt: { allowButton: "Payagan", denyButton: "Huwag payagan" },
  nicknameInput: { title: "Ano ang itatawag namin sa iyo?", inputPlaceholder: "Palayaw mo", inputAccessibilityLabel: "Palayaw", welcomeTitle: "Maligayang pagdating, {nickname}!" },
});

export default fil;
