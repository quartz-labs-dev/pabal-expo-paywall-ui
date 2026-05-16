import type { ReviewRequestModalLocaleText } from "./types";

const es = {
    title: (name) => `Hola, soy ${name}, el desarrollador de la app 👋`,
    message:
      "Si la app te ha sido útil, una valoración rápida ayuda mucho. Si algo no va bien, envía comentarios.",
    satisfiedButton: "Valorar la app",
    feedbackButton: "Enviar comentarios",
    laterButton: "Más tarde",
    profileImageAccessibilityLabel: "Foto de perfil del desarrollador",
  } satisfies ReviewRequestModalLocaleText;

export default es;
