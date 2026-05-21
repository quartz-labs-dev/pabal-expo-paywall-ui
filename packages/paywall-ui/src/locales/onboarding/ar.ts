import { createOnboardingLocaleText } from "./types";

const ar = createOnboardingLocaleText({
  text: {
    continueButton: "متابعة",
    doneButton: "تم",
    tapToContinueButton: "اضغط للمتابعة",
    landingTitle: "مرحبًا بك في\nPost Black Belt!",
    loginLabel: "تسجيل الدخول",
    loginPrompt: "هل لديك حساب بالفعل؟ ",
    mockTitle: "لا تحفظ\nمئات التقنيات.",
    notificationNowLabel: "الآن",
    notNowButton: "ليس الآن",
    returnButton: "ليس الآن",
    startButton: "ابدأ",
  },
  permissionPrompt: { allowButton: "السماح", denyButton: "عدم السماح" },
  nicknameInput: { title: "ماذا ناديلك؟", inputPlaceholder: "اسمك المستعار", inputAccessibilityLabel: "الاسم المستعار", welcomeTitle: "مرحبًا، {nickname}!" },
});

export default ar;
