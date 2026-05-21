import { createOnboardingLocaleText } from "./types";

const mr = createOnboardingLocaleText({
  text: {
    continueButton: "सुरू ठेवा",
    doneButton: "पूर्ण झाले",
    tapToContinueButton: "सुरू ठेवण्यासाठी टॅप करा",
    landingTitle: "Post Black Belt मध्ये\nस्वागत आहे!",
    loginLabel: "लॉग इन",
    loginPrompt: "आधीच खाते आहे का? ",
    mockTitle: "शेकडो तंत्रे\nपाठ करू नका.",
    notificationNowLabel: "आता",
    notNowButton: "आत्ता नाही",
    returnButton: "आत्ता नाही",
    startButton: "सुरू करा",
  },
  permissionPrompt: { allowButton: "परवानगी द्या", denyButton: "परवानगी देऊ नका" },
  nicknameInput: { title: "आम्ही तुम्हाला काय म्हणू?", inputPlaceholder: "तुमचे टोपणनाव", inputAccessibilityLabel: "टोपणनाव", welcomeTitle: "स्वागत आहे, {nickname}!" },
});

export default mr;
