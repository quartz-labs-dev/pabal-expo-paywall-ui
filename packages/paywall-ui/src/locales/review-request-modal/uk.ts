import type { ReviewRequestModalLocaleText } from "./types";

const uk = {
    title: (name) => `Привіт, я ${name}, розробник застосунку 👋`,
    message:
      "Якщо застосунок був корисним, швидка оцінка дуже допоможе. Якщо щось не так, надішліть відгук.",
    satisfiedButton: "Оцінити застосунок",
    feedbackButton: "Надіслати відгук",
    laterButton: "Пізніше",
    profileImageAccessibilityLabel: "Фото профілю розробника",
  } satisfies ReviewRequestModalLocaleText;

export default uk;
