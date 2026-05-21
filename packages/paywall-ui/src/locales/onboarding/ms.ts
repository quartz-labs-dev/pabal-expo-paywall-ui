import { createOnboardingLocaleText } from "./types";

const ms = createOnboardingLocaleText({
  text: {
    continueButton: "Teruskan",
    doneButton: "Selesai",
    tapToContinueButton: "Ketik untuk teruskan",
    landingTitle: "Selamat datang ke\nPost Black Belt!",
    loginLabel: "Log masuk",
    loginPrompt: "Sudah ada akaun? ",
    mockTitle: "Jangan hafal\nratusan teknik.",
    notificationNowLabel: "Sekarang",
    notNowButton: "Bukan sekarang",
    returnButton: "Bukan sekarang",
    startButton: "Mula",
  },
  permissionPrompt: { allowButton: "Benarkan", denyButton: "Jangan benarkan" },
  nicknameInput: { title: "Apa patut kami panggil anda?", inputPlaceholder: "Nama panggilan anda", inputAccessibilityLabel: "Nama panggilan", welcomeTitle: "Selamat datang, {nickname}!" },
});

export default ms;
