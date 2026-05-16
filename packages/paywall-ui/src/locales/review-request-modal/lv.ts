import type { ReviewRequestModalLocaleText } from "./types";

const lv = {
    title: (name) => `Sveiki, es esmu ${name}, šīs lietotnes izstrādātājs 👋`,
    message:
      "Ja lietotne ir bijusi noderīga, īss vērtējums ļoti palīdz. Ja kaut kas nav kārtībā, labāk nosūtiet atsauksmi.",
    satisfiedButton: "Novērtēt lietotni",
    feedbackButton: "Nosūtīt atsauksmi",
    laterButton: "Vēlāk",
    profileImageAccessibilityLabel: "Izstrādātāja profila foto",
  } satisfies ReviewRequestModalLocaleText;

export default lv;
