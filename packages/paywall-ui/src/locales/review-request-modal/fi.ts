import type { ReviewRequestModalLocaleText } from "./types";

const fi = {
    title: (name) => `Hei, olen ${name}, sovelluksen kehittäjä 👋`,
    message:
      "Jos sovellus on ollut hyödyllinen, nopea arvio auttaa paljon. Jos jokin tuntuu väärältä, lähetä palautetta.",
    satisfiedButton: "Arvioi sovellus",
    feedbackButton: "Lähetä palautetta",
    laterButton: "Myöhemmin",
    profileImageAccessibilityLabel: "Kehittäjän profiilikuva",
  } satisfies ReviewRequestModalLocaleText;

export default fi;
