import type { ReviewRequestModalLocaleText } from "./types";

const vi = {
    title: (name) => `Xin chào, tôi là ${name}, nhà phát triển ứng dụng 👋`,
    message:
      "Nếu ứng dụng hữu ích với bạn, một đánh giá nhanh sẽ giúp rất nhiều. Nếu có gì chưa ổn, hãy gửi phản hồi.",
    satisfiedButton: "Đánh giá ứng dụng",
    feedbackButton: "Gửi phản hồi",
    laterButton: "Để sau",
    profileImageAccessibilityLabel: "Ảnh hồ sơ của nhà phát triển",
  } satisfies ReviewRequestModalLocaleText;

export default vi;
