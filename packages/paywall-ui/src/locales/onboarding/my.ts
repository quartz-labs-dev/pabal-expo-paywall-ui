import { createOnboardingLocaleText } from "./types";

const my = createOnboardingLocaleText({
  text: {
    continueButton: "ဆက်လုပ်ရန်",
    doneButton: "ပြီးပါပြီ",
    tapToContinueButton: "ဆက်လုပ်ရန် တို့ပါ",
    landingTitle: "Post Black Belt မှ\nကြိုဆိုပါတယ်!",
    loginLabel: "လော့ဂ်အင်",
    loginPrompt: "အကောင့်ရှိပြီးသားလား? ",
    mockTitle: "နည်းစနစ်ရာပေါင်းများစွာကို\nအလွတ်မကျက်ပါနဲ့။",
    notificationNowLabel: "ယခု",
    notNowButton: "ယခုမဟုတ်သေးပါ",
    returnButton: "ယခုမဟုတ်သေးပါ",
    startButton: "စတင်ပါ",
  },
  permissionPrompt: { allowButton: "ခွင့်ပြုပါ", denyButton: "ခွင့်မပြုပါ" },
  nicknameInput: { title: "သင့်ကို ဘယ်လိုခေါ်ရမလဲ?", inputPlaceholder: "သင့်နာမည်ပြောင်", inputAccessibilityLabel: "နာမည်ပြောင်", welcomeTitle: "ကြိုဆိုပါတယ်, {nickname}!" },
});

export default my;
