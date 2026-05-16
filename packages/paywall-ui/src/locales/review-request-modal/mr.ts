import type { ReviewRequestModalLocaleText } from "./types";

const mr = {
    title: (name) => `हाय, मी ${name}, या अॅपचा डेव्हलपर 👋`,
    message:
      "अॅप उपयोगी वाटले असेल तर एक छोटी रेटिंग खूप मदत करते. काहीतरी बरोबर वाटत नसेल तर अभिप्राय पाठवा.",
    satisfiedButton: "अॅपला रेट करा",
    feedbackButton: "अभिप्राय पाठवा",
    laterButton: "नंतर",
    profileImageAccessibilityLabel: "डेव्हलपरचा प्रोफाइल फोटो",
  } satisfies ReviewRequestModalLocaleText;

export default mr;
