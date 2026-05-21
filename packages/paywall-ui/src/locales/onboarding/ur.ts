import { createOnboardingLocaleText } from "./types";

const ur = createOnboardingLocaleText({
  text: {
    continueButton: "جاری رکھیں",
    doneButton: "مکمل",
    tapToContinueButton: "جاری رکھنے کے لیے ٹیپ کریں",
    landingTitle: "Post Black Belt میں\nخوش آمدید!",
    loginLabel: "لاگ ان",
    loginPrompt: "کیا پہلے سے اکاؤنٹ ہے؟ ",
    mockTitle: "سینکڑوں تکنیکیں\nیاد نہ کریں۔",
    notificationNowLabel: "ابھی",
    notNowButton: "ابھی نہیں",
    returnButton: "ابھی نہیں",
    startButton: "شروع کریں",
  },
  permissionPrompt: { allowButton: "اجازت دیں", denyButton: "اجازت نہ دیں" },
  nicknameInput: { title: "ہم آپ کو کیا کہہ کر بلائیں؟", inputPlaceholder: "آپ کا عرفی نام", inputAccessibilityLabel: "عرفی نام", welcomeTitle: "خوش آمدید، {nickname}!" },
});

export default ur;
