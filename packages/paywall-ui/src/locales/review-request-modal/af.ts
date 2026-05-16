import type { ReviewRequestModalLocaleText } from "./types";

const af = {
    title: (name) => `Hallo, ek is ${name}, die ontwikkelaar van die app 👋`,
    message:
      "As die app nuttig was, help 'n vinnige gradering baie. As iets verkeerd voel, stuur eerder terugvoer.",
    satisfiedButton: "Gradeer die app",
    feedbackButton: "Stuur terugvoer",
    laterButton: "Later",
    profileImageAccessibilityLabel: "Ontwikkelaar se profielfoto",
  } satisfies ReviewRequestModalLocaleText;

export default af;
