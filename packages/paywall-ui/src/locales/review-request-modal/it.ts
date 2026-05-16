import type { ReviewRequestModalLocaleText } from "./types";

const it = {
    title: (name) => `Ciao, sono ${name}, lo sviluppatore dell'app 👋`,
    message:
      "Se l'app ti è stata utile, una rapida valutazione aiuta molto. Se qualcosa non va, invia un feedback.",
    satisfiedButton: "Valuta l'app",
    feedbackButton: "Invia feedback",
    laterButton: "Più tardi",
    profileImageAccessibilityLabel: "Foto profilo dello sviluppatore",
  } satisfies ReviewRequestModalLocaleText;

export default it;
