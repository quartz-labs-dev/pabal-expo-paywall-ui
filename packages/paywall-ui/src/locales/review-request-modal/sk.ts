import type { ReviewRequestModalLocaleText } from "./types";

const sk = {
    title: (name) => `Ahoj, som ${name}, vývojár aplikácie 👋`,
    message:
      "Ak vám aplikácia pomohla, rýchle hodnotenie veľmi pomôže. Ak niečo nie je v poriadku, pošlite radšej spätnú väzbu.",
    satisfiedButton: "Ohodnotiť aplikáciu",
    feedbackButton: "Poslať spätnú väzbu",
    laterButton: "Neskôr",
    profileImageAccessibilityLabel: "Profilová fotka vývojára",
  } satisfies ReviewRequestModalLocaleText;

export default sk;
