import { createOnboardingLocaleText } from "./types";

const fa = createOnboardingLocaleText({
  text: {
    continueButton: "ادامه",
    doneButton: "انجام شد",
    tapToContinueButton: "برای ادامه ضربه بزنید",
    landingTitle: "به\nPost Black Belt خوش آمدید!",
    loginLabel: "ورود",
    loginPrompt: "قبلاً حساب دارید؟ ",
    mockTitle: "صدها تکنیک را\nحفظ نکنید.",
    notificationNowLabel: "اکنون",
    notNowButton: "الان نه",
    returnButton: "الان نه",
    startButton: "شروع کنید",
  },
  permissionPrompt: { allowButton: "اجازه دادن", denyButton: "اجازه ندادن" },
  nicknameInput: { title: "شما را چه صدا کنیم؟", inputPlaceholder: "نام مستعار شما", inputAccessibilityLabel: "نام مستعار", welcomeTitle: "خوش آمدید، {nickname}!" },
});

export default fa;
