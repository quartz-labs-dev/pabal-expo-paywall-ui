import type { ReviewRequestModalLocaleText } from "./types";

const he = {
    title: (name) => `היי, אני ${name}, מפתח האפליקציה 👋`,
    message:
      "אם האפליקציה הייתה שימושית, דירוג קצר עוזר מאוד. אם משהו לא מרגיש נכון, עדיף לשלוח משוב.",
    satisfiedButton: "דרג את האפליקציה",
    feedbackButton: "שליחת משוב",
    laterButton: "מאוחר יותר",
    profileImageAccessibilityLabel: "תמונת פרופיל של המפתח",
  } satisfies ReviewRequestModalLocaleText;

export default he;
