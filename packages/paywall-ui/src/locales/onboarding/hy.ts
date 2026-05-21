import { createOnboardingLocaleText } from "./types";

const hy = createOnboardingLocaleText({
  text: {
    continueButton: "Շարունակել",
    doneButton: "Պատրաստ է",
    tapToContinueButton: "Հպեք՝ շարունակելու համար",
    landingTitle: "Բարի գալուստ\nPost Black Belt!",
    loginLabel: "Մուտք գործել",
    loginPrompt: "Արդեն ունե՞ք հաշիվ։ ",
    mockTitle: "Մի անգիր արեք\nհարյուրավոր տեխնիկաներ։",
    notificationNowLabel: "Հիմա",
    notNowButton: "Ոչ հիմա",
    returnButton: "Ոչ հիմա",
    startButton: "Սկսել",
  },
  permissionPrompt: { allowButton: "Թույլատրել", denyButton: "Չթույլատրել" },
  nicknameInput: { title: "Ինչպե՞ս դիմենք ձեզ։", inputPlaceholder: "Ձեր մականունը", inputAccessibilityLabel: "Մականուն", welcomeTitle: "Բարի գալուստ, {nickname}!" },
});

export default hy;
