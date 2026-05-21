import { createOnboardingLocaleText } from "./types";

const id = createOnboardingLocaleText({
  text: {
    continueButton: "Lanjutkan",
    doneButton: "Selesai",
    tapToContinueButton: "Ketuk untuk melanjutkan",
    landingTitle: "Selamat datang di\nPost Black Belt!",
    loginLabel: "Masuk",
    loginPrompt: "Sudah punya akun? ",
    mockTitle: "Jangan menghafal\nratusan teknik.",
    notificationNowLabel: "Sekarang",
    notNowButton: "Tidak sekarang",
    returnButton: "Tidak sekarang",
    startButton: "Mulai",
  },
  permissionPrompt: { allowButton: "Izinkan", denyButton: "Jangan izinkan" },
  nicknameInput: { title: "Kami harus memanggilmu apa?", inputPlaceholder: "Nama panggilanmu", inputAccessibilityLabel: "Nama panggilan", welcomeTitle: "Selamat datang, {nickname}!" },
});

export default id;
