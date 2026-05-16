import type { ReviewRequestModalLocaleText } from "./types";

const de = {
    title: (name) => `Hi, ich bin ${name}, der Entwickler der App 👋`,
    message:
      "Wenn dir die App geholfen hat, hilft eine kurze Bewertung sehr. Wenn etwas nicht passt, sende mir stattdessen Feedback.",
    satisfiedButton: "App bewerten",
    feedbackButton: "Feedback senden",
    laterButton: "Später",
    profileImageAccessibilityLabel: "Profilbild des Entwicklers",
  } satisfies ReviewRequestModalLocaleText;

export default de;
