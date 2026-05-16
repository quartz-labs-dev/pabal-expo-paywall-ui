import type { ReviewRequestModalLocaleText } from "./types";

const zhHans = {
    title: (name) => `你好，我是 ${name}，这款应用的开发者 👋`,
    message:
      "如果这个应用对你有帮助，一个简短评分会帮上大忙。如果哪里不太对，也欢迎直接反馈。",
    satisfiedButton: "给应用评分",
    feedbackButton: "发送反馈",
    laterButton: "稍后",
    profileImageAccessibilityLabel: "开发者头像",
  } satisfies ReviewRequestModalLocaleText;

export default zhHans;
