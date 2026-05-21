import { createOnboardingLocaleText } from "./types";

const he = createOnboardingLocaleText({
  text: {
    continueButton: "המשך",
    doneButton: "סיום",
    tapToContinueButton: "הקש כדי להמשיך",
    landingTitle: "ברוכים הבאים אל\nPost Black Belt!",
    loginLabel: "כניסה",
    loginPrompt: "כבר יש לך חשבון? ",
    mockTitle: "אל תשנן\nמאות טכניקות.",
    notificationNowLabel: "עכשיו",
    notNowButton: "לא עכשיו",
    returnButton: "לא עכשיו",
    startButton: "התחל",
  },
  permissionPrompt: { allowButton: "אפשר", denyButton: "אל תאפשר" },
  nicknameInput: { title: "איך לקרוא לך?", inputPlaceholder: "הכינוי שלך", inputAccessibilityLabel: "כינוי", welcomeTitle: "ברוך/ה הבא/ה, {nickname}!" },
});

export default he;
