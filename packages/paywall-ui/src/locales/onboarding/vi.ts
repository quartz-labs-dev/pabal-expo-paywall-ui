import { createOnboardingLocaleText } from "./types";

const vi = createOnboardingLocaleText({
  text: {
    continueButton: "Tiếp tục",
    doneButton: "Xong",
    tapToContinueButton: "Chạm để tiếp tục",
    landingTitle: "Chào mừng đến với\nPost Black Belt!",
    loginLabel: "Đăng nhập",
    loginPrompt: "Bạn đã có tài khoản? ",
    mockTitle: "Đừng ghi nhớ\nhàng trăm kỹ thuật.",
    notificationNowLabel: "Bây giờ",
    notNowButton: "Không phải bây giờ",
    returnButton: "Không phải bây giờ",
    startButton: "Bắt đầu",
  },
  permissionPrompt: { allowButton: "Cho phép", denyButton: "Không cho phép" },
  nicknameInput: { title: "Chúng tôi nên gọi bạn là gì?", inputPlaceholder: "Biệt danh của bạn", inputAccessibilityLabel: "Biệt danh", welcomeTitle: "Chào mừng, {nickname}!" },
});

export default vi;
