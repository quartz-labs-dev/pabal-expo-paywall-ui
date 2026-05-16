import type { ReviewRequestModalLocaleText } from "./types";

const ur = {
    title: (name) => `ہیلو، میں ${name} ہوں، اس ایپ کا ڈیولپر 👋`,
    message:
      "اگر ایپ آپ کے لیے مفید رہی ہے تو ایک مختصر ریٹنگ بہت مدد کرتی ہے۔ اگر کچھ ٹھیک نہیں لگتا تو فیڈبیک بھیجیں۔",
    satisfiedButton: "ایپ کو ریٹ کریں",
    feedbackButton: "فیڈبیک بھیجیں",
    laterButton: "بعد میں",
    profileImageAccessibilityLabel: "ڈیولپر کی پروفائل تصویر",
  } satisfies ReviewRequestModalLocaleText;

export default ur;
