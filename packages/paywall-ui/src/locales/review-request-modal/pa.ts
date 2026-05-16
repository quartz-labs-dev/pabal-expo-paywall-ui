import type { ReviewRequestModalLocaleText } from "./types";

const pa = {
    title: (name) => `ਹਾਇ, ਮੈਂ ${name} ਹਾਂ, ਇਸ ਐਪ ਦਾ ਡਿਵੈਲਪਰ 👋`,
    message:
      "ਜੇ ਐਪ ਤੁਹਾਡੇ ਕੰਮ ਆਈ ਹੈ, ਤਾਂ ਇੱਕ ਛੋਟੀ ਰੇਟਿੰਗ ਬਹੁਤ ਮਦਦ ਕਰਦੀ ਹੈ। ਜੇ ਕੁਝ ਠੀਕ ਨਹੀਂ ਲੱਗਦਾ, ਤਾਂ ਫੀਡਬੈਕ ਭੇਜੋ।",
    satisfiedButton: "ਐਪ ਨੂੰ ਰੇਟ ਕਰੋ",
    feedbackButton: "ਫੀਡਬੈਕ ਭੇਜੋ",
    laterButton: "ਬਾਅਦ ਵਿੱਚ",
    profileImageAccessibilityLabel: "ਡਿਵੈਲਪਰ ਦੀ ਪ੍ਰੋਫਾਈਲ ਫੋਟੋ",
  } satisfies ReviewRequestModalLocaleText;

export default pa;
