import type { ReviewRequestModalLocaleText } from "./types";

const gu = {
    title: (name) => `હાય, હું ${name}, એપનો ડેવલપર છું 👋`,
    message:
      "એપ ઉપયોગી લાગી હોય તો ઝડપી રેટિંગ ખૂબ મદદરૂપ થાય છે. કંઈ ખોટું લાગે તો પ્રતિસાદ મોકલો.",
    satisfiedButton: "એપને રેટ કરો",
    feedbackButton: "પ્રતિસાદ મોકલો",
    laterButton: "પછી",
    profileImageAccessibilityLabel: "ડેવલપરનો પ્રોફાઇલ ફોટો",
  } satisfies ReviewRequestModalLocaleText;

export default gu;
