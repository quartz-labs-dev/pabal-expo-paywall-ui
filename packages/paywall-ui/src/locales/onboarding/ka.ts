import { createOnboardingLocaleText } from "./types";

const ka = createOnboardingLocaleText({
  text: {
    continueButton: "გაგრძელება",
    doneButton: "შესრულებულია",
    tapToContinueButton: "გასაგრძელებლად შეეხეთ",
    landingTitle: "კეთილი იყოს თქვენი მობრძანება\nPost Black Belt-ში!",
    loginLabel: "შესვლა",
    loginPrompt: "უკვე გაქვთ ანგარიში? ",
    mockTitle: "ნუ დაიზეპირებთ\nასობით ტექნიკას.",
    notificationNowLabel: "ახლა",
    notNowButton: "ახლა არა",
    returnButton: "ახლა არა",
    startButton: "დაწყება",
  },
  permissionPrompt: { allowButton: "დაშვება", denyButton: "არ დაუშვა" },
  nicknameInput: { title: "როგორ მოგმართოთ?", inputPlaceholder: "თქვენი მეტსახელი", inputAccessibilityLabel: "მეტსახელი", welcomeTitle: "კეთილი იყოს თქვენი მობრძანება, {nickname}!" },
});

export default ka;
