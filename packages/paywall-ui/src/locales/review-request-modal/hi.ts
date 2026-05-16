import type { ReviewRequestModalLocaleText } from "./types";

const hi = {
    title: (name) => `नमस्ते, मैं ${name} हूँ, इस ऐप का डेवलपर 👋`,
    message:
      "अगर ऐप आपके काम आया है, तो एक छोटी रेटिंग बहुत मदद करती है। अगर कुछ ठीक नहीं लग रहा, तो फ़ीडबैक भेजें।",
    satisfiedButton: "ऐप को रेट करें",
    feedbackButton: "फ़ीडबैक भेजें",
    laterButton: "बाद में",
    profileImageAccessibilityLabel: "डेवलपर की प्रोफ़ाइल फ़ोटो",
  } satisfies ReviewRequestModalLocaleText;

export default hi;
