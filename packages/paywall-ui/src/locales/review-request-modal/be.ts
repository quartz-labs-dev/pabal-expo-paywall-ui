import type { ReviewRequestModalLocaleText } from "./types";

const be = {
    title: (name) => `Вітаю, я ${name}, распрацоўшчык праграмы 👋`,
    message:
      "Калі праграма была карыснай, хуткая ацэнка вельмі дапаможа. Калі нешта не так, лепш адпраўце водгук.",
    satisfiedButton: "Ацаніць праграму",
    feedbackButton: "Адправіць водгук",
    laterButton: "Пазней",
    profileImageAccessibilityLabel: "Фота профілю распрацоўшчыка",
  } satisfies ReviewRequestModalLocaleText;

export default be;
