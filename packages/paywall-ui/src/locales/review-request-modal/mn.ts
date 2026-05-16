import type { ReviewRequestModalLocaleText } from "./types";

const mn = {
    title: (name) => `Сайн байна уу, би ${name}, энэ аппын хөгжүүлэгч 👋`,
    message:
      "Апп хэрэг болсон бол богино үнэлгээ их тус болно. Ямар нэг зүйл тохирохгүй байвал санал хүсэлт илгээгээрэй.",
    satisfiedButton: "Аппыг үнэлэх",
    feedbackButton: "Санал хүсэлт илгээх",
    laterButton: "Дараа",
    profileImageAccessibilityLabel: "Хөгжүүлэгчийн профайл зураг",
  } satisfies ReviewRequestModalLocaleText;

export default mn;
