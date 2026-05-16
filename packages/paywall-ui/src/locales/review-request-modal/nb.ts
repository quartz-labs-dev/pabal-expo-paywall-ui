import type { ReviewRequestModalLocaleText } from "./types";

const nb = {
    title: (name) => `Hei, jeg er ${name}, utvikleren av appen 👋`,
    message:
      "Hvis appen har vært nyttig, hjelper en rask vurdering mye. Hvis noe ikke føles riktig, send heller tilbakemelding.",
    satisfiedButton: "Vurder appen",
    feedbackButton: "Send tilbakemelding",
    laterButton: "Senere",
    profileImageAccessibilityLabel: "Utviklerens profilbilde",
  } satisfies ReviewRequestModalLocaleText;

export default nb;
