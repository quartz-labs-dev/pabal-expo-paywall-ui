import { createOnboardingLocaleText } from "./types";

const ta = createOnboardingLocaleText({
  text: {
    continueButton: "தொடரவும்",
    doneButton: "முடிந்தது",
    tapToContinueButton: "தொடர தட்டவும்",
    landingTitle: "Post Black Belt-க்கு\nவரவேற்கிறோம்!",
    loginLabel: "உள்நுழை",
    loginPrompt: "ஏற்கனவே கணக்கு உள்ளதா? ",
    mockTitle: "நூற்றுக்கணக்கான நுட்பங்களை\nமனப்பாடம் செய்ய வேண்டாம்.",
    notificationNowLabel: "இப்போது",
    notNowButton: "இப்போது வேண்டாம்",
    returnButton: "இப்போது வேண்டாம்",
    startButton: "தொடங்கு",
  },
  permissionPrompt: { allowButton: "அனுமதி", denyButton: "அனுமதிக்க வேண்டாம்" },
  nicknameInput: { title: "உங்களை எப்படிப் அழைக்கலாம்?", inputPlaceholder: "உங்கள் புனைப்பெயர்", inputAccessibilityLabel: "புனைப்பெயர்", welcomeTitle: "வரவேற்கிறோம், {nickname}!" },
});

export default ta;
