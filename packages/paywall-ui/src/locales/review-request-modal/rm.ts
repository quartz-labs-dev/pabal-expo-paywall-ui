import type { ReviewRequestModalLocaleText } from "./types";

const rm = {
    title: (name) => `Allegra, jau sun ${name}, il sviluppader da l'app 👋`,
    message:
      "Sche l'app è stada nizzaivla, gida ina curta valitaziun fitg. Sche insatge na va betg, trametta feedback.",
    satisfiedButton: "Valitar l'app",
    feedbackButton: "Trametter feedback",
    laterButton: "Pli tard",
    profileImageAccessibilityLabel: "Foto da profil dal sviluppader",
  } satisfies ReviewRequestModalLocaleText;

export default rm;
