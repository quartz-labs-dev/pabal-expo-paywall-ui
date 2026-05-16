import type { ReviewRequestModalLocaleText } from "./types";

const cs = {
    title: (name) => `Ahoj, jsem ${name}, vývojář aplikace 👋`,
    message:
      "Pokud vám aplikace pomohla, rychlé hodnocení hodně pomůže. Pokud něco nefunguje dobře, pošlete raději zpětnou vazbu.",
    satisfiedButton: "Ohodnotit aplikaci",
    feedbackButton: "Poslat zpětnou vazbu",
    laterButton: "Později",
    profileImageAccessibilityLabel: "Profilová fotka vývojáře",
  } satisfies ReviewRequestModalLocaleText;

export default cs;
