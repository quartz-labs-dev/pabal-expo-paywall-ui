import type { ReviewRequestModalLocaleText } from "./types";

const et = {
    title: (name) => `Tere, mina olen ${name}, selle rakenduse arendaja 👋`,
    message:
      "Kui rakendus on olnud kasulik, aitab kiire hinnang palju. Kui midagi tundub valesti, saada parem tagasisidet.",
    satisfiedButton: "Hinda rakendust",
    feedbackButton: "Saada tagasisidet",
    laterButton: "Hiljem",
    profileImageAccessibilityLabel: "Arendaja profiilifoto",
  } satisfies ReviewRequestModalLocaleText;

export default et;
