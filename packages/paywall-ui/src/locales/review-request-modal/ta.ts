import type { ReviewRequestModalLocaleText } from "./types";

const ta = {
    title: (name) => `வணக்கம், நான் ${name}, இந்த ஆப்பின் டெவலப்பர் 👋`,
    message:
      "ஆப் உங்களுக்கு பயனுள்ளதாக இருந்தால், ஒரு விரைவான மதிப்பீடு மிகவும் உதவும். ஏதாவது சரியாக இல்லையெனில் கருத்தை அனுப்புங்கள்.",
    satisfiedButton: "ஆப்பை மதிப்பிடுங்கள்",
    feedbackButton: "கருத்தை அனுப்புங்கள்",
    laterButton: "பிறகு",
    profileImageAccessibilityLabel: "டெவலப்பரின் சுயவிவரப் படம்",
  } satisfies ReviewRequestModalLocaleText;

export default ta;
