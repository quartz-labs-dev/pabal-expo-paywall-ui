import { createOnboardingLocaleText } from "./types";

const si = createOnboardingLocaleText({
  text: {
    continueButton: "ඉදිරියට යන්න",
    doneButton: "නිමයි",
    tapToContinueButton: "ඉදිරියට යාමට තට්ටු කරන්න",
    landingTitle: "Post Black Belt වෙත\nසාදරයෙන් පිළිගනිමු!",
    loginLabel: "පුරනය වන්න",
    loginPrompt: "දැනටමත් ගිණුමක් තිබේද? ",
    mockTitle: "තාක්ෂණ සිය ගණනක්\nමතක තබා නොගන්න.",
    notificationNowLabel: "දැන්",
    notNowButton: "දැන් නොවේ",
    returnButton: "දැන් නොවේ",
    startButton: "ආරම්භ කරන්න",
  },
  permissionPrompt: { allowButton: "අවසර දෙන්න", denyButton: "අවසර නොදෙන්න" },
  nicknameInput: { title: "අපි ඔබව කෙසේ අමතමුද?", inputPlaceholder: "ඔබේ අන්වර්ථ නාමය", inputAccessibilityLabel: "අන්වර්ථ නාමය", welcomeTitle: "සාදරයෙන් පිළිගනිමු, {nickname}!" },
});

export default si;
