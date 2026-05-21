import { createOnboardingLocaleText } from "./types";

const pt = createOnboardingLocaleText({
  text: {
    continueButton: "Continuar",
    doneButton: "Concluído",
    tapToContinueButton: "Toque para continuar",
    landingTitle: "Bem-vindo ao\nPost Black Belt!",
    loginLabel: "Entrar",
    loginPrompt: "Já tem uma conta? ",
    mockTitle: "Não memorize\ncentenas de técnicas.",
    notificationNowLabel: "Agora",
    notNowButton: "Agora não",
    returnButton: "Agora não",
    startButton: "Começar",
  },
  permissionPrompt: { allowButton: "Permitir", denyButton: "Não permitir" },
  nicknameInput: { title: "Como devemos chamar-te?", inputPlaceholder: "A tua alcunha", inputAccessibilityLabel: "Alcunha", welcomeTitle: "Boas-vindas, {nickname}!" },
});

export default pt;
