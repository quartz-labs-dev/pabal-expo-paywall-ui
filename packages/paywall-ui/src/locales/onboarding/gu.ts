import { createOnboardingLocaleText } from "./types";

const gu = createOnboardingLocaleText({
  text: {
    continueButton: "ચાલુ રાખો",
    doneButton: "પૂર્ણ",
    tapToContinueButton: "ચાલુ રાખવા માટે ટેપ કરો",
    landingTitle: "Post Black Belt માં\nઆપનું સ્વાગત છે!",
    loginLabel: "લૉગ ઇન",
    loginPrompt: "પહેલેથી એકાઉન્ટ છે? ",
    mockTitle: "સૈંકડો ટેકનિક\nયાદ ન કરો.",
    notificationNowLabel: "હમણાં",
    notNowButton: "હમણાં નહીં",
    returnButton: "હમણાં નહીં",
    startButton: "શરૂ કરો",
  },
  permissionPrompt: { allowButton: "મંજૂરી આપો", denyButton: "મંજૂરી ન આપો" },
  nicknameInput: { title: "અમે તમને શું કહીને બોલાવીએ?", inputPlaceholder: "તમારું ઉપનામ", inputAccessibilityLabel: "ઉપનામ", welcomeTitle: "સ્વાગત છે, {nickname}!" },
});

export default gu;
