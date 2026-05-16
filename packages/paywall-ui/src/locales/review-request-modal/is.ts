import type { ReviewRequestModalLocaleText } from "./types";

const is = {
    title: (name) => `Hæ, ég er ${name}, þróunaraðili appsins 👋`,
    message:
      "Ef appið hefur gagnast þér hjálpar stutt einkunn mikið. Ef eitthvað er ekki í lagi, sendu frekar endurgjöf.",
    satisfiedButton: "Gefa appinu einkunn",
    feedbackButton: "Senda endurgjöf",
    laterButton: "Seinna",
    profileImageAccessibilityLabel: "Prófílmynd þróunaraðila",
  } satisfies ReviewRequestModalLocaleText;

export default is;
