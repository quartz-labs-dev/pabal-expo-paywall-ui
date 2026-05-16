import type { ReviewRequestModalLocaleText } from "./types";

const id = {
    title: (name) => `Hai, saya ${name}, pengembang aplikasi ini 👋`,
    message:
      "Jika aplikasi ini berguna, rating singkat sangat membantu. Jika ada yang kurang pas, kirim masukan saja.",
    satisfiedButton: "Beri rating aplikasi",
    feedbackButton: "Kirim masukan",
    laterButton: "Nanti",
    profileImageAccessibilityLabel: "Foto profil pengembang",
  } satisfies ReviewRequestModalLocaleText;

export default id;
