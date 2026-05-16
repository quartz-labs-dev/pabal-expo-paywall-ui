import type { ReviewRequestModalLocaleText } from "./types";

const ca = {
    title: (name) => `Hola, soc ${name}, el desenvolupador de l'app 👋`,
    message:
      "Si l'app t'ha estat útil, una valoració ràpida ajuda molt. Si alguna cosa no va bé, envia'm comentaris.",
    satisfiedButton: "Valora l'app",
    feedbackButton: "Envia comentaris",
    laterButton: "Més tard",
    profileImageAccessibilityLabel: "Foto de perfil del desenvolupador",
  } satisfies ReviewRequestModalLocaleText;

export default ca;
