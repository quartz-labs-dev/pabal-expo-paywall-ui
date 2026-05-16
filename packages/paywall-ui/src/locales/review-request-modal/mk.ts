import type { ReviewRequestModalLocaleText } from "./types";

const mk = {
    title: (name) => `Здраво, јас сум ${name}, развивачот на апликацијата 👋`,
    message:
      "Ако апликацијата ви била корисна, брза оцена многу помага. Ако нешто не е како што треба, испратете повратна информација.",
    satisfiedButton: "Оцени ја апликацијата",
    feedbackButton: "Испрати повратна информација",
    laterButton: "Подоцна",
    profileImageAccessibilityLabel: "Профилна фотографија на развивачот",
  } satisfies ReviewRequestModalLocaleText;

export default mk;
