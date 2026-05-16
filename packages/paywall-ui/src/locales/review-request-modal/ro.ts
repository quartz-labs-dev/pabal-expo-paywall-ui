import type { ReviewRequestModalLocaleText } from "./types";

const ro = {
    title: (name) => `Salut, sunt ${name}, dezvoltatorul aplicației 👋`,
    message:
      "Dacă aplicația ți-a fost utilă, o evaluare rapidă ajută mult. Dacă ceva nu e în regulă, trimite feedback.",
    satisfiedButton: "Evaluează aplicația",
    feedbackButton: "Trimite feedback",
    laterButton: "Mai târziu",
    profileImageAccessibilityLabel: "Fotografia de profil a dezvoltatorului",
  } satisfies ReviewRequestModalLocaleText;

export default ro;
