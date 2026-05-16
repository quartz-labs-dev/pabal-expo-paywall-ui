import type { ReviewRequestModalLocaleText } from "./types";

const fil = {
    title: (name) => `Hi, ako si ${name}, ang developer ng app 👋`,
    message:
      "Kung naging kapaki-pakinabang ang app, malaking tulong ang mabilis na rating. Kung may hindi tama, magpadala na lang ng feedback.",
    satisfiedButton: "I-rate ang app",
    feedbackButton: "Magpadala ng feedback",
    laterButton: "Mamaya",
    profileImageAccessibilityLabel: "Profile photo ng developer",
  } satisfies ReviewRequestModalLocaleText;

export default fil;
