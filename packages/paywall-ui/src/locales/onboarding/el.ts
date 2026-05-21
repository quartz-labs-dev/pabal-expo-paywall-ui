import { createOnboardingLocaleText } from "./types";

const el = createOnboardingLocaleText({
  text: {
    continueButton: "Συνέχεια",
    doneButton: "Τέλος",
    tapToContinueButton: "Πατήστε για συνέχεια",
    landingTitle: "Καλώς ήρθες στο\nPost Black Belt!",
    loginLabel: "Σύνδεση",
    loginPrompt: "Έχεις ήδη λογαριασμό; ",
    mockTitle: "Μην απομνημονεύεις\nεκατοντάδες τεχνικές.",
    notificationNowLabel: "Τώρα",
    notNowButton: "Όχι τώρα",
    returnButton: "Όχι τώρα",
    startButton: "Έναρξη",
  },
  permissionPrompt: { allowButton: "Να επιτρέπεται", denyButton: "Να μην επιτρέπεται" },
  nicknameInput: { title: "Πώς να σε φωνάζουμε;", inputPlaceholder: "Το ψευδώνυμό σου", inputAccessibilityLabel: "Ψευδώνυμο", welcomeTitle: "Καλώς ήρθες, {nickname}!" },
});

export default el;
