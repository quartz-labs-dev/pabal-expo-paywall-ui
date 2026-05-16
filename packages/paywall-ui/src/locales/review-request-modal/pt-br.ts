import type { ReviewRequestModalLocaleText } from "./types";

const ptBr = {
    title: (name) => `Oi, eu sou ${name}, o desenvolvedor do app 👋`,
    message:
      "Se o app foi útil, uma avaliação rápida ajuda muito. Se algo não estiver legal, envie um feedback.",
    satisfiedButton: "Avaliar o app",
    feedbackButton: "Enviar feedback",
    laterButton: "Depois",
    profileImageAccessibilityLabel: "Foto de perfil do desenvolvedor",
  } satisfies ReviewRequestModalLocaleText;

export default ptBr;
