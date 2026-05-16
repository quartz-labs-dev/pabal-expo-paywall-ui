import type { ReviewRequestModalLocaleText } from "./types";

const eu = {
    title: (name) => `Kaixo, ${name} naiz, aplikazioaren garatzailea 👋`,
    message:
      "Aplikazioa erabilgarria izan bazaizu, balorazio azkar batek asko laguntzen du. Zerbait gaizki badago, bidali iritzia.",
    satisfiedButton: "Baloratu aplikazioa",
    feedbackButton: "Bidali iritzia",
    laterButton: "Geroago",
    profileImageAccessibilityLabel: "Garatzailearen profileko argazkia",
  } satisfies ReviewRequestModalLocaleText;

export default eu;
