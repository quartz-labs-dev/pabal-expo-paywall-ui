import type { ReviewRequestModalLocaleText } from "./types";

const el = {
    title: (name) => `Γεια, είμαι ο ${name}, ο δημιουργός της εφαρμογής 👋`,
    message:
      "Αν η εφαρμογή σου φάνηκε χρήσιμη, μια γρήγορη αξιολόγηση βοηθά πολύ. Αν κάτι δεν είναι σωστό, στείλε σχόλια.",
    satisfiedButton: "Αξιολόγηση εφαρμογής",
    feedbackButton: "Αποστολή σχολίων",
    laterButton: "Αργότερα",
    profileImageAccessibilityLabel: "Φωτογραφία προφίλ δημιουργού",
  } satisfies ReviewRequestModalLocaleText;

export default el;
