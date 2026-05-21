import { createOnboardingLocaleText } from "./types";

const lo = createOnboardingLocaleText({
  text: {
    continueButton: "ສືບຕໍ່",
    doneButton: "ສຳເລັດ",
    tapToContinueButton: "ແຕະເພື່ອສືບຕໍ່",
    landingTitle: "ຍິນດີຕ້ອນຮັບສູ່\nPost Black Belt!",
    loginLabel: "ເຂົ້າລະບົບ",
    loginPrompt: "ມີບັນຊີແລ້ວບໍ? ",
    mockTitle: "ຢ່າຈື່\nເຕັກນິກຫຼາຍຮ້ອຍຢ່າງ.",
    notificationNowLabel: "ຕອນນີ້",
    notNowButton: "ບໍ່ແມ່ນຕອນນີ້",
    returnButton: "ບໍ່ແມ່ນຕອນນີ້",
    startButton: "ເລີ່ມຕົ້ນ",
  },
  permissionPrompt: { allowButton: "ອະນຸຍາດ", denyButton: "ບໍ່ອະນຸຍາດ" },
  nicknameInput: { title: "ພວກເຮົາຄວນເອີ້ນທ່ານວ່າຫຍັງ?", inputPlaceholder: "ຊື່ຫຼິ້ນຂອງທ່ານ", inputAccessibilityLabel: "ຊື່ຫຼິ້ນ", welcomeTitle: "ຍິນດີຕ້ອນຮັບ, {nickname}!" },
});

export default lo;
