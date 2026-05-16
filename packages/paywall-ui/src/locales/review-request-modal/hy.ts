import type { ReviewRequestModalLocaleText } from "./types";

const hy = {
    title: (name) => `Ողջույն, ես ${name}-ն եմ՝ հավելվածի մշակողը 👋`,
    message:
      "Եթե հավելվածը օգտակար է եղել, արագ գնահատականը շատ կօգնի։ Եթե ինչ-որ բան ճիշտ չէ, ուղարկեք կարծիք։",
    satisfiedButton: "Գնահատել հավելվածը",
    feedbackButton: "Ուղարկել կարծիք",
    laterButton: "Ավելի ուշ",
    profileImageAccessibilityLabel: "Մշակողի պրոֆիլի լուսանկար",
  } satisfies ReviewRequestModalLocaleText;

export default hy;
