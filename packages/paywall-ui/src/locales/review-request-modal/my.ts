import type { ReviewRequestModalLocaleText } from "./types";

const my = {
    title: (name) => `မင်္ဂလာပါ၊ ကျွန်တော် ${name} ပါ၊ ဒီအက်ပ်ရဲ့ developer ပါ 👋`,
    message:
      "အက်ပ်က အသုံးဝင်ခဲ့ရင် rating လေးတစ်ခုက အများကြီးကူညီပါတယ်။ မအဆင်ပြေတာရှိရင် feedback ပို့ပေးပါ။",
    satisfiedButton: "အက်ပ်ကို rating ပေးပါ",
    feedbackButton: "Feedback ပို့ပါ",
    laterButton: "နောက်မှ",
    profileImageAccessibilityLabel: "Developer profile ဓာတ်ပုံ",
  } satisfies ReviewRequestModalLocaleText;

export default my;
