import type { ReviewRequestModalLocaleText } from "./types";

const zhHant = {
    title: (name) => `你好，我是 ${name}，這款 App 的開發者 👋`,
    message:
      "如果這款 App 對你有幫助，一個簡短評分會很有幫助。如果哪裡不太對，也歡迎直接回饋。",
    satisfiedButton: "為 App 評分",
    feedbackButton: "傳送回饋",
    laterButton: "稍後",
    profileImageAccessibilityLabel: "開發者頭像",
  } satisfies ReviewRequestModalLocaleText;

export default zhHant;
