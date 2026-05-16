import type { ReviewRequestModalLocaleText } from "./types";

const ky = {
    title: (name) => `Салам, мен ${name}, колдонмонун иштеп чыгуучусумун 👋`,
    message:
      "Колдонмо пайдалуу болсо, кыска баа көп жардам берет. Бир нерсе туура эмес болсо, пикир жөнөтүңүз.",
    satisfiedButton: "Колдонмону баалоо",
    feedbackButton: "Пикир жөнөтүү",
    laterButton: "Кийин",
    profileImageAccessibilityLabel: "Иштеп чыгуучунун профиль сүрөтү",
  } satisfies ReviewRequestModalLocaleText;

export default ky;
