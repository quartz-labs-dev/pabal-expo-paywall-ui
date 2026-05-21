import { createOnboardingLocaleText } from "./types";

const te = createOnboardingLocaleText({
  text: {
    continueButton: "కొనసాగించు",
    doneButton: "పూర్తయింది",
    tapToContinueButton: "కొనసాగించడానికి ట్యాప్ చేయండి",
    landingTitle: "Post Black Belt కు\nస్వాగతం!",
    loginLabel: "లాగిన్",
    loginPrompt: "ఇప్పటికే ఖాతా ఉందా? ",
    mockTitle: "వందలాది టెక్నిక్‌లను\nకంఠస్థం చేయకండి.",
    notificationNowLabel: "ఇప్పుడు",
    notNowButton: "ఇప్పుడు కాదు",
    returnButton: "ఇప్పుడు కాదు",
    startButton: "ప్రారంభించండి",
  },
  permissionPrompt: { allowButton: "అనుమతించు", denyButton: "అనుమతించవద్దు" },
  nicknameInput: { title: "మేము మిమ్మల్ని ఏమని పిలవాలి?", inputPlaceholder: "మీ ముద్దుపేరు", inputAccessibilityLabel: "ముద్దుపేరు", welcomeTitle: "స్వాగతం, {nickname}!" },
});

export default te;
