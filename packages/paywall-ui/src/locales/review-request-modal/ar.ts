import type { ReviewRequestModalLocaleText } from "./types";

const ar = {
    title: (name) => `مرحبًا، أنا ${name}، مطوّر التطبيق 👋`,
    message:
      "إذا كان التطبيق مفيدًا لك، فتقييم سريع يساعد كثيرًا. وإذا كان هناك ما لا يعمل كما ينبغي، أرسل ملاحظاتك بدلًا من ذلك.",
    satisfiedButton: "قيّم التطبيق",
    feedbackButton: "إرسال ملاحظات",
    laterButton: "لاحقًا",
    profileImageAccessibilityLabel: "صورة ملف المطوّر",
  } satisfies ReviewRequestModalLocaleText;

export default ar;
