import type { ReviewRequestModalLocaleText } from "./types";

const da = {
    title: (name) => `Hej, jeg er ${name}, udvikleren af appen 👋`,
    message:
      "Hvis appen har været nyttig, hjælper en hurtig bedømmelse meget. Hvis noget føles forkert, så send feedback i stedet.",
    satisfiedButton: "Bedøm appen",
    feedbackButton: "Send feedback",
    laterButton: "Senere",
    profileImageAccessibilityLabel: "Udviklerens profilbillede",
  } satisfies ReviewRequestModalLocaleText;

export default da;
