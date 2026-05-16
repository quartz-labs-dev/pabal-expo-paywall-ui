import type { ReviewRequestModalLocaleText } from "./types";

const hu = {
    title: (name) => `Szia, ${name} vagyok, az app fejlesztője 👋`,
    message:
      "Ha hasznos volt az app, egy gyors értékelés sokat segít. Ha valami nem stimmel, inkább küldj visszajelzést.",
    satisfiedButton: "App értékelése",
    feedbackButton: "Visszajelzés küldése",
    laterButton: "Később",
    profileImageAccessibilityLabel: "A fejlesztő profilképe",
  } satisfies ReviewRequestModalLocaleText;

export default hu;
