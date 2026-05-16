import type { ReviewRequestModalLocaleText } from "./types";

const sw = {
    title: (name) => `Habari, mimi ni ${name}, mtengenezaji wa app 👋`,
    message:
      "Ikiwa app imekusaidia, ukadiriaji wa haraka husaidia sana. Ikiwa kuna tatizo, tuma maoni badala yake.",
    satisfiedButton: "Kadiria app",
    feedbackButton: "Tuma maoni",
    laterButton: "Baadaye",
    profileImageAccessibilityLabel: "Picha ya wasifu ya mtengenezaji",
  } satisfies ReviewRequestModalLocaleText;

export default sw;
