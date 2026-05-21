import { createOnboardingLocaleText } from "./types";

const mn = createOnboardingLocaleText({
  text: {
    continueButton: "Үргэлжлүүлэх",
    doneButton: "Дууссан",
    tapToContinueButton: "Үргэлжлүүлэхийн тулд товшино уу",
    landingTitle: "Post Black Belt-д\nтавтай морил!",
    loginLabel: "Нэвтрэх",
    loginPrompt: "Бүртгэлтэй юу? ",
    mockTitle: "Олон зуун техникийг\nцээжлэх хэрэггүй.",
    notificationNowLabel: "Одоо",
    notNowButton: "Одоо биш",
    returnButton: "Одоо биш",
    startButton: "Эхлэх",
  },
  permissionPrompt: { allowButton: "Зөвшөөрөх", denyButton: "Зөвшөөрөхгүй" },
  nicknameInput: { title: "Бид таныг юу гэж дуудах вэ?", inputPlaceholder: "Таны хоч", inputAccessibilityLabel: "Хоч", welcomeTitle: "Тавтай морил, {nickname}!" },
});

export default mn;
