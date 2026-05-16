import type { ReviewRequestModalLocaleText } from "./types";

const pl = {
    title: (name) => `Cześć, jestem ${name}, twórcą tej aplikacji 👋`,
    message:
      "Jeśli aplikacja była pomocna, szybka ocena bardzo pomaga. Jeśli coś jest nie tak, wyślij opinię.",
    satisfiedButton: "Oceń aplikację",
    feedbackButton: "Wyślij opinię",
    laterButton: "Później",
    profileImageAccessibilityLabel: "Zdjęcie profilowe twórcy",
  } satisfies ReviewRequestModalLocaleText;

export default pl;
