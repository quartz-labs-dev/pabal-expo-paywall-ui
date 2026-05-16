import type { ReviewRequestModalLocaleText } from "./types";

const az = {
    title: (name) => `Salam, mən ${name}, tətbiqin tərtibatçısıyam 👋`,
    message:
      "Tətbiq faydalı olubsa, qısa bir qiymətləndirmə çox kömək edər. Nəsə düzgün görünmürsə, rəy göndərin.",
    satisfiedButton: "Tətbiqi qiymətləndir",
    feedbackButton: "Rəy göndər",
    laterButton: "Sonra",
    profileImageAccessibilityLabel: "Tərtibatçı profil şəkli",
  } satisfies ReviewRequestModalLocaleText;

export default az;
