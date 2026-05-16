import type { ReviewRequestModalLocaleText } from "./types";

const fr = {
    title: (name) => `Bonjour, je suis ${name}, le développeur de l'app 👋`,
    message:
      "Si l'app vous a été utile, une note rapide aide beaucoup. Si quelque chose ne va pas, envoyez plutôt un retour.",
    satisfiedButton: "Noter l'app",
    feedbackButton: "Envoyer un retour",
    laterButton: "Plus tard",
    profileImageAccessibilityLabel: "Photo de profil du développeur",
  } satisfies ReviewRequestModalLocaleText;

export default fr;
