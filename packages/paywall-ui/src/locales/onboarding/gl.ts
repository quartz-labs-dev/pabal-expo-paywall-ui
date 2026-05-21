import { createOnboardingLocaleText } from "./types";

const gl = createOnboardingLocaleText({
  text: {
    continueButton: "Continuar",
    doneButton: "Feito",
    tapToContinueButton: "Toca para continuar",
    landingTitle: "Benvido/a a\nPost Black Belt!",
    loginLabel: "Iniciar sesión",
    loginPrompt: "Xa tes unha conta? ",
    mockTitle: "Non memorices\ncentos de técnicas.",
    notificationNowLabel: "Agora",
    notNowButton: "Agora non",
    returnButton: "Agora non",
    startButton: "Comezar",
  },
  permissionPrompt: { allowButton: "Permitir", denyButton: "Non permitir" },
  nicknameInput: { title: "Como queres que te chamemos?", inputPlaceholder: "O teu alcume", inputAccessibilityLabel: "Alcume", welcomeTitle: "Benvido/a, {nickname}!" },
});

export default gl;
