import { createOnboardingLocaleText } from "./types";

const fi = createOnboardingLocaleText({
  text: {
    continueButton: "Jatka",
    doneButton: "Valmis",
    tapToContinueButton: "Jatka napauttamalla",
    landingTitle: "Tervetuloa\nPost Black Beltiin!",
    loginLabel: "Kirjaudu sisään",
    loginPrompt: "Onko sinulla jo tili? ",
    mockTitle: "Älä opettele ulkoa\nsatoja tekniikoita.",
    notificationNowLabel: "Nyt",
    notNowButton: "Ei nyt",
    returnButton: "Ei nyt",
    startButton: "Aloita",
  },
  permissionPrompt: { allowButton: "Salli", denyButton: "Älä salli" },
  nicknameInput: { title: "Millä nimellä kutsumme sinua?", inputPlaceholder: "Lempinimesi", inputAccessibilityLabel: "Lempinimi", welcomeTitle: "Tervetuloa, {nickname}!" },
});

export default fi;
