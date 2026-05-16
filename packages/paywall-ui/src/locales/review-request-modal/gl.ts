import type { ReviewRequestModalLocaleText } from "./types";

const gl = {
    title: (name) => `Ola, son ${name}, o desenvolvedor da app 👋`,
    message:
      "Se a app che foi útil, unha valoración rápida axuda moito. Se algo non vai ben, envía comentarios.",
    satisfiedButton: "Valorar a app",
    feedbackButton: "Enviar comentarios",
    laterButton: "Máis tarde",
    profileImageAccessibilityLabel: "Foto de perfil do desenvolvedor",
  } satisfies ReviewRequestModalLocaleText;

export default gl;
