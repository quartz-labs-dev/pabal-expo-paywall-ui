import { createOnboardingLocaleText } from "./types";

const zhHans = createOnboardingLocaleText({
  text: {
    continueButton: "继续",
    doneButton: "完成",
    tapToContinueButton: "轻点以继续",
    landingTitle: "欢迎来到\nPost Black Belt！",
    loginLabel: "登录",
    loginPrompt: "已经有账号？",
    mockTitle: "不用记住\n数百个技术。",
    notificationNowLabel: "现在",
    notNowButton: "暂不",
    returnButton: "暂不",
    startButton: "开始",
  },
  permissionPrompt: { allowButton: "允许", denyButton: "不允许" },
  nicknameInput: { title: "我们该怎么称呼你？", inputPlaceholder: "你的昵称", inputAccessibilityLabel: "昵称", welcomeTitle: "欢迎，{nickname}!" },
});

export default zhHans;
