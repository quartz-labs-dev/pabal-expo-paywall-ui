import type { ReviewRequestModalLocaleText } from "./types";

const fa = {
    title: (name) => `سلام، من ${name} هستم، توسعه‌دهندهٔ برنامه 👋`,
    message:
      "اگر برنامه برایتان مفید بوده، یک امتیاز سریع خیلی کمک می‌کند. اگر چیزی درست نیست، لطفاً بازخورد بفرستید.",
    satisfiedButton: "امتیاز دادن به برنامه",
    feedbackButton: "ارسال بازخورد",
    laterButton: "بعداً",
    profileImageAccessibilityLabel: "عکس نمایهٔ توسعه‌دهنده",
  } satisfies ReviewRequestModalLocaleText;

export default fa;
