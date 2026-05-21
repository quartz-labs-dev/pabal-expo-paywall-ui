import { createOnboardingLocaleText } from "./types";

const ja = createOnboardingLocaleText({
  text: {
    continueButton: "続ける",
    doneButton: "完了",
    tapToContinueButton: "タップして続ける",
    landingTitle: "Post Black Beltへ\nようこそ！",
    loginLabel: "ログイン",
    loginPrompt: "すでにアカウントをお持ちですか？ ",
    mockTitle: "何百もの技を\nすべて覚えなくて大丈夫。",
    notificationNowLabel: "今",
    notNowButton: "今はしない",
    returnButton: "今はしない",
    startButton: "はじめる",
  },
  permissionPrompt: { allowButton: "許可", denyButton: "許可しない" },
  nicknameInput: { title: "なんとお呼びすればよいですか？", inputPlaceholder: "ニックネーム", inputAccessibilityLabel: "ニックネーム", welcomeTitle: "ようこそ、{nickname}さん!" },
});

export default ja;
