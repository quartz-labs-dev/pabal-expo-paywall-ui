import {
  getDefaultLimitedTimeOfferCopy,
  resolvePaywallTextLocale,
  type LimitedTimeOfferCopy,
  type LimitedTimeOfferCountdownParts,
  type PaywallPlan,
} from "pabal-expo-paywall-ui";

import type { PlaygroundLocale } from "../types/playground";

interface LimitedTimeOfferPreviewText {
  lifetimeSelectedDescription: string;
  annualSelectedDescription: string;
  badgeText: string;
  billingDisclosure: string;
  collapseFeaturesLabel: string;
  countdownLabel: string;
  expandFeaturesLabel: string;
  monthlySelectedDescription: string;
  subtitle: string;
  title: string;
}

const offerTextByLocale = {
  de: {
    annualSelectedDescription: "Für {monthlyPrice} im Monat, statt einer Tasse Kaffee.",
    lifetimeSelectedDescription: "Statt ein paar Tassen Kaffee: einmal {price} für Pro auf Lebenszeit.",
    badgeText: "24-STUNDEN-SONDERANGEBOT",
    billingDisclosure: "Einmal zahlen, Pro dauerhaft nutzen. Kein Abo.",
    collapseFeaturesLabel: "Weniger Funktionen anzeigen",
    countdownLabel: "Dein Sonderpreis endet in",
    expandFeaturesLabel: "5 weitere Funktionen anzeigen",
    monthlySelectedDescription: "Statt einer Tasse Kaffee: Pro für {price} im Monat.",
    subtitle:
      "Dieser einmalige Sonderpreis verschwindet, sobald der Timer abläuft.",
    title: "Nur jetzt: Pro dauerhaft zum Sonderpreis",
  },
  en: {
    annualSelectedDescription: "{monthlyPrice} each month, instead of a cup of coffee.",
    lifetimeSelectedDescription: "Swap a few coffees for lifetime Pro with one {price} payment.",
    badgeText: "24-HOUR SPECIAL DEAL",
    billingDisclosure: "Pay once and enjoy Pro forever. No subscription.",
    collapseFeaturesLabel: "Show fewer features",
    countdownLabel: "Your special price ends in",
    expandFeaturesLabel: "Show 5 more features",
    monthlySelectedDescription: "Swap a cup of coffee for Pro at {price} a month.",
    subtitle:
      "A one-time special price that disappears when this timer ends.",
    title: "One payment. Pro forever.",
  },
  es: {
    annualSelectedDescription: "{monthlyPrice} al mes, en lugar de un café.",
    lifetimeSelectedDescription: "Cambia unos cafés por Pro de por vida con un pago de {price}.",
    badgeText: "OFERTA ESPECIAL DE 24 HORAS",
    billingDisclosure: "Paga una vez y disfruta Pro para siempre. Sin suscripción.",
    collapseFeaturesLabel: "Mostrar menos funciones",
    countdownLabel: "Tu precio especial termina en",
    expandFeaturesLabel: "Mostrar 5 funciones más",
    monthlySelectedDescription: "Cambia un café por Pro a {price} al mes.",
    subtitle:
      "Un precio especial único que desaparece cuando termina el contador.",
    title: "Solo ahora: Pro de por vida a precio especial",
  },
  fr: {
    annualSelectedDescription: "{monthlyPrice} par mois, à la place d’un café.",
    lifetimeSelectedDescription: "Quelques cafés de moins, Pro à vie pour un paiement de {price}.",
    badgeText: "OFFRE SPÉCIALE 24 H",
    billingDisclosure: "Payez une fois et profitez de Pro à vie. Sans abonnement.",
    collapseFeaturesLabel: "Afficher moins de fonctionnalités",
    countdownLabel: "Votre prix spécial expire dans",
    expandFeaturesLabel: "Afficher 5 fonctionnalités de plus",
    monthlySelectedDescription: "Un café de moins, Pro pour {price} par mois.",
    subtitle:
      "Un prix spécial unique qui disparaît à la fin du compte à rebours.",
    title: "Maintenant seulement : Pro à vie à prix spécial",
  },
  it: {
    annualSelectedDescription: "{monthlyPrice} al mese, al posto di un caffè.",
    lifetimeSelectedDescription: "Qualche caffè in meno, Pro a vita con un pagamento di {price}.",
    badgeText: "OFFERTA SPECIALE DI 24 ORE",
    billingDisclosure: "Paga una volta e usa Pro per sempre. Nessun abbonamento.",
    collapseFeaturesLabel: "Mostra meno funzionalità",
    countdownLabel: "Il prezzo speciale termina tra",
    expandFeaturesLabel: "Mostra altre 5 funzionalità",
    monthlySelectedDescription: "Scegli Pro al posto di un caffè, per {price} al mese.",
    subtitle:
      "Un prezzo speciale unico che scompare allo scadere del timer.",
    title: "Solo ora: Pro a vita al prezzo speciale",
  },
  ja: {
    annualSelectedDescription: "コーヒー1杯の代わりに、{monthlyPrice}でProを。",
    lifetimeSelectedDescription: "コーヒー数杯の代わりに、{price}の一度の支払いでProを永久に。",
    badgeText: "24時間限定スペシャルセール",
    billingDisclosure: "一度の支払いでProを永久に利用できます。サブスクではありません。",
    collapseFeaturesLabel: "機能を閉じる",
    countdownLabel: "特別価格の終了まで",
    expandFeaturesLabel: "さらに5個の機能を見る",
    monthlySelectedDescription: "コーヒー1杯の代わりに、月{price}でProを。",
    subtitle: "タイマーが終了すると消える、一度限りの特別価格です。",
    title: "今だけ、永久版Proを特別価格で",
  },
  ko: {
    annualSelectedDescription: "매달 커피 한 잔 대신, {monthlyPrice}로 Pro를 이용해요.",
    lifetimeSelectedDescription: "커피 몇 잔 대신, {price} 한 번 결제로 평생 Pro를 이용해요.",
    badgeText: "24시간 스페셜 타임딜",
    billingDisclosure: "한 번만 결제하고 평생 이용해요. 구독이 아니에요.",
    collapseFeaturesLabel: "기능 접기",
    countdownLabel: "특별 가격 종료까지",
    expandFeaturesLabel: "기능 5개 더 보기",
    monthlySelectedDescription: "커피 한 잔 대신, 월 {price}로 Pro를 이용해요.",
    subtitle: "타이머가 끝나면 사라지는 단 한 번의 특별 가격이에요.",
    title: "지금만, 평생 Pro 특별가",
  },
  ptBr: {
    annualSelectedDescription: "{monthlyPrice} por mês, em vez de um café.",
    lifetimeSelectedDescription: "Troque alguns cafés por Pro vitalício com um pagamento de {price}.",
    badgeText: "OFERTA ESPECIAL DE 24 HORAS",
    billingDisclosure: "Pague uma vez e use o Pro para sempre. Sem assinatura.",
    collapseFeaturesLabel: "Mostrar menos recursos",
    countdownLabel: "Seu preço especial termina em",
    expandFeaturesLabel: "Mostrar mais 5 recursos",
    monthlySelectedDescription: "Troque um café por Pro a {price} por mês.",
    subtitle:
      "Um preço especial único que desaparece quando o cronômetro termina.",
    title: "Só agora: Pro vitalício pelo preço especial",
  },
  zhHans: {
    annualSelectedDescription: "用一杯咖啡的预算，以{monthlyPrice}享用 Pro。",
    lifetimeSelectedDescription: "用几杯咖啡的预算，一次支付 {price}，终身享用 Pro。",
    badgeText: "24 小时专属特惠",
    billingDisclosure: "一次付款，永久使用 Pro。无需订阅。",
    collapseFeaturesLabel: "收起功能",
    countdownLabel: "专属价格剩余时间",
    expandFeaturesLabel: "再看 5 项功能",
    monthlySelectedDescription: "用一杯咖啡的预算，每月 {price} 享用 Pro。",
    subtitle: "倒计时结束后即消失的一次性专属价格。",
    title: "仅限此刻：终身 Pro 专属价",
  },
  zhHant: {
    annualSelectedDescription: "用一杯咖啡的預算，以{monthlyPrice}享用 Pro。",
    lifetimeSelectedDescription: "用幾杯咖啡的預算，一次支付 {price}，終身享用 Pro。",
    badgeText: "24 小時專屬優惠",
    billingDisclosure: "一次付款，永久使用 Pro。無需訂閱。",
    collapseFeaturesLabel: "收起功能",
    countdownLabel: "專屬價格剩餘時間",
    expandFeaturesLabel: "再看 5 項功能",
    monthlySelectedDescription: "用一杯咖啡的預算，每月 {price} 享用 Pro。",
    subtitle: "倒數結束後即消失的一次性專屬價格。",
    title: "僅限此刻：終身 Pro 專屬價",
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
  const copy: LimitedTimeOfferCopy = getDefaultLimitedTimeOfferCopy(locale, {
    badgeText: offerText.badgeText,
    countdownLabel: offerText.countdownLabel,
    subtitle: offerText.subtitle,
    formatRemainingTime,
  });

  return {
    getSelectedDescription: (plan: PaywallPlan): string | undefined => {
      const template = plan.period === "lifetime"
        ? offerText.lifetimeSelectedDescription
        : plan.period === "annual"
          ? offerText.annualSelectedDescription
          : plan.period === "monthly"
            ? offerText.monthlySelectedDescription
            : undefined;
      return template
        ?.replace("{monthlyPrice}", plan.monthlyPriceText ?? plan.priceText)
        .replace("{price}", plan.priceText);
    },
    billingDisclosure: offerText.billingDisclosure,
    collapseFeaturesLabel: offerText.collapseFeaturesLabel,
    copy,
    expandFeaturesLabel: offerText.expandFeaturesLabel,
  };
};
