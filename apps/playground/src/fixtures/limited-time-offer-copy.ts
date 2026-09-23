import {
  getDefaultPaywallCopy,
  resolvePaywallTextLocale,
  type LimitedTimeOfferCopy,
  type LimitedTimeOfferCountdownParts,
} from "pabal-expo-paywall-ui";

import type { PlaygroundLocale } from "../types/playground";

interface LimitedTimeOfferPreviewText {
  badgeText: string;
  billingDisclosure: string;
  countdownLabel: string;
  purchaseButton: string;
  subtitle: string;
  title: string;
  viewAllPlansButton: string;
}

const offerTextByLocale = {
  de: {
    badgeText: "24-STUNDEN-SONDERANGEBOT",
    billingDisclosure: "Einmal zahlen, Pro dauerhaft nutzen. Kein Abo.",
    countdownLabel: "Dein Sonderpreis endet in",
    purchaseButton: "Lifetime Pro zum Sonderpreis sichern",
    subtitle:
      "Dieser einmalige Sonderpreis verschwindet, sobald der Timer abläuft.",
    title: "Nur jetzt: Pro dauerhaft zum Sonderpreis",
    viewAllPlansButton: "Alle Tarife anzeigen",
  },
  en: {
    badgeText: "24-HOUR SPECIAL DEAL",
    billingDisclosure: "Pay once and enjoy Pro forever. No subscription.",
    countdownLabel: "Your special price ends in",
    purchaseButton: "Unlock Lifetime Pro at the special price",
    subtitle:
      "A one-time special price that disappears when this timer ends.",
    title: "One payment. Pro forever.",
    viewAllPlansButton: "View all plans",
  },
  es: {
    badgeText: "OFERTA ESPECIAL DE 24 HORAS",
    billingDisclosure: "Paga una vez y disfruta Pro para siempre. Sin suscripción.",
    countdownLabel: "Tu precio especial termina en",
    purchaseButton: "Obtener Pro de por vida al precio especial",
    subtitle:
      "Un precio especial único que desaparece cuando termina el contador.",
    title: "Solo ahora: Pro de por vida a precio especial",
    viewAllPlansButton: "Ver todos los planes",
  },
  fr: {
    badgeText: "OFFRE SPÉCIALE 24 H",
    billingDisclosure: "Payez une fois et profitez de Pro à vie. Sans abonnement.",
    countdownLabel: "Votre prix spécial expire dans",
    purchaseButton: "Obtenir Pro à vie au prix spécial",
    subtitle:
      "Un prix spécial unique qui disparaît à la fin du compte à rebours.",
    title: "Maintenant seulement : Pro à vie à prix spécial",
    viewAllPlansButton: "Voir toutes les offres",
  },
  it: {
    badgeText: "OFFERTA SPECIALE DI 24 ORE",
    billingDisclosure: "Paga una volta e usa Pro per sempre. Nessun abbonamento.",
    countdownLabel: "Il prezzo speciale termina tra",
    purchaseButton: "Ottieni Pro a vita al prezzo speciale",
    subtitle:
      "Un prezzo speciale unico che scompare allo scadere del timer.",
    title: "Solo ora: Pro a vita al prezzo speciale",
    viewAllPlansButton: "Vedi tutti i piani",
  },
  ja: {
    badgeText: "24時間限定スペシャルセール",
    billingDisclosure: "一度の支払いでProを永久に利用できます。サブスクではありません。",
    countdownLabel: "特別価格の終了まで",
    purchaseButton: "特別価格で永久版Proを入手",
    subtitle: "タイマーが終了すると消える、一度限りの特別価格です。",
    title: "今だけ、永久版Proを特別価格で",
    viewAllPlansButton: "すべてのプランを見る",
  },
  ko: {
    badgeText: "24시간 스페셜 타임딜",
    billingDisclosure: "한 번만 결제하고 평생 이용해요. 구독이 아니에요.",
    countdownLabel: "특별 가격 종료까지",
    purchaseButton: "특별가로 평생 Pro 시작하기",
    subtitle: "타이머가 끝나면 사라지는 단 한 번의 특별 가격이에요.",
    title: "지금만, 평생 Pro 특별가",
    viewAllPlansButton: "모든 플랜 보기",
  },
  ptBr: {
    badgeText: "OFERTA ESPECIAL DE 24 HORAS",
    billingDisclosure: "Pague uma vez e use o Pro para sempre. Sem assinatura.",
    countdownLabel: "Seu preço especial termina em",
    purchaseButton: "Obter Pro vitalício pelo preço especial",
    subtitle:
      "Um preço especial único que desaparece quando o cronômetro termina.",
    title: "Só agora: Pro vitalício pelo preço especial",
    viewAllPlansButton: "Ver todos os planos",
  },
  zhHans: {
    badgeText: "24 小时专属特惠",
    billingDisclosure: "一次付款，永久使用 Pro。无需订阅。",
    countdownLabel: "专属价格剩余时间",
    purchaseButton: "以特惠价解锁终身 Pro",
    subtitle: "倒计时结束后即消失的一次性专属价格。",
    title: "仅限此刻：终身 Pro 专属价",
    viewAllPlansButton: "查看所有方案",
  },
  zhHant: {
    badgeText: "24 小時專屬優惠",
    billingDisclosure: "一次付款，永久使用 Pro。無需訂閱。",
    countdownLabel: "專屬價格剩餘時間",
    purchaseButton: "以優惠價解鎖終身 Pro",
    subtitle: "倒數結束後即消失的一次性專屬價格。",
    title: "僅限此刻：終身 Pro 專屬價",
    viewAllPlansButton: "查看所有方案",
  },
} satisfies Record<string, LimitedTimeOfferPreviewText>;

const formatRemainingTime = ({
  hours,
  minutes,
  seconds,
}: LimitedTimeOfferCountdownParts): string =>
  `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

export const getLimitedTimeOfferPreview = (locale: PlaygroundLocale) => {
  const resolvedLocale = resolvePaywallTextLocale(locale);
  const offerText =
    offerTextByLocale[resolvedLocale as keyof typeof offerTextByLocale] ??
    offerTextByLocale.en;
  const paywallCopy = getDefaultPaywallCopy(locale, { title: offerText.title });
  const copy: LimitedTimeOfferCopy = {
    ...offerText,
    closeButtonAccessibilityLabel: paywallCopy.closeButtonAccessibilityLabel,
    formatRemainingTime,
    privacyText: paywallCopy.privacyText,
    purchasingButton: paywallCopy.purchasingButton,
    restoreButton: paywallCopy.restoreButton,
    termsText: paywallCopy.termsText,
  };

  return {
    billingDisclosure: offerText.billingDisclosure,
    copy,
  };
};
