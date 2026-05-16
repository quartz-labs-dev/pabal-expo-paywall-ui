import type { ReviewRequestModalLocaleText } from "./types";

const th = {
    title: (name) => `สวัสดี ผมคือ ${name} ผู้พัฒนาแอปนี้ 👋`,
    message:
      "ถ้าแอปมีประโยชน์ การให้คะแนนสั้น ๆ ช่วยได้มาก หากมีอะไรไม่ถูกใจ โปรดส่งความคิดเห็นแทน",
    satisfiedButton: "ให้คะแนนแอป",
    feedbackButton: "ส่งความคิดเห็น",
    laterButton: "ไว้ทีหลัง",
    profileImageAccessibilityLabel: "รูปโปรไฟล์ของผู้พัฒนา",
  } satisfies ReviewRequestModalLocaleText;

export default th;
