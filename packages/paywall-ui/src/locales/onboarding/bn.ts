import { createOnboardingLocaleText } from "./types";

const bn = createOnboardingLocaleText({
  text: {
    continueButton: "চালিয়ে যান",
    doneButton: "সম্পন্ন",
    tapToContinueButton: "চালিয়ে যেতে ট্যাপ করুন",
    landingTitle: "Post Black Belt-এ\nস্বাগতম!",
    loginLabel: "লগ ইন",
    loginPrompt: "ইতিমধ্যে অ্যাকাউন্ট আছে? ",
    mockTitle: "শত শত কৌশল\nসব মুখস্থ করবেন না।",
    notificationNowLabel: "এখন",
    notNowButton: "এখন নয়",
    returnButton: "এখন নয়",
    startButton: "শুরু করুন",
  },
  permissionPrompt: { allowButton: "অনুমতি দিন", denyButton: "অনুমতি দেবেন না" },
  nicknameInput: { title: "আমরা আপনাকে কী নামে ডাকব?", inputPlaceholder: "আপনার ডাকনাম", inputAccessibilityLabel: "ডাকনাম", welcomeTitle: "স্বাগতম, {nickname}!" },
});

export default bn;
