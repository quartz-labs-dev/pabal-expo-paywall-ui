import type { ReviewRequestModalLocaleText } from "./types";

const kk = {
    title: (name) => `Сәлем, мен ${name}, қолданбаның әзірлеушісімін 👋`,
    message:
      "Қолданба пайдалы болса, қысқа бағалау көп көмектеседі. Бірдеңе дұрыс болмаса, пікір жіберіңіз.",
    satisfiedButton: "Қолданбаны бағалау",
    feedbackButton: "Пікір жіберу",
    laterButton: "Кейін",
    profileImageAccessibilityLabel: "Әзірлеушінің профиль суреті",
  } satisfies ReviewRequestModalLocaleText;

export default kk;
