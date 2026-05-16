import type { ReviewRequestModalLocaleText } from "./types";

const sv = {
    title: (name) => `Hej, jag är ${name}, utvecklaren av appen 👋`,
    message:
      "Om appen har varit användbar hjälper ett snabbt betyg mycket. Om något känns fel, skicka feedback istället.",
    satisfiedButton: "Betygsätt appen",
    feedbackButton: "Skicka feedback",
    laterButton: "Senare",
    profileImageAccessibilityLabel: "Utvecklarens profilbild",
  } satisfies ReviewRequestModalLocaleText;

export default sv;
