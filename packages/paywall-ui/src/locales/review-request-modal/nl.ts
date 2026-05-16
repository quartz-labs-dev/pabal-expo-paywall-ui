import type { ReviewRequestModalLocaleText } from "./types";

const nl = {
    title: (name) => `Hoi, ik ben ${name}, de ontwikkelaar van de app 👋`,
    message:
      "Als de app nuttig was, helpt een snelle beoordeling enorm. Als iets niet goed voelt, stuur dan feedback.",
    satisfiedButton: "App beoordelen",
    feedbackButton: "Feedback sturen",
    laterButton: "Later",
    profileImageAccessibilityLabel: "Profielfoto van de ontwikkelaar",
  } satisfies ReviewRequestModalLocaleText;

export default nl;
