import type { ReviewRequestModalLocaleText } from "./types";

const lo = {
    title: (name) => `ສະບາຍດີ, ຂ້ອຍແມ່ນ ${name}, ຜູ້ພັດທະນາແອັບນີ້ 👋`,
    message:
      "ຖ້າແອັບນີ້ມີປະໂຫຍດ, ການໃຫ້ຄະແນນສັ້ນໆຊ່ວຍໄດ້ຫຼາຍ. ຖ້າມີສິ່ງໃດບໍ່ຖືກໃຈ, ກະລຸນາສົ່ງຄຳຕິຊົມ.",
    satisfiedButton: "ໃຫ້ຄະແນນແອັບ",
    feedbackButton: "ສົ່ງຄຳຕິຊົມ",
    laterButton: "ໄວ້ພາຍຫຼັງ",
    profileImageAccessibilityLabel: "ຮູບໂປຣໄຟລ໌ຂອງຜູ້ພັດທະນາ",
  } satisfies ReviewRequestModalLocaleText;

export default lo;
