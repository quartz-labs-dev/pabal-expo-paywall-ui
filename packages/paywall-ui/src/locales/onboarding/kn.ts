import { createOnboardingLocaleText } from "./types";

const kn = createOnboardingLocaleText({
  text: {
    continueButton: "ಮುಂದುವರಿಸಿ",
    doneButton: "ಮುಗಿದಿದೆ",
    tapToContinueButton: "ಮುಂದುವರಿಸಲು ಟ್ಯಾಪ್ ಮಾಡಿ",
    landingTitle: "Post Black Belt ಗೆ\nಸ್ವಾಗತ!",
    loginLabel: "ಲಾಗ್ ಇನ್",
    loginPrompt: "ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ? ",
    mockTitle: "ನೂರಾರು ತಂತ್ರಗಳನ್ನು\nಕಂಠಪಾಠ ಮಾಡಬೇಡಿ.",
    notificationNowLabel: "ಈಗ",
    notNowButton: "ಈಗ ಬೇಡ",
    returnButton: "ಈಗ ಬೇಡ",
    startButton: "ಪ್ರಾರಂಭಿಸಿ",
  },
  permissionPrompt: { allowButton: "ಅನುಮತಿಸಿ", denyButton: "ಅನುಮತಿಸಬೇಡಿ" },
  nicknameInput: { title: "ನಿಮ್ಮನ್ನು ನಾವು ಏನೆಂದು ಕರೆಯಲಿ?", inputPlaceholder: "ನಿಮ್ಮ ಅಡ್ಡಹೆಸರು", inputAccessibilityLabel: "ಅಡ್ಡಹೆಸರು", welcomeTitle: "ಸ್ವಾಗತ, {nickname}!" },
});

export default kn;
