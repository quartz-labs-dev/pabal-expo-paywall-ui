import { createOnboardingLocaleText } from "./types";

const tr = createOnboardingLocaleText({
  text: {
    continueButton: "Devam et",
    doneButton: "Bitti",
    tapToContinueButton: "Devam etmek için dokun",
    landingTitle: "Post Black Belt’e\nhoş geldiniz!",
    loginLabel: "Giriş yap",
    loginPrompt: "Zaten hesabınız var mı? ",
    mockTitle: "Yüzlerce tekniği\nezberlemeyin.",
    notificationNowLabel: "Şimdi",
    notNowButton: "Şimdi değil",
    returnButton: "Şimdi değil",
    startButton: "Başla",
  },
  permissionPrompt: { allowButton: "İzin ver", denyButton: "İzin verme" },
  nicknameInput: { title: "Sana nasıl hitap edelim?", inputPlaceholder: "Takma adin", inputAccessibilityLabel: "Takma ad", welcomeTitle: "Hos geldin, {nickname}!" },
});

export default tr;
