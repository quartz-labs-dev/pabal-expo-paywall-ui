import type { ReviewRequestModalLocaleText } from "./types";

const ru = {
    title: (name) => `Привет, я ${name}, разработчик приложения 👋`,
    message:
      "Если приложение оказалось полезным, быстрая оценка очень поможет. Если что-то не так, лучше отправьте отзыв.",
    satisfiedButton: "Оценить приложение",
    feedbackButton: "Отправить отзыв",
    laterButton: "Позже",
    profileImageAccessibilityLabel: "Фото профиля разработчика",
  } satisfies ReviewRequestModalLocaleText;

export default ru;
