import { createOnboardingLocaleText } from "./types";

const ml = createOnboardingLocaleText({
  text: {
    continueButton: "തുടരുക",
    doneButton: "പൂർത്തിയായി",
    tapToContinueButton: "തുടരാൻ ടാപ്പ് ചെയ്യുക",
    landingTitle: "Post Black Belt-ലേക്ക്\nസ്വാഗതം!",
    loginLabel: "ലോഗിൻ",
    loginPrompt: "ഇതിനകം അക്കൗണ്ട് ഉണ്ടോ? ",
    mockTitle: "നൂറുകണക്കിന് സാങ്കേതികവിദ്യകൾ\nമനഃപാഠമാക്കേണ്ട.",
    notificationNowLabel: "ഇപ്പോൾ",
    notNowButton: "ഇപ്പോൾ വേണ്ട",
    returnButton: "ഇപ്പോൾ വേണ്ട",
    startButton: "ആരംഭിക്കുക",
  },
  permissionPrompt: { allowButton: "അനുവദിക്കുക", denyButton: "അനുവദിക്കരുത്" },
  nicknameInput: { title: "ഞങ്ങൾ നിങ്ങളെ എന്തെന്ന് വിളിക്കണം?", inputPlaceholder: "നിങ്ങളുടെ വിളിപ്പേര്", inputAccessibilityLabel: "വിളിപ്പേര്", welcomeTitle: "സ്വാഗതം, {nickname}!" },
});

export default ml;
