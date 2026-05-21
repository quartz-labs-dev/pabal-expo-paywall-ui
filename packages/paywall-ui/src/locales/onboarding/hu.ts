import { createOnboardingLocaleText } from "./types";

const hu = createOnboardingLocaleText({
  text: {
    continueButton: "Folytatás",
    doneButton: "Kész",
    tapToContinueButton: "Koppints a folytatáshoz",
    landingTitle: "Üdvözlünk a\nPost Black Beltben!",
    loginLabel: "Bejelentkezés",
    loginPrompt: "Már van fiókod? ",
    mockTitle: "Ne memorizálj\ntöbb száz technikát.",
    notificationNowLabel: "Most",
    notNowButton: "Most nem",
    returnButton: "Most nem",
    startButton: "Kezdés",
  },
  permissionPrompt: { allowButton: "Engedélyezés", denyButton: "Ne engedélyezze" },
  nicknameInput: { title: "Hogyan szólítsunk?", inputPlaceholder: "A beceneved", inputAccessibilityLabel: "Becenév", welcomeTitle: "Üdvözlünk, {nickname}!" },
});

export default hu;
