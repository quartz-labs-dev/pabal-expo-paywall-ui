import {
  getDefaultPaywallCopy,
  resolvePaywallTextLocale,
  type LimitedTimeOfferCopy,
  type LimitedTimeOfferCountdownParts,
} from "pabal-expo-paywall-ui";

import type { PlaygroundLocale } from "../types/playground";

interface LimitedTimeOfferPreviewText {
  alternativePlansTitle: string;
  annualSelectedDescription: string;
  annualPurchaseButton: string;
  badgeText: string;
  billingDisclosure: string;
  collapseAlternativePlansButton: string;
  collapseFeaturesLabel: string;
  countdownLabel: string;
  expandFeaturesLabel: string;
  monthlySelectedDescription: string;
  monthlyPurchaseButton: string;
  purchaseButton: string;
  subtitle: string;
  title: string;
  viewAllPlansButton: string;
}

const offerTextByLocale = {
  de: {
    alternativePlansTitle: "Weitere Pro-Tarife",
    annualSelectedDescription: "58 % günstiger als zwölf Monatszahlungen.",
    annualPurchaseButton: "Jahresabo starten",
    badgeText: "24-STUNDEN-SONDERANGEBOT",
    billingDisclosure: "Einmal zahlen, Pro dauerhaft nutzen. Kein Abo.",
    collapseAlternativePlansButton: "Monats- und Jahresabo ausblenden",
    collapseFeaturesLabel: "Weniger Funktionen anzeigen",
    countdownLabel: "Dein Sonderpreis endet in",
    expandFeaturesLabel: "5 weitere Funktionen anzeigen",
    monthlySelectedDescription: "Flexibel Monat für Monat nutzen.",
    monthlyPurchaseButton: "Monatsabo starten",
    purchaseButton: "Lifetime Pro zum Sonderpreis sichern",
    subtitle:
      "Dieser einmalige Sonderpreis verschwindet, sobald der Timer abläuft.",
    title: "Nur jetzt: Pro dauerhaft zum Sonderpreis",
    viewAllPlansButton: "Monats- und Jahresabo anzeigen",
  },
  en: {
    alternativePlansTitle: "Other Pro plans",
    annualSelectedDescription: "58% less than paying month by month.",
    annualPurchaseButton: "Start Yearly Pro",
    badgeText: "24-HOUR SPECIAL DEAL",
    billingDisclosure: "Pay once and enjoy Pro forever. No subscription.",
    collapseAlternativePlansButton: "Hide monthly and yearly subscriptions",
    collapseFeaturesLabel: "Show fewer features",
    countdownLabel: "Your special price ends in",
    expandFeaturesLabel: "Show 5 more features",
    monthlySelectedDescription: "Flexible access, one month at a time.",
    monthlyPurchaseButton: "Start Monthly Pro",
    purchaseButton: "Unlock Lifetime Pro at the special price",
    subtitle:
      "A one-time special price that disappears when this timer ends.",
    title: "One payment. Pro forever.",
    viewAllPlansButton: "View monthly and yearly subscriptions",
  },
  es: {
    alternativePlansTitle: "Otros planes Pro",
    annualSelectedDescription: "Un 58 % menos que pagar mes a mes.",
    annualPurchaseButton: "Empezar Pro anual",
    badgeText: "OFERTA ESPECIAL DE 24 HORAS",
    billingDisclosure: "Paga una vez y disfruta Pro para siempre. Sin suscripción.",
    collapseAlternativePlansButton: "Ocultar suscripciones mensual y anual",
    collapseFeaturesLabel: "Mostrar menos funciones",
    countdownLabel: "Tu precio especial termina en",
    expandFeaturesLabel: "Mostrar 5 funciones más",
    monthlySelectedDescription: "Acceso flexible, mes a mes.",
    monthlyPurchaseButton: "Empezar Pro mensual",
    purchaseButton: "Obtener Pro de por vida al precio especial",
    subtitle:
      "Un precio especial único que desaparece cuando termina el contador.",
    title: "Solo ahora: Pro de por vida a precio especial",
    viewAllPlansButton: "Ver suscripciones mensual y anual",
  },
  fr: {
    alternativePlansTitle: "Autres offres Pro",
    annualSelectedDescription: "58 % moins cher qu’un paiement mensuel.",
    annualPurchaseButton: "Commencer Pro annuel",
    badgeText: "OFFRE SPÉCIALE 24 H",
    billingDisclosure: "Payez une fois et profitez de Pro à vie. Sans abonnement.",
    collapseAlternativePlansButton: "Masquer les abonnements mensuel et annuel",
    collapseFeaturesLabel: "Afficher moins de fonctionnalités",
    countdownLabel: "Votre prix spécial expire dans",
    expandFeaturesLabel: "Afficher 5 fonctionnalités de plus",
    monthlySelectedDescription: "Un accès flexible, mois après mois.",
    monthlyPurchaseButton: "Commencer Pro mensuel",
    purchaseButton: "Obtenir Pro à vie au prix spécial",
    subtitle:
      "Un prix spécial unique qui disparaît à la fin du compte à rebours.",
    title: "Maintenant seulement : Pro à vie à prix spécial",
    viewAllPlansButton: "Voir les abonnements mensuel et annuel",
  },
  it: {
    alternativePlansTitle: "Altri piani Pro",
    annualSelectedDescription: "Il 58% in meno rispetto al pagamento mensile.",
    annualPurchaseButton: "Inizia Pro annuale",
    badgeText: "OFFERTA SPECIALE DI 24 ORE",
    billingDisclosure: "Paga una volta e usa Pro per sempre. Nessun abbonamento.",
    collapseAlternativePlansButton: "Nascondi gli abbonamenti mensile e annuale",
    collapseFeaturesLabel: "Mostra meno funzionalità",
    countdownLabel: "Il prezzo speciale termina tra",
    expandFeaturesLabel: "Mostra altre 5 funzionalità",
    monthlySelectedDescription: "Accesso flessibile, mese per mese.",
    monthlyPurchaseButton: "Inizia Pro mensile",
    purchaseButton: "Ottieni Pro a vita al prezzo speciale",
    subtitle:
      "Un prezzo speciale unico che scompare allo scadere del timer.",
    title: "Solo ora: Pro a vita al prezzo speciale",
    viewAllPlansButton: "Vedi gli abbonamenti mensile e annuale",
  },
  ja: {
    alternativePlansTitle: "その他のProプラン",
    annualSelectedDescription: "月払いを12回続けるより58%お得です。",
    annualPurchaseButton: "年間Proを始める",
    badgeText: "24時間限定スペシャルセール",
    billingDisclosure: "一度の支払いでProを永久に利用できます。サブスクではありません。",
    collapseAlternativePlansButton: "月間・年間プランを閉じる",
    collapseFeaturesLabel: "機能を閉じる",
    countdownLabel: "特別価格の終了まで",
    expandFeaturesLabel: "さらに5個の機能を見る",
    monthlySelectedDescription: "必要な月だけ柔軟に利用できます。",
    monthlyPurchaseButton: "月間Proを始める",
    purchaseButton: "特別価格で永久版Proを入手",
    subtitle: "タイマーが終了すると消える、一度限りの特別価格です。",
    title: "今だけ、永久版Proを特別価格で",
    viewAllPlansButton: "月間・年間プランを見る",
  },
  ko: {
    alternativePlansTitle: "다른 Pro 플랜",
    annualSelectedDescription: "월간 결제를 12번 하는 것보다 58% 저렴해요.",
    annualPurchaseButton: "연간 Pro 시작하기",
    badgeText: "24시간 스페셜 타임딜",
    billingDisclosure: "한 번만 결제하고 평생 이용해요. 구독이 아니에요.",
    collapseAlternativePlansButton: "월간·연간 구독 접기",
    collapseFeaturesLabel: "기능 접기",
    countdownLabel: "특별 가격 종료까지",
    expandFeaturesLabel: "기능 5개 더 보기",
    monthlySelectedDescription: "필요한 기간만 한 달씩 부담 없이 이용해요.",
    monthlyPurchaseButton: "월간 Pro 시작하기",
    purchaseButton: "특별가로 평생 Pro 시작하기",
    subtitle: "타이머가 끝나면 사라지는 단 한 번의 특별 가격이에요.",
    title: "지금만, 평생 Pro 특별가",
    viewAllPlansButton: "월간·연간 구독 보기",
  },
  ptBr: {
    alternativePlansTitle: "Outros planos Pro",
    annualSelectedDescription: "58% mais barato do que pagar mês a mês.",
    annualPurchaseButton: "Iniciar Pro anual",
    badgeText: "OFERTA ESPECIAL DE 24 HORAS",
    billingDisclosure: "Pague uma vez e use o Pro para sempre. Sem assinatura.",
    collapseAlternativePlansButton: "Ocultar assinaturas mensal e anual",
    collapseFeaturesLabel: "Mostrar menos recursos",
    countdownLabel: "Seu preço especial termina em",
    expandFeaturesLabel: "Mostrar mais 5 recursos",
    monthlySelectedDescription: "Acesso flexível, mês a mês.",
    monthlyPurchaseButton: "Iniciar Pro mensal",
    purchaseButton: "Obter Pro vitalício pelo preço especial",
    subtitle:
      "Um preço especial único que desaparece quando o cronômetro termina.",
    title: "Só agora: Pro vitalício pelo preço especial",
    viewAllPlansButton: "Ver assinaturas mensal e anual",
  },
  zhHans: {
    alternativePlansTitle: "其他 Pro 方案",
    annualSelectedDescription: "比连续按月付费便宜 58%。",
    annualPurchaseButton: "开始使用年度 Pro",
    badgeText: "24 小时专属特惠",
    billingDisclosure: "一次付款，永久使用 Pro。无需订阅。",
    collapseAlternativePlansButton: "收起月度和年度订阅",
    collapseFeaturesLabel: "收起功能",
    countdownLabel: "专属价格剩余时间",
    expandFeaturesLabel: "再看 5 项功能",
    monthlySelectedDescription: "按月灵活使用，需要多久就用多久。",
    monthlyPurchaseButton: "开始使用月度 Pro",
    purchaseButton: "以特惠价解锁终身 Pro",
    subtitle: "倒计时结束后即消失的一次性专属价格。",
    title: "仅限此刻：终身 Pro 专属价",
    viewAllPlansButton: "查看月度和年度订阅",
  },
  zhHant: {
    alternativePlansTitle: "其他 Pro 方案",
    annualSelectedDescription: "比連續按月付款便宜 58%。",
    annualPurchaseButton: "開始使用年度 Pro",
    badgeText: "24 小時專屬優惠",
    billingDisclosure: "一次付款，永久使用 Pro。無需訂閱。",
    collapseAlternativePlansButton: "收起月費與年費訂閱",
    collapseFeaturesLabel: "收起功能",
    countdownLabel: "專屬價格剩餘時間",
    expandFeaturesLabel: "再看 5 項功能",
    monthlySelectedDescription: "按月彈性使用，需要多久就用多久。",
    monthlyPurchaseButton: "開始使用月費 Pro",
    purchaseButton: "以優惠價解鎖終身 Pro",
    subtitle: "倒數結束後即消失的一次性專屬價格。",
    title: "僅限此刻：終身 Pro 專屬價",
    viewAllPlansButton: "查看月費與年費訂閱",
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
  const extendedPaywallCopy = paywallCopy as typeof paywallCopy & {
    reviewSectionTitle?: string;
  };
  const copy: LimitedTimeOfferCopy = {
    ...offerText,
    closeButtonAccessibilityLabel: paywallCopy.closeButtonAccessibilityLabel,
    formatRemainingTime,
    legalPrefix: paywallCopy.legalPrefix,
    privacyText: paywallCopy.privacyText,
    purchaseButtonByPeriod: {
      annual: offerText.annualPurchaseButton,
      lifetime: offerText.purchaseButton,
      monthly: offerText.monthlyPurchaseButton,
    },
    purchasingButton: paywallCopy.purchasingButton,
    reviewSectionTitle: extendedPaywallCopy.reviewSectionTitle,
    restoreButton: paywallCopy.restoreButton,
    supportMessage: paywallCopy.supportMessage,
    supportMessageLabel: paywallCopy.supportMessageLabel,
    termsText: paywallCopy.termsText,
  };

  return {
    annualSelectedDescription: offerText.annualSelectedDescription,
    billingDisclosure: offerText.billingDisclosure,
    collapseFeaturesLabel: offerText.collapseFeaturesLabel,
    copy,
    expandFeaturesLabel: offerText.expandFeaturesLabel,
    monthlySelectedDescription: offerText.monthlySelectedDescription,
  };
};
