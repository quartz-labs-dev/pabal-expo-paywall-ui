import { createOnboardingLocaleText } from "./types";

const km = createOnboardingLocaleText({
  text: {
    continueButton: "បន្ត",
    doneButton: "រួចរាល់",
    tapToContinueButton: "ប៉ះដើម្បីបន្ត",
    landingTitle: "សូមស្វាគមន៍មកកាន់\nPost Black Belt!",
    loginLabel: "ចូល",
    loginPrompt: "មានគណនីរួចហើយឬ? ",
    mockTitle: "កុំទន្ទេញ\nបច្ចេកទេសរាប់រយ។",
    notificationNowLabel: "ឥឡូវនេះ",
    notNowButton: "មិនមែនឥឡូវនេះទេ",
    returnButton: "មិនមែនឥឡូវនេះទេ",
    startButton: "ចាប់ផ្តើម",
  },
  permissionPrompt: { allowButton: "អនុញ្ញាត", denyButton: "កុំអនុញ្ញាត" },
  nicknameInput: { title: "តើយើងគួរហៅអ្នកថាអ្វី?", inputPlaceholder: "ឈ្មោះហៅក្រៅរបស់អ្នក", inputAccessibilityLabel: "ឈ្មោះហៅក្រៅ", welcomeTitle: "សូមស្វាគមន៍, {nickname}!" },
});

export default km;
