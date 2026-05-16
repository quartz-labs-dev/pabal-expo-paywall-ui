import type { ReviewRequestModalLocaleText } from "./types";

const te = {
    title: (name) => `హాయ్, నేను ${name}, ఈ యాప్ డెవలపర్ 👋`,
    message:
      "యాప్ ఉపయోగపడితే, చిన్న రేటింగ్ చాలా సహాయం చేస్తుంది. ఏదైనా సరిగా అనిపించకపోతే ఫీడ్‌బ్యాక్ పంపండి.",
    satisfiedButton: "యాప్‌ను రేట్ చేయండి",
    feedbackButton: "ఫీడ్‌బ్యాక్ పంపండి",
    laterButton: "తర్వాత",
    profileImageAccessibilityLabel: "డెవలపర్ ప్రొఫైల్ ఫోటో",
  } satisfies ReviewRequestModalLocaleText;

export default te;
