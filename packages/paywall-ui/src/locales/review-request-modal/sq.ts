import type { ReviewRequestModalLocaleText } from "./types";

const sq = {
    title: (name) => `Përshëndetje, jam ${name}, zhvilluesi i aplikacionit 👋`,
    message:
      "Nëse aplikacioni ju ka ndihmuar, një vlerësim i shpejtë ndihmon shumë. Nëse diçka nuk shkon, dërgoni komente.",
    satisfiedButton: "Vlerëso aplikacionin",
    feedbackButton: "Dërgo komente",
    laterButton: "Më vonë",
    profileImageAccessibilityLabel: "Foto profili e zhvilluesit",
  } satisfies ReviewRequestModalLocaleText;

export default sq;
