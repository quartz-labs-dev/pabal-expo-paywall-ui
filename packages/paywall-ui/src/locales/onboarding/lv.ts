import { createOnboardingLocaleText } from "./types";

const lv = createOnboardingLocaleText({
  text: {
    continueButton: "Turpināt",
    doneButton: "Gatavs",
    tapToContinueButton: "Pieskarieties, lai turpinātu",
    landingTitle: "Laipni lūdzam\nPost Black Belt!",
    loginLabel: "Pieteikties",
    loginPrompt: "Jums jau ir konts? ",
    mockTitle: "Nemācieties no galvas\nsimtiem tehniku.",
    notificationNowLabel: "Tagad",
    notNowButton: "Ne tagad",
    returnButton: "Ne tagad",
    startButton: "Sākt",
  },
  permissionPrompt: { allowButton: "Atļaut", denyButton: "Neatļaut" },
  nicknameInput: { title: "Kā lai jūs uzrunājam?", inputPlaceholder: "Jusu segvards", inputAccessibilityLabel: "Segvards", welcomeTitle: "Laipni ludzam, {nickname}!" },
});

export default lv;
