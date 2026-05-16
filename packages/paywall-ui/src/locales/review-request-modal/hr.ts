import type { ReviewRequestModalLocaleText } from "./types";

const hr = {
    title: (name) => `Bok, ja sam ${name}, razvojni programer aplikacije 👋`,
    message:
      "Ako vam je aplikacija bila korisna, brza ocjena puno pomaže. Ako nešto ne valja, pošaljite povratnu informaciju.",
    satisfiedButton: "Ocijeni aplikaciju",
    feedbackButton: "Pošalji povratne informacije",
    laterButton: "Kasnije",
    profileImageAccessibilityLabel: "Profilna fotografija razvojnog programera",
  } satisfies ReviewRequestModalLocaleText;

export default hr;
