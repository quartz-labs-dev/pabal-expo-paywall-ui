import type { ReviewRequestModalLocaleText } from "./types";

const sl = {
    title: (name) => `Živjo, sem ${name}, razvijalec aplikacije 👋`,
    message:
      "Če vam je aplikacija koristila, hitra ocena zelo pomaga. Če nekaj ni v redu, raje pošljite povratne informacije.",
    satisfiedButton: "Oceni aplikacijo",
    feedbackButton: "Pošlji povratne informacije",
    laterButton: "Pozneje",
    profileImageAccessibilityLabel: "Profilna fotografija razvijalca",
  } satisfies ReviewRequestModalLocaleText;

export default sl;
