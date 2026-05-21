import { createOnboardingLocaleText } from "./types";

const am = createOnboardingLocaleText({
  text: {
    continueButton: "ቀጥል",
    doneButton: "ተጠናቋል",
    tapToContinueButton: "ለመቀጠል ይንኩ",
    landingTitle: "እንኳን ወደ\nPost Black Belt በደህና መጡ!",
    loginLabel: "ግባ",
    loginPrompt: "መለያ አለዎት? ",
    mockTitle: "መቶዎች ቴክኒኮችን\nሁሉ አትሸምድዱ።",
    notificationNowLabel: "አሁን",
    notNowButton: "አሁን አይደለም",
    returnButton: "አሁን አይደለም",
    startButton: "ጀምር",
  },
  permissionPrompt: { allowButton: "ፍቀድ", denyButton: "አትፍቀድ" },
  nicknameInput: { title: "ምን ብለን እንጥራዎ?", inputPlaceholder: "ቅጽል ስምዎ", inputAccessibilityLabel: "ቅጽል ስም", welcomeTitle: "እንኳን ደህና መጡ፣ {nickname}!" },
});

export default am;
