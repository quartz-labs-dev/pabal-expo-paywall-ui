import { createOnboardingLocaleText } from "./types";

const es = createOnboardingLocaleText({
  text: {
    continueButton: "Continuar",
    doneButton: "Listo",
    tapToContinueButton: "Toca para continuar",
    landingTitle: "¡Te damos la bienvenida a\nPost Black Belt!",
    loginLabel: "Iniciar sesión",
    loginPrompt: "¿Ya tienes una cuenta? ",
    mockTitle: "No memorices\ncientos de técnicas.",
    notificationNowLabel: "Ahora",
    notNowButton: "Ahora no",
    returnButton: "Ahora no",
    startButton: "Empezar",
  },
  permissionPrompt: { allowButton: "Permitir", denyButton: "No permitir" },
  nicknameInput: { title: "¿Cómo quieres que te llamemos?", inputPlaceholder: "Tu apodo", inputAccessibilityLabel: "Apodo", welcomeTitle: "Te damos la bienvenida, {nickname}!" },
});

export default es;
