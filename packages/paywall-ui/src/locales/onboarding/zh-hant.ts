import { createOnboardingLocaleText } from "./types";

const zhHant = createOnboardingLocaleText({
  text: {
    continueButton: "繼續",
    doneButton: "完成",
    tapToContinueButton: "點一下繼續",
    landingTitle: "歡迎來到\nPost Black Belt！",
    loginLabel: "登入",
    loginPrompt: "已經有帳號？",
    mockTitle: "不用記住\n數百個技術。",
    notificationNowLabel: "現在",
    notNowButton: "暫不",
    returnButton: "暫不",
    startButton: "開始",
  },
  permissionPrompt: { allowButton: "允許", denyButton: "不允許" },
  nicknameInput: { title: "我們該怎麼稱呼你？", inputPlaceholder: "你的暱稱", inputAccessibilityLabel: "暱稱", welcomeTitle: "歡迎，{nickname}!" },
});

export default zhHant;
