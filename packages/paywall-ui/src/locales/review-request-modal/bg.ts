import type { ReviewRequestModalLocaleText } from "./types";

const bg = {
    title: (name) => `Здравейте, аз съм ${name}, разработчикът на приложението 👋`,
    message:
      "Ако приложението ви е било полезно, една бърза оценка помага много. Ако нещо не е наред, изпратете обратна връзка.",
    satisfiedButton: "Оценете приложението",
    feedbackButton: "Изпратете обратна връзка",
    laterButton: "По-късно",
    profileImageAccessibilityLabel: "Профилна снимка на разработчика",
  } satisfies ReviewRequestModalLocaleText;

export default bg;
