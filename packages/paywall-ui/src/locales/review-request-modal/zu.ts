import type { ReviewRequestModalLocaleText } from "./types";

const zu = {
    title: (name) => `Sawubona, ngingu-${name}, umakhi wale app 👋`,
    message:
      "Uma le app ikusizile, isilinganiso esisheshayo sisiza kakhulu. Uma kukhona okungahambi kahle, thumela impendulo.",
    satisfiedButton: "Linganisela i-app",
    feedbackButton: "Thumela impendulo",
    laterButton: "Kamuva",
    profileImageAccessibilityLabel: "Isithombe sephrofayela somakhi",
  } satisfies ReviewRequestModalLocaleText;

export default zu;
