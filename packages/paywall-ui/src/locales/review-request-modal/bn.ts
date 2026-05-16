import type { ReviewRequestModalLocaleText } from "./types";

const bn = {
    title: (name) => `হাই, আমি ${name}, অ্যাপটির ডেভেলপার 👋`,
    message:
      "অ্যাপটি কাজে লেগে থাকলে একটি দ্রুত রেটিং অনেক সাহায্য করে। কিছু ঠিক না লাগলে বরং মতামত পাঠান।",
    satisfiedButton: "অ্যাপটি রেট করুন",
    feedbackButton: "মতামত পাঠান",
    laterButton: "পরে",
    profileImageAccessibilityLabel: "ডেভেলপারের প্রোফাইল ছবি",
  } satisfies ReviewRequestModalLocaleText;

export default bn;
