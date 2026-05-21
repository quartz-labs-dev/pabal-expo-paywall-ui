import { createOnboardingLocaleText } from "./types";

const pl = createOnboardingLocaleText({
  text: {
    continueButton: "Kontynuuj",
    doneButton: "Gotowe",
    tapToContinueButton: "Stuknij, aby kontynuować",
    landingTitle: "Witamy w\nPost Black Belt!",
    loginLabel: "Zaloguj się",
    loginPrompt: "Masz już konto? ",
    mockTitle: "Nie zapamiętuj\nsetek technik.",
    notificationNowLabel: "Teraz",
    notNowButton: "Nie teraz",
    returnButton: "Nie teraz",
    startButton: "Rozpocznij",
  },
  permissionPrompt: { allowButton: "Pozwól", denyButton: "Nie pozwalaj" },
  nicknameInput: { title: "Jak mamy się do Ciebie zwracać?", inputPlaceholder: "Twój pseudonim", inputAccessibilityLabel: "Pseudonim", welcomeTitle: "Witamy, {nickname}!" },
});

export default pl;
