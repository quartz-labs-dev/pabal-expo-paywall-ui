import { createOnboardingLocaleText } from "./types";

const th = createOnboardingLocaleText({
  text: {
    continueButton: "ดำเนินการต่อ",
    doneButton: "เสร็จสิ้น",
    tapToContinueButton: "แตะเพื่อดำเนินการต่อ",
    landingTitle: "ยินดีต้อนรับสู่\nPost Black Belt!",
    loginLabel: "เข้าสู่ระบบ",
    loginPrompt: "มีบัญชีอยู่แล้วใช่ไหม? ",
    mockTitle: "อย่าท่องจำ\nเทคนิคหลายร้อยอย่าง",
    notificationNowLabel: "ตอนนี้",
    notNowButton: "ยังไม่ใช่ตอนนี้",
    returnButton: "ยังไม่ใช่ตอนนี้",
    startButton: "เริ่มต้น",
  },
  permissionPrompt: { allowButton: "อนุญาต", denyButton: "ไม่อนุญาต" },
  nicknameInput: { title: "เราควรเรียกคุณว่าอะไร?", inputPlaceholder: "ชื่อเล่นของคุณ", inputAccessibilityLabel: "ชื่อเล่น", welcomeTitle: "ยินดีต้อนรับ, {nickname}!" },
});

export default th;
