import { createOnboardingLocaleText } from "./types";

const hi = createOnboardingLocaleText({
  text: {
    continueButton: "जारी रखें",
    doneButton: "हो गया",
    tapToContinueButton: "जारी रखने के लिए टैप करें",
    landingTitle: "Post Black Belt में\nआपका स्वागत है!",
    loginLabel: "लॉग इन",
    loginPrompt: "क्या आपके पास पहले से खाता है? ",
    mockTitle: "सैकड़ों तकनीकों को\nयाद मत करें।",
    notificationNowLabel: "अभी",
    notNowButton: "अभी नहीं",
    returnButton: "अभी नहीं",
    startButton: "शुरू करें",
  },
  permissionPrompt: { allowButton: "अनुमति दें", denyButton: "अनुमति न दें" },
  nicknameInput: { title: "हम आपको क्या कहकर बुलाएँ?", inputPlaceholder: "आपका उपनाम", inputAccessibilityLabel: "उपनाम", welcomeTitle: "स्वागत है, {nickname}!" },
});

export default hi;
