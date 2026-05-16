import type { ReviewRequestModalLocaleText } from "./types";

const ka = {
    title: (name) => `გამარჯობა, მე ვარ ${name}, აპის დეველოპერი 👋`,
    message:
      "თუ აპი გამოგადგათ, სწრაფი შეფასება ძალიან მეხმარება. თუ რამე არ მოგწონთ, გამოგზავნეთ უკუკავშირი.",
    satisfiedButton: "აპის შეფასება",
    feedbackButton: "უკუკავშირის გაგზავნა",
    laterButton: "მოგვიანებით",
    profileImageAccessibilityLabel: "დეველოპერის პროფილის ფოტო",
  } satisfies ReviewRequestModalLocaleText;

export default ka;
