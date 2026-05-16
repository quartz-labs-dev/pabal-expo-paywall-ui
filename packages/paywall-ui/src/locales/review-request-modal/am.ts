import type { ReviewRequestModalLocaleText } from "./types";

const am = {
    title: (name) => `ሰላም፣ እኔ ${name} ነኝ፣ የመተግበሪያው አበልጻጊ 👋`,
    message:
      "መተግበሪያው ጠቃሚ ከሆነ ፈጣን ደረጃ መስጠት በጣም ይረዳል። አንድ ነገር ካልተስማማዎት እባክዎ አስተያየት ይላኩ።",
    satisfiedButton: "መተግበሪያውን ደረጃ ይስጡ",
    feedbackButton: "አስተያየት ይላኩ",
    laterButton: "በኋላ",
    profileImageAccessibilityLabel: "የአበልጻጊው ፕሮፋይል ፎቶ",
  } satisfies ReviewRequestModalLocaleText;

export default am;
