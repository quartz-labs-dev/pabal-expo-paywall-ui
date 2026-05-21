import { createOnboardingLocaleText } from "./types";

const ne = createOnboardingLocaleText({
  text: {
    continueButton: "जारी राख्नुहोस्",
    doneButton: "सम्पन्न",
    tapToContinueButton: "जारी राख्न ट्याप गर्नुहोस्",
    landingTitle: "Post Black Belt मा\nस्वागत छ!",
    loginLabel: "लग इन",
    loginPrompt: "पहिले नै खाता छ? ",
    mockTitle: "सयौं प्रविधिहरू\nकण्ठ नगर्नुहोस्।",
    notificationNowLabel: "अहिले",
    notNowButton: "अहिले होइन",
    returnButton: "अहिले होइन",
    startButton: "सुरु गर्नुहोस्",
  },
  permissionPrompt: { allowButton: "अनुमति दिनुहोस्", denyButton: "अनुमति नदिनुहोस्" },
  nicknameInput: { title: "हामी तपाईंलाई के भनेर बोलाऊँ?", inputPlaceholder: "तपाईंको उपनाम", inputAccessibilityLabel: "उपनाम", welcomeTitle: "स्वागत छ, {nickname}!" },
});

export default ne;
