import type { ReviewRequestModalLocaleText } from "./types";

const km = {
    title: (name) => `សួស្តី ខ្ញុំ ${name} ជាអ្នកអភិវឌ្ឍកម្មវិធីនេះ 👋`,
    message:
      "បើកម្មវិធីមានប្រយោជន៍ ការវាយតម្លៃរហ័សជួយបានច្រើន។ បើមានអ្វីមិនស្រួល សូមផ្ញើមតិកែលម្អ។",
    satisfiedButton: "វាយតម្លៃកម្មវិធី",
    feedbackButton: "ផ្ញើមតិកែលម្អ",
    laterButton: "ពេលក្រោយ",
    profileImageAccessibilityLabel: "រូបប្រវត្តិរូបរបស់អ្នកអភិវឌ្ឍ",
  } satisfies ReviewRequestModalLocaleText;

export default km;
