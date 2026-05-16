import type { ReviewRequestModalLocaleText } from "./types";

const ne = {
    title: (name) => `नमस्ते, म ${name} हुँ, यो एपको डेभलपर 👋`,
    message:
      "एप उपयोगी भएको छ भने छोटो रेटिङले धेरै मद्दत गर्छ। केही ठीक नलागे प्रतिक्रिया पठाउनुहोस्।",
    satisfiedButton: "एपलाई रेट गर्नुहोस्",
    feedbackButton: "प्रतिक्रिया पठाउनुहोस्",
    laterButton: "पछि",
    profileImageAccessibilityLabel: "डेभलपरको प्रोफाइल फोटो",
  } satisfies ReviewRequestModalLocaleText;

export default ne;
