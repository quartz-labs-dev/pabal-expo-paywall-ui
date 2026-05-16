import type { ReviewRequestModalLocaleText } from "./types";

const si = {
    title: (name) => `හයි, මම ${name}, මෙම යෙදුමේ සංවර්ධකයා 👋`,
    message:
      "යෙදුම ප්‍රයෝජනවත් නම්, ඉක්මන් ශ්‍රේණිගත කිරීමක් බොහෝ උදව් වේ. යමක් වැරදි නම් ප්‍රතිචාරයක් එවන්න.",
    satisfiedButton: "යෙදුම ශ්‍රේණිගත කරන්න",
    feedbackButton: "ප්‍රතිචාර යවන්න",
    laterButton: "පසුව",
    profileImageAccessibilityLabel: "සංවර්ධකයාගේ පැතිකඩ ඡායාරූපය",
  } satisfies ReviewRequestModalLocaleText;

export default si;
