import { createOnboardingLocaleText } from "./types";

const az = createOnboardingLocaleText({
  text: {
    continueButton: "Davam et",
    doneButton: "Tamam",
    tapToContinueButton: "Davam etmək üçün toxunun",
    landingTitle: "Post Black Belt-ə\nxoş gəlmisiniz!",
    loginLabel: "Daxil ol",
    loginPrompt: "Artıq hesabınız var? ",
    mockTitle: "Yüzlərlə texnikanı\nyadda saxlamağa çalışmayın.",
    notificationNowLabel: "İndi",
    notNowButton: "İndi yox",
    returnButton: "İndi yox",
    startButton: "Başla",
  },
  permissionPrompt: { allowButton: "İcazə ver", denyButton: "İcazə vermə" },
  nicknameInput: { title: "Sizə necə müraciət edək?", inputPlaceholder: "Ləqəbiniz", inputAccessibilityLabel: "Ləqəb", welcomeTitle: "Xoş gəlmisiniz, {nickname}!" },
});

export default az;
