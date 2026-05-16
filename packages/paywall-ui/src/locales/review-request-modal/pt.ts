import type { ReviewRequestModalLocaleText } from "./types";

const pt = {
    title: (name) => `Olá, sou ${name}, o programador da app 👋`,
    message:
      "Se a app foi útil, uma avaliação rápida ajuda muito. Se algo não estiver bem, envie feedback.",
    satisfiedButton: "Avaliar a app",
    feedbackButton: "Enviar feedback",
    laterButton: "Mais tarde",
    profileImageAccessibilityLabel: "Foto de perfil do programador",
  } satisfies ReviewRequestModalLocaleText;

export default pt;
