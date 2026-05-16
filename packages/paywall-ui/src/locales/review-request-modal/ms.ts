import type { ReviewRequestModalLocaleText } from "./types";

const ms = {
    title: (name) => `Hai, saya ${name}, pembangun aplikasi ini 👋`,
    message:
      "Jika aplikasi ini berguna, penilaian ringkas sangat membantu. Jika ada yang kurang tepat, hantar maklum balas.",
    satisfiedButton: "Nilai aplikasi",
    feedbackButton: "Hantar maklum balas",
    laterButton: "Nanti",
    profileImageAccessibilityLabel: "Foto profil pembangun",
  } satisfies ReviewRequestModalLocaleText;

export default ms;
