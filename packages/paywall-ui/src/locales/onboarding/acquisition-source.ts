import {
  PAYWALL_TEXT_LOCALES,
  type PaywallTextLocale,
} from "../paywall";
import { resolvePaywallTextLocale } from "../localized-paywall-copy";

export interface OnboardingAcquisitionSourceText {
  appStore: string;
  friendOrFamily: string;
  google: string;
  instagram: string;
  other: string;
  playStore: string;
  title: string;
  x: string;
  youtube: string;
}

interface OnboardingAcquisitionSourceTextInput {
  friendOrFamily: string;
  other: string;
  title: string;
  x: string;
}

export const ONBOARDING_ACQUISITION_SOURCE_TEXT_LOCALES =
  PAYWALL_TEXT_LOCALES;

const createOnboardingAcquisitionSourceText = ({
  friendOrFamily,
  other,
  title,
  x,
}: OnboardingAcquisitionSourceTextInput): OnboardingAcquisitionSourceText => ({
  appStore: "App Store",
  friendOrFamily,
  google: "Google",
  instagram: "Instagram",
  other,
  playStore: "Play Store",
  title,
  x,
  youtube: "YouTube",
});

const ONBOARDING_ACQUISITION_SOURCE_TEXT_BY_LOCALE = {
  af: createOnboardingAcquisitionSourceText({
    title: "Waar het jy van ons gehoor?",
    friendOrFamily: "Vriend of familie",
    other: "Ander",
    x: "X (voorheen Twitter)",
  }),
  am: createOnboardingAcquisitionSourceText({
    title: "ስለ እኛ የሰሙት ከየት ነው?",
    friendOrFamily: "ጓደኛ ወይም ቤተሰብ",
    other: "ሌላ",
    x: "X (ቀድሞ Twitter)",
  }),
  ar: createOnboardingAcquisitionSourceText({
    title: "أين سمعت عنا؟",
    friendOrFamily: "صديق أو أحد أفراد العائلة",
    other: "أخرى",
    x: "X (تويتر سابقًا)",
  }),
  az: createOnboardingAcquisitionSourceText({
    title: "Bizim haqqımızda haradan eşitdiniz?",
    friendOrFamily: "Dost və ya ailə",
    other: "Digər",
    x: "X (əvvəllər Twitter)",
  }),
  be: createOnboardingAcquisitionSourceText({
    title: "Адкуль вы пра нас даведаліся?",
    friendOrFamily: "Сябар або сям'я",
    other: "Іншае",
    x: "X (раней Twitter)",
  }),
  bg: createOnboardingAcquisitionSourceText({
    title: "Откъде научихте за нас?",
    friendOrFamily: "Приятел или семейство",
    other: "Друго",
    x: "X (преди Twitter)",
  }),
  bn: createOnboardingAcquisitionSourceText({
    title: "আমাদের সম্পর্কে কোথায় শুনেছেন?",
    friendOrFamily: "বন্ধু বা পরিবার",
    other: "অন্যান্য",
    x: "X (আগে Twitter)",
  }),
  ca: createOnboardingAcquisitionSourceText({
    title: "On has sentit parlar de nosaltres?",
    friendOrFamily: "Amics o família",
    other: "Altres",
    x: "X (abans Twitter)",
  }),
  cs: createOnboardingAcquisitionSourceText({
    title: "Kde jste se o nás dozvěděli?",
    friendOrFamily: "Přátelé nebo rodina",
    other: "Jiné",
    x: "X (dříve Twitter)",
  }),
  da: createOnboardingAcquisitionSourceText({
    title: "Hvor har du hørt om os?",
    friendOrFamily: "Venner eller familie",
    other: "Andet",
    x: "X (tidligere Twitter)",
  }),
  de: createOnboardingAcquisitionSourceText({
    title: "Wo hast du von uns gehört?",
    friendOrFamily: "Freunde oder Familie",
    other: "Sonstiges",
    x: "X (früher Twitter)",
  }),
  el: createOnboardingAcquisitionSourceText({
    title: "Πού άκουσες για εμάς;",
    friendOrFamily: "Φίλοι ή οικογένεια",
    other: "Άλλο",
    x: "X (πρώην Twitter)",
  }),
  en: createOnboardingAcquisitionSourceText({
    title: "Where did you hear about us?",
    friendOrFamily: "Friend or family",
    other: "Other",
    x: "X (formerly Twitter)",
  }),
  es: createOnboardingAcquisitionSourceText({
    title: "¿Dónde supiste de nosotros?",
    friendOrFamily: "Amigos o familia",
    other: "Otro",
    x: "X (antes Twitter)",
  }),
  et: createOnboardingAcquisitionSourceText({
    title: "Kust sa meist kuulsid?",
    friendOrFamily: "Sõbrad või pere",
    other: "Muu",
    x: "X (varem Twitter)",
  }),
  eu: createOnboardingAcquisitionSourceText({
    title: "Non entzun duzu gure berri?",
    friendOrFamily: "Lagunak edo familia",
    other: "Beste bat",
    x: "X (lehen Twitter)",
  }),
  fa: createOnboardingAcquisitionSourceText({
    title: "از کجا با ما آشنا شدید؟",
    friendOrFamily: "دوست یا خانواده",
    other: "سایر",
    x: "X (قبلاً Twitter)",
  }),
  fi: createOnboardingAcquisitionSourceText({
    title: "Mistä kuulit meistä?",
    friendOrFamily: "Ystävä tai perhe",
    other: "Muu",
    x: "X (aiemmin Twitter)",
  }),
  fil: createOnboardingAcquisitionSourceText({
    title: "Saan mo kami narinig?",
    friendOrFamily: "Kaibigan o pamilya",
    other: "Iba pa",
    x: "X (dating Twitter)",
  }),
  fr: createOnboardingAcquisitionSourceText({
    title: "Où avez-vous entendu parler de nous ?",
    friendOrFamily: "Ami ou famille",
    other: "Autre",
    x: "X (anciennement Twitter)",
  }),
  gl: createOnboardingAcquisitionSourceText({
    title: "Onde soubeches de nós?",
    friendOrFamily: "Amizades ou familia",
    other: "Outro",
    x: "X (antes Twitter)",
  }),
  gu: createOnboardingAcquisitionSourceText({
    title: "અમારા વિશે તમે ક્યાંથી સાંભળ્યું?",
    friendOrFamily: "મિત્રો અથવા પરિવાર",
    other: "અન્ય",
    x: "X (અગાઉ Twitter)",
  }),
  he: createOnboardingAcquisitionSourceText({
    title: "איפה שמעת עלינו?",
    friendOrFamily: "חברים או משפחה",
    other: "אחר",
    x: "X (לשעבר Twitter)",
  }),
  hi: createOnboardingAcquisitionSourceText({
    title: "आपने हमारे बारे में कहाँ सुना?",
    friendOrFamily: "दोस्त या परिवार",
    other: "अन्य",
    x: "X (पहले Twitter)",
  }),
  hr: createOnboardingAcquisitionSourceText({
    title: "Gdje ste čuli za nas?",
    friendOrFamily: "Prijatelj ili obitelj",
    other: "Ostalo",
    x: "X (prije Twitter)",
  }),
  hu: createOnboardingAcquisitionSourceText({
    title: "Hol hallott rólunk?",
    friendOrFamily: "Barát vagy család",
    other: "Egyéb",
    x: "X (korábban Twitter)",
  }),
  hy: createOnboardingAcquisitionSourceText({
    title: "Որտե՞ղ եք լսել մեր մասին։",
    friendOrFamily: "Ընկեր կամ ընտանիք",
    other: "Այլ",
    x: "X (նախկինում Twitter)",
  }),
  id: createOnboardingAcquisitionSourceText({
    title: "Dari mana Anda mendengar tentang kami?",
    friendOrFamily: "Teman atau keluarga",
    other: "Lainnya",
    x: "X (sebelumnya Twitter)",
  }),
  is: createOnboardingAcquisitionSourceText({
    title: "Hvar heyrðir þú af okkur?",
    friendOrFamily: "Vinur eða fjölskylda",
    other: "Annað",
    x: "X (áður Twitter)",
  }),
  it: createOnboardingAcquisitionSourceText({
    title: "Dove hai sentito parlare di noi?",
    friendOrFamily: "Amici o famiglia",
    other: "Altro",
    x: "X (ex Twitter)",
  }),
  ja: createOnboardingAcquisitionSourceText({
    title: "どこで私たちを知りましたか？",
    friendOrFamily: "友人または家族",
    other: "その他",
    x: "X（旧Twitter）",
  }),
  ka: createOnboardingAcquisitionSourceText({
    title: "სად გაიგეთ ჩვენ შესახებ?",
    friendOrFamily: "მეგობარი ან ოჯახი",
    other: "სხვა",
    x: "X (ყოფილი Twitter)",
  }),
  kk: createOnboardingAcquisitionSourceText({
    title: "Біз туралы қайдан естідіңіз?",
    friendOrFamily: "Дос немесе отбасы",
    other: "Басқа",
    x: "X (бұрын Twitter)",
  }),
  km: createOnboardingAcquisitionSourceText({
    title: "តើអ្នកបានឮអំពីយើងពីណា?",
    friendOrFamily: "មិត្តភក្តិ ឬគ្រួសារ",
    other: "ផ្សេងទៀត",
    x: "X (ពីមុន Twitter)",
  }),
  kn: createOnboardingAcquisitionSourceText({
    title: "ನಮ್ಮ ಬಗ್ಗೆ ನೀವು ಎಲ್ಲಿ ಕೇಳಿದ್ದೀರಿ?",
    friendOrFamily: "ಸ್ನೇಹಿತ ಅಥವಾ ಕುಟುಂಬ",
    other: "ಇತರೆ",
    x: "X (ಹಿಂದೆ Twitter)",
  }),
  ko: createOnboardingAcquisitionSourceText({
    title: "어디에서 저희를 알게 되셨나요?",
    friendOrFamily: "친구 또는 가족",
    other: "기타",
    x: "X(구 Twitter)",
  }),
  ky: createOnboardingAcquisitionSourceText({
    title: "Биз жөнүндө кайдан уктуңуз?",
    friendOrFamily: "Дос же үй-бүлө",
    other: "Башка",
    x: "X (мурда Twitter)",
  }),
  lo: createOnboardingAcquisitionSourceText({
    title: "ທ່ານໄດ້ຍິນກ່ຽວກັບພວກເຮົາຈາກໃສ?",
    friendOrFamily: "ໝູ່ ຫຼື ຄອບຄົວ",
    other: "ອື່ນໆ",
    x: "X (ເມື່ອກ່ອນ Twitter)",
  }),
  lt: createOnboardingAcquisitionSourceText({
    title: "Kur apie mus sužinojote?",
    friendOrFamily: "Draugai arba šeima",
    other: "Kita",
    x: "X (anksčiau Twitter)",
  }),
  lv: createOnboardingAcquisitionSourceText({
    title: "Kur jūs par mums uzzinājāt?",
    friendOrFamily: "Draugi vai ģimene",
    other: "Cits",
    x: "X (agrāk Twitter)",
  }),
  mk: createOnboardingAcquisitionSourceText({
    title: "Каде слушнавте за нас?",
    friendOrFamily: "Пријател или семејство",
    other: "Друго",
    x: "X (порано Twitter)",
  }),
  ml: createOnboardingAcquisitionSourceText({
    title: "ഞങ്ങളെ കുറിച്ച് നിങ്ങൾ എവിടെ നിന്നാണ് കേട്ടത്?",
    friendOrFamily: "സുഹൃത്ത് അല്ലെങ്കിൽ കുടുംബം",
    other: "മറ്റുള്ളവ",
    x: "X (മുമ്പ് Twitter)",
  }),
  mn: createOnboardingAcquisitionSourceText({
    title: "Та бидний тухай хаанаас сонссон бэ?",
    friendOrFamily: "Найз эсвэл гэр бүл",
    other: "Бусад",
    x: "X (өмнө нь Twitter)",
  }),
  mr: createOnboardingAcquisitionSourceText({
    title: "आमच्याबद्दल तुम्हाला कुठे कळले?",
    friendOrFamily: "मित्र किंवा कुटुंब",
    other: "इतर",
    x: "X (पूर्वी Twitter)",
  }),
  ms: createOnboardingAcquisitionSourceText({
    title: "Di mana anda dengar tentang kami?",
    friendOrFamily: "Rakan atau keluarga",
    other: "Lain-lain",
    x: "X (dahulu Twitter)",
  }),
  my: createOnboardingAcquisitionSourceText({
    title: "ကျွန်ုပ်တို့အကြောင်း ဘယ်ကနေ သိခဲ့ပါသလဲ?",
    friendOrFamily: "မိတ်ဆွေ သို့မဟုတ် မိသားစု",
    other: "အခြား",
    x: "X (ယခင် Twitter)",
  }),
  nb: createOnboardingAcquisitionSourceText({
    title: "Hvor hørte du om oss?",
    friendOrFamily: "Venner eller familie",
    other: "Annet",
    x: "X (tidligere Twitter)",
  }),
  ne: createOnboardingAcquisitionSourceText({
    title: "हाम्रो बारेमा कहाँ सुन्नुभयो?",
    friendOrFamily: "साथी वा परिवार",
    other: "अन्य",
    x: "X (पहिले Twitter)",
  }),
  nl: createOnboardingAcquisitionSourceText({
    title: "Waar heb je over ons gehoord?",
    friendOrFamily: "Vrienden of familie",
    other: "Anders",
    x: "X (voorheen Twitter)",
  }),
  pa: createOnboardingAcquisitionSourceText({
    title: "ਤੁਸੀਂ ਸਾਡੇ ਬਾਰੇ ਕਿੱਥੋਂ ਸੁਣਿਆ?",
    friendOrFamily: "ਦੋਸਤ ਜਾਂ ਪਰਿਵਾਰ",
    other: "ਹੋਰ",
    x: "X (ਪਹਿਲਾਂ Twitter)",
  }),
  pl: createOnboardingAcquisitionSourceText({
    title: "Skąd się o nas dowiedziałeś?",
    friendOrFamily: "Znajomi lub rodzina",
    other: "Inne",
    x: "X (dawniej Twitter)",
  }),
  pt: createOnboardingAcquisitionSourceText({
    title: "Onde ouviu falar de nós?",
    friendOrFamily: "Amigos ou família",
    other: "Outro",
    x: "X (antigo Twitter)",
  }),
  ptBr: createOnboardingAcquisitionSourceText({
    title: "Onde você ouviu falar de nós?",
    friendOrFamily: "Amigos ou família",
    other: "Outro",
    x: "X (antigo Twitter)",
  }),
  rm: createOnboardingAcquisitionSourceText({
    title: "Nua avais vus udì da nus?",
    friendOrFamily: "Amis u famiglia",
    other: "Auter",
    x: "X (pli baud Twitter)",
  }),
  ro: createOnboardingAcquisitionSourceText({
    title: "Unde ați auzit de noi?",
    friendOrFamily: "Prieteni sau familie",
    other: "Altceva",
    x: "X (fost Twitter)",
  }),
  ru: createOnboardingAcquisitionSourceText({
    title: "Где вы о нас узнали?",
    friendOrFamily: "Друзья или семья",
    other: "Другое",
    x: "X (ранее Twitter)",
  }),
  si: createOnboardingAcquisitionSourceText({
    title: "අප ගැන ඔබ දැනගත්තේ කොහෙන්ද?",
    friendOrFamily: "මිතුරන් හෝ පවුල",
    other: "වෙනත්",
    x: "X (කලින් Twitter)",
  }),
  sk: createOnboardingAcquisitionSourceText({
    title: "Kde ste sa o nás dozvedeli?",
    friendOrFamily: "Priatelia alebo rodina",
    other: "Iné",
    x: "X (predtým Twitter)",
  }),
  sl: createOnboardingAcquisitionSourceText({
    title: "Kje ste slišali za nas?",
    friendOrFamily: "Prijatelji ali družina",
    other: "Drugo",
    x: "X (prej Twitter)",
  }),
  sq: createOnboardingAcquisitionSourceText({
    title: "Ku dëgjuat për ne?",
    friendOrFamily: "Miq ose familje",
    other: "Tjetër",
    x: "X (më parë Twitter)",
  }),
  sr: createOnboardingAcquisitionSourceText({
    title: "Где сте чули за нас?",
    friendOrFamily: "Пријатељи или породица",
    other: "Друго",
    x: "X (раније Twitter)",
  }),
  sv: createOnboardingAcquisitionSourceText({
    title: "Var hörde du talas om oss?",
    friendOrFamily: "Vänner eller familj",
    other: "Annat",
    x: "X (tidigare Twitter)",
  }),
  sw: createOnboardingAcquisitionSourceText({
    title: "Ulisikia kutuhusu wapi?",
    friendOrFamily: "Rafiki au familia",
    other: "Nyingine",
    x: "X (zamani Twitter)",
  }),
  ta: createOnboardingAcquisitionSourceText({
    title: "எங்களை பற்றி எங்கே கேட்டீர்கள்?",
    friendOrFamily: "நண்பர் அல்லது குடும்பம்",
    other: "மற்றவை",
    x: "X (முன்பு Twitter)",
  }),
  te: createOnboardingAcquisitionSourceText({
    title: "మా గురించి మీరు ఎక్కడ విన్నారు?",
    friendOrFamily: "స్నేహితుడు లేదా కుటుంబం",
    other: "ఇతర",
    x: "X (మునుపు Twitter)",
  }),
  th: createOnboardingAcquisitionSourceText({
    title: "คุณได้ยินเกี่ยวกับเราจากที่ไหน?",
    friendOrFamily: "เพื่อนหรือครอบครัว",
    other: "อื่นๆ",
    x: "X (เดิมคือ Twitter)",
  }),
  tr: createOnboardingAcquisitionSourceText({
    title: "Bizi nereden duydunuz?",
    friendOrFamily: "Arkadaş veya aile",
    other: "Diğer",
    x: "X (eski adıyla Twitter)",
  }),
  uk: createOnboardingAcquisitionSourceText({
    title: "Де ви про нас дізналися?",
    friendOrFamily: "Друзі або родина",
    other: "Інше",
    x: "X (раніше Twitter)",
  }),
  ur: createOnboardingAcquisitionSourceText({
    title: "آپ نے ہمارے بارے میں کہاں سنا؟",
    friendOrFamily: "دوست یا خاندان",
    other: "دیگر",
    x: "X (پہلے Twitter)",
  }),
  vi: createOnboardingAcquisitionSourceText({
    title: "Bạn nghe về chúng tôi ở đâu?",
    friendOrFamily: "Bạn bè hoặc gia đình",
    other: "Khác",
    x: "X (trước đây là Twitter)",
  }),
  zhHans: createOnboardingAcquisitionSourceText({
    title: "你是从哪里听说我们的？",
    friendOrFamily: "朋友或家人",
    other: "其他",
    x: "X（前 Twitter）",
  }),
  zhHant: createOnboardingAcquisitionSourceText({
    title: "你是從哪裡聽說我們的？",
    friendOrFamily: "朋友或家人",
    other: "其他",
    x: "X（前 Twitter）",
  }),
  zu: createOnboardingAcquisitionSourceText({
    title: "Uzwe ngathi kuphi?",
    friendOrFamily: "Umngane noma umndeni",
    other: "Okunye",
    x: "X (eyayiyi-Twitter)",
  }),
} satisfies Record<PaywallTextLocale, OnboardingAcquisitionSourceText>;

export const ONBOARDING_ACQUISITION_SOURCE_TEXT =
  ONBOARDING_ACQUISITION_SOURCE_TEXT_BY_LOCALE;

export const getDefaultOnboardingAcquisitionSourceText = (
  locale?: string,
): OnboardingAcquisitionSourceText => {
  return ONBOARDING_ACQUISITION_SOURCE_TEXT_BY_LOCALE[
    resolvePaywallTextLocale(locale)
  ];
};
