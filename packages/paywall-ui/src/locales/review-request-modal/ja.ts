import type { ReviewRequestModalLocaleText } from "./types";

const ja = {
    title: (name) => `こんにちは、アプリ開発者の${name}です 👋`,
    message:
      "アプリがお役に立っていたら、短い評価が大きな励みになります。気になる点があれば、フィードバックを送ってください。",
    satisfiedButton: "アプリを評価する",
    feedbackButton: "フィードバックを送る",
    laterButton: "あとで",
    profileImageAccessibilityLabel: "開発者のプロフィール写真",
  } satisfies ReviewRequestModalLocaleText;

export default ja;
