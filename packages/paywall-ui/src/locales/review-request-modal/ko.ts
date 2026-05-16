import type { ReviewRequestModalLocaleText } from "./types";

const ko = {
    title: (name) => `안녕하세요, 앱 개발자 ${name}입니다 👋`,
    message:
      "앱이 도움이 되었다면 짧은 평점이 큰 힘이 됩니다. 불편한 점이 있다면 대신 피드백을 보내주세요.",
    satisfiedButton: "앱 평가하기",
    feedbackButton: "피드백 보내기",
    laterButton: "나중에",
    profileImageAccessibilityLabel: "개발자 프로필 사진",
  } satisfies ReviewRequestModalLocaleText;

export default ko;
