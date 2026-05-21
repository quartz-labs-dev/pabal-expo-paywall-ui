import { createOnboardingLocaleText } from "./types";

const ptBr = createOnboardingLocaleText({
  text: {
    continueButton: "Continuar",
    doneButton: "Concluído",
    tapToContinueButton: "Toque para continuar",
    landingTitle: "Boas-vindas ao\nPost Black Belt!",
    loginLabel: "Entrar",
    loginPrompt: "Já tem uma conta? ",
    mockTitle: "Não memorize\ncentenas de técnicas.",
    notificationNowLabel: "Agora",
    notNowButton: "Agora não",
    returnButton: "Agora não",
    startButton: "Começar",
  },
  permissionPrompt: { allowButton: "Permitir", denyButton: "Não permitir" },
  nicknameInput: { title: "Como devemos chamar você?", inputPlaceholder: "Seu apelido", inputAccessibilityLabel: "Apelido", welcomeTitle: "Boas-vindas, {nickname}!" },
});

export default ptBr;
