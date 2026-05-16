import type { ReviewRequestModalLocaleText } from "./types";

const sr = {
    title: (name) => `Здраво, ја сам ${name}, програмер апликације 👋`,
    message:
      "Ако вам је апликација била корисна, брза оцена много помаже. Ако нешто није у реду, пошаљите повратне информације.",
    satisfiedButton: "Оцените апликацију",
    feedbackButton: "Пошаљи повратне информације",
    laterButton: "Касније",
    profileImageAccessibilityLabel: "Профилна фотографија програмера",
  } satisfies ReviewRequestModalLocaleText;

export default sr;
