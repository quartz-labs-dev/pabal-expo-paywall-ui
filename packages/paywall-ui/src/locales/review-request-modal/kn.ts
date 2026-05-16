import type { ReviewRequestModalLocaleText } from "./types";

const kn = {
    title: (name) => `ಹಾಯ್, ನಾನು ${name}, ಈ ಆಪ್‌ನ ಡೆವಲಪರ್ 👋`,
    message:
      "ಆಪ್ ಉಪಯುಕ್ತವಾಗಿದ್ದರೆ, ಒಂದು ತ್ವರಿತ ರೇಟಿಂಗ್ ತುಂಬಾ ಸಹಾಯ ಮಾಡುತ್ತದೆ. ಏನಾದರೂ ಸರಿಯಾಗಿಲ್ಲವೆನಿಸಿದರೆ ಪ್ರತಿಕ್ರಿಯೆ ಕಳುಹಿಸಿ.",
    satisfiedButton: "ಆಪ್‌ಗೆ ರೇಟಿಂಗ್ ನೀಡಿ",
    feedbackButton: "ಪ್ರತಿಕ್ರಿಯೆ ಕಳುಹಿಸಿ",
    laterButton: "ನಂತರ",
    profileImageAccessibilityLabel: "ಡೆವಲಪರ್ ಪ್ರೊಫೈಲ್ ಫೋಟೋ",
  } satisfies ReviewRequestModalLocaleText;

export default kn;
