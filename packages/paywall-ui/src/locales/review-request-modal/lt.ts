import type { ReviewRequestModalLocaleText } from "./types";

const lt = {
    title: (name) => `Sveiki, aš ${name}, šios programėlės kūrėjas 👋`,
    message:
      "Jei programėlė buvo naudinga, trumpas įvertinimas labai padeda. Jei kažkas negerai, verčiau atsiųskite atsiliepimą.",
    satisfiedButton: "Įvertinti programėlę",
    feedbackButton: "Siųsti atsiliepimą",
    laterButton: "Vėliau",
    profileImageAccessibilityLabel: "Kūrėjo profilio nuotrauka",
  } satisfies ReviewRequestModalLocaleText;

export default lt;
