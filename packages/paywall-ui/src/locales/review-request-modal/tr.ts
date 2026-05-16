import type { ReviewRequestModalLocaleText } from "./types";

const tr = {
    title: (name) => `Merhaba, ben ${name}, uygulamanın geliştiricisiyim 👋`,
    message:
      "Uygulama işinize yaradıysa kısa bir puanlama çok yardımcı olur. Bir şey ters geliyorsa lütfen geri bildirim gönderin.",
    satisfiedButton: "Uygulamayı değerlendir",
    feedbackButton: "Geri bildirim gönder",
    laterButton: "Sonra",
    profileImageAccessibilityLabel: "Geliştirici profil fotoğrafı",
  } satisfies ReviewRequestModalLocaleText;

export default tr;
