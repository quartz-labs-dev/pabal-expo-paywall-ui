import type { ReviewRequestModalLocaleText } from "./types";

const ml = {
    title: (name) => `ഹായ്, ഞാൻ ${name}, ഈ ആപ്പിന്റെ ഡെവലപ്പർ 👋`,
    message:
      "ആപ്പ് ഉപകാരപ്പെട്ടിട്ടുണ്ടെങ്കിൽ, ഒരു ചെറിയ റേറ്റിംഗ് വളരെ സഹായിക്കും. എന്തെങ്കിലും ശരിയല്ലെന്ന് തോന്നിയാൽ ഫീഡ്ബാക്ക് അയയ്ക്കൂ.",
    satisfiedButton: "ആപ്പ് റേറ്റ് ചെയ്യുക",
    feedbackButton: "ഫീഡ്ബാക്ക് അയയ്ക്കുക",
    laterButton: "പിന്നീട്",
    profileImageAccessibilityLabel: "ഡെവലപ്പറുടെ പ്രൊഫൈൽ ഫോട്ടോ",
  } satisfies ReviewRequestModalLocaleText;

export default ml;
