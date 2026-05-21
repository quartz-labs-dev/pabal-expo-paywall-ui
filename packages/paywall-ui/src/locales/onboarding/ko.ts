import { createOnboardingLocaleText } from "./types";

const ko = createOnboardingLocaleText({
  text: {
    continueButton: "계속",
    doneButton: "완료",
    tapToContinueButton: "탭해서 계속",
    landingTitle: "Post Black Belt에\n오신 것을 환영합니다!",
    loginLabel: "로그인",
    loginPrompt: "이미 계정이 있나요? ",
    mockTitle: "수백 개의 기술을\n모두 외우지 마세요.",
    notificationNowLabel: "지금",
    notNowButton: "나중에",
    returnButton: "돌아가기",
    startButton: "시작하기",
  },
  permissionPrompt: { allowButton: "허용", denyButton: "허용 안 함" },
  nicknameInput: { title: "어떻게 불러드릴까요?", inputPlaceholder: "닉네임", inputAccessibilityLabel: "닉네임", welcomeTitle: "환영합니다 {nickname}님!" },
});

export default ko;
