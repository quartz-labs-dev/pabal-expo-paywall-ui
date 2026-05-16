import type { ReviewRequestModalLocaleText } from "./types";

const en = {
    title: (name) => `Hi, I'm ${name}, the developer of the app 👋`,
    message:
      "If the app has been useful, a quick rating helps. If something feels off, send feedback instead.",
    satisfiedButton: "Rate the app",
    feedbackButton: "Send feedback",
    laterButton: "Later",
    profileImageAccessibilityLabel: "Developer profile photo",
  } satisfies ReviewRequestModalLocaleText;

export default en;
