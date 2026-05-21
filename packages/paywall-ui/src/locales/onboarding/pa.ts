import { createOnboardingLocaleText } from "./types";

const pa = createOnboardingLocaleText({
  text: {
    continueButton: "ਜਾਰੀ ਰੱਖੋ",
    doneButton: "ਮੁਕੰਮਲ",
    tapToContinueButton: "ਜਾਰੀ ਰੱਖਣ ਲਈ ਟੈਪ ਕਰੋ",
    landingTitle: "Post Black Belt ਵਿੱਚ\nਸੁਆਗਤ ਹੈ!",
    loginLabel: "ਲੌਗ ਇਨ",
    loginPrompt: "ਪਹਿਲਾਂ ਹੀ ਖਾਤਾ ਹੈ? ",
    mockTitle: "ਸੈਂਕੜੇ ਤਕਨੀਕਾਂ\nਯਾਦ ਨਾ ਕਰੋ।",
    notificationNowLabel: "ਹੁਣ",
    notNowButton: "ਹੁਣ ਨਹੀਂ",
    returnButton: "ਹੁਣ ਨਹੀਂ",
    startButton: "ਸ਼ੁਰੂ ਕਰੋ",
  },
  permissionPrompt: { allowButton: "ਇਜਾਜ਼ਤ ਦਿਓ", denyButton: "ਇਜਾਜ਼ਤ ਨਾ ਦਿਓ" },
  nicknameInput: { title: "ਅਸੀਂ ਤੁਹਾਨੂੰ ਕੀ ਕਹਿ ਕੇ ਬੁਲਾਈਏ?", inputPlaceholder: "ਤੁਹਾਡਾ ਨਿਕਨੇਮ", inputAccessibilityLabel: "ਨਿਕਨੇਮ", welcomeTitle: "ਸਵਾਗਤ ਹੈ, {nickname}!" },
});

export default pa;
