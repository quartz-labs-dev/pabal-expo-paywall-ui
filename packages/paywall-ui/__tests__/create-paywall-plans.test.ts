import {
  createPaywallPlans,
  getDefaultSelectedPlanId,
} from "../src/create-paywall-plans";
import {
  PAYWALL_TEXT_LOCALES,
  getDefaultPaywallCopy,
  getDefaultPaywallPlanOptions,
  getDefaultProfileIdentifiersCopy,
  getDefaultProfileSubscriptionCopy,
  resolvePaywallTextLocale,
} from "../src/localized-paywall-copy";
import { UNIFIED_LOCALES } from "../src/unified-locales";
import type { PurchasesPackageLike } from "../src/types";
import type {
  PaywallReviewSectionText,
  PaywallValueStepText,
} from "../src/locales/paywall";
import assert from "node:assert/strict";
import test from "node:test";

const makePackage = (
  identifier: string,
  price: number,
  priceString: string,
  productOverrides: Partial<PurchasesPackageLike["product"]> = {},
): PurchasesPackageLike => ({
  identifier,
  product: {
    price,
    priceString,
    description: `${identifier} description`,
    ...productOverrides,
  },
});

test("keeps monthly, annual, and lifetime packages by default", () => {
  const plans = createPaywallPlans([
    makePackage("$rc_monthly", 4.99, "$4.99"),
    makePackage("$rc_annual", 29.99, "$29.99"),
    makePackage("$rc_lifetime", 99.99, "$99.99"),
  ]);

  assert.deepEqual(plans.map((plan) => plan.id), [
    "$rc_annual",
    "$rc_lifetime",
    "$rc_monthly",
  ]);
});

test("marks annual as recommended by default", () => {
  const plans = createPaywallPlans([
    makePackage("$rc_monthly", 4.99, "$4.99"),
    makePackage("$rc_annual", 29.99, "$29.99"),
  ]);

  assert.equal(
    plans.find((plan) => plan.period === "annual")?.isRecommended,
    true,
  );
  assert.equal(getDefaultSelectedPlanId(plans), "$rc_annual");
});

test("falls back to the first available plan when recommended period is missing", () => {
  const plans = createPaywallPlans([makePackage("$rc_monthly", 4.99, "$4.99")]);

  assert.equal(getDefaultSelectedPlanId(plans), "$rc_monthly");
});

test("preserves the raw package for app-owned purchase callbacks", () => {
  const monthlyPackage = makePackage("$rc_monthly", 4.99, "$4.99");
  const plans = createPaywallPlans([monthlyPackage]);

  assert.equal(plans[0]?.rawPackage, monthlyPackage);
});

test("supports app-specific package identifiers", () => {
  const plans = createPaywallPlans(
    [
      makePackage("monthly-pro", 6.99, "$6.99"),
      makePackage("yearly-pro", 49.99, "$49.99"),
      makePackage("forever-pro", 99.99, "$99.99"),
    ],
    {
      annualPackageIds: ["yearly-pro"],
      lifetimePackageIds: ["forever-pro"],
      monthlyPackageIds: ["monthly-pro"],
    },
  );

  assert.deepEqual(plans.map((plan) => plan.period), [
    "annual",
    "lifetime",
    "monthly",
  ]);
});

test("supports a single lifetime package offering", () => {
  const plans = createPaywallPlans([makePackage("$rc_lifetime", 99.99, "$99.99")]);

  assert.deepEqual(plans.map((plan) => plan.period), ["lifetime"]);
  assert.equal(plans[0]?.title, "Lifetime");
  assert.equal(getDefaultSelectedPlanId(plans), "$rc_lifetime");
});

test("uses yearly as the default annual plan title", () => {
  const plans = createPaywallPlans([makePackage("$rc_annual", 29.99, "$29.99")]);

  assert.equal(plans[0]?.title, "Yearly");
});

test("supports custom lifetime plan copy", () => {
  const plans = createPaywallPlans(
    [
      makePackage("$rc_monthly", 10, "$10.00"),
      makePackage("$rc_lifetime", 149.99, "$149.99"),
    ],
    {
      lifetimeBadgeText: "One-time payment",
      lifetimeTitle: "Lifetime access",
    },
  );

  const lifetimePlan = plans.find((plan) => plan.period === "lifetime");

  assert.equal(lifetimePlan?.badgeText, "One-time payment");
  assert.equal(lifetimePlan?.title, "Lifetime access");
  assert.equal(lifetimePlan?.isRecommended, false);
  assert.equal(getDefaultSelectedPlanId(plans), "$rc_lifetime");
});

test("supports selected-only plan descriptions from app config", () => {
  const plans = createPaywallPlans(
    [
      makePackage("$rc_monthly", 4.99, "$4.99"),
      makePackage("$rc_annual", 29.99, "$29.99"),
      makePackage("$rc_lifetime", 99.99, "$99.99"),
    ],
    {
      annualSelectedDescription: "About 90% less than a guided aurora tour.",
      lifetimeSelectedDescription: "One payment, no renewal.",
      monthlySelectedDescription: "Flexible access without annual commitment.",
    },
  );

  assert.equal(
    plans.find((plan) => plan.period === "annual")?.selectedDescription,
    "About 90% less than a guided aurora tour.",
  );
  assert.equal(
    plans.find((plan) => plan.period === "lifetime")?.selectedDescription,
    "One payment, no renewal.",
  );
  assert.equal(
    plans.find((plan) => plan.period === "monthly")?.selectedDescription,
    "Flexible access without annual commitment.",
  );
});

test("formats high-value annual prices without cents", () => {
  const plans = createPaywallPlans([
    makePackage("$rc_annual", 49900, "KRW 49,900"),
  ]);

  assert.equal(plans[0]?.monthlyPriceText, "KRW 4,158 / mo");
});

test("adds annual discount text compared to monthly pricing", () => {
  const plans = createPaywallPlans([
    makePackage("$rc_monthly", 10, "$10.00"),
    makePackage("$rc_annual", 80, "$80.00"),
  ]);

  assert.equal(
    plans.find((plan) => plan.period === "annual")?.discountText,
    "Save 33%",
  );
  assert.equal(
    plans.find((plan) => plan.period === "annual")?.badgeText,
    "Save 33%",
  );
  assert.equal(
    plans.find((plan) => plan.period === "monthly")?.discountText,
    undefined,
  );
});

test("supports localized annual pricing copy", () => {
  const plans = createPaywallPlans(
    [
      makePackage("$rc_monthly", 10000, "KRW 10,000"),
      makePackage("$rc_annual", 80000, "KRW 80,000"),
    ],
    {
      formatDiscountText: (discountPercentage) => `${discountPercentage}% 할인`,
      formatMonthlyPriceText: (monthlyPriceText) => `월 ${monthlyPriceText}`,
    },
  );

  const annualPlan = plans.find((plan) => plan.period === "annual");

  assert.equal(annualPlan?.discountText, "33% 할인");
  assert.equal(annualPlan?.badgeText, "33% 할인");
  assert.equal(annualPlan?.monthlyPriceText, "월 KRW 6,667");
});

test("adds localized price-per-period copy for trial disclosures", () => {
  const plans = createPaywallPlans(
    [
      makePackage("$rc_monthly", 10000, "KRW 10,000"),
      makePackage("$rc_annual", 80000, "KRW 80,000"),
    ],
    getDefaultPaywallPlanOptions("ko-KR"),
  );

  assert.equal(
    plans.find((plan) => plan.period === "monthly")?.pricePerPeriodText,
    "KRW 10,000 / 월",
  );
  assert.equal(
    plans.find((plan) => plan.period === "annual")?.pricePerPeriodText,
    "KRW 80,000 / 년",
  );
});

test("uses product price-per-period copy when provided", () => {
  const plans = createPaywallPlans([
    makePackage("$rc_annual", 29.99, "$29.99", {
      price_per_period: "$29.99 per year",
    }),
  ]);

  assert.equal(plans[0]?.pricePerPeriodText, "$29.99 per year");
});

test("formats free-trial durations with singular and plural copy", () => {
  const enCopy = getDefaultPaywallCopy("en-US", { title: "Pro" });
  const koCopy = getDefaultPaywallCopy("ko-KR", { title: "Pro" });

  assert.equal(
    enCopy.formatTrialPriceDisclosure?.(
      { value: 1, unit: "day" },
      "$4.99 / month",
    ),
    "1 day free, then $4.99 / month",
  );
  assert.equal(
    enCopy.formatTrialPriceDisclosure?.(
      { value: 2, unit: "week" },
      "$29.99 / year",
    ),
    "2 weeks free, then $29.99 / year",
  );
  assert.equal(
    enCopy.formatTrialIncludedTitle?.({ value: 7, unit: "day" }),
    "7-Day Free Trial Included",
  );
  assert.equal(
    koCopy.formatTrialPriceDisclosure?.(
      { value: 2, unit: "week" },
      "KRW 80,000 / 년",
    ),
    "2주 무료, 이후 KRW 80,000 / 년",
  );
});

test("provides localized default plan copy from locale strings", () => {
  const plans = createPaywallPlans(
    [
      makePackage("$rc_monthly", 10000, "KRW 10,000"),
      makePackage("$rc_annual", 80000, "KRW 80,000"),
      makePackage("$rc_lifetime", 120000, "KRW 120,000"),
    ],
    getDefaultPaywallPlanOptions("ko-KR"),
  );

  const annualPlan = plans.find((plan) => plan.period === "annual");
  const lifetimePlan = plans.find((plan) => plan.period === "lifetime");

  assert.equal(resolvePaywallTextLocale("pt-BR"), "ptBr");
  assert.equal(resolvePaywallTextLocale("zh-Hant"), "zhHant");
  assert.equal(annualPlan?.title, "연간");
  assert.equal(annualPlan?.badgeText, "33% 할인");
  assert.equal(annualPlan?.monthlyPriceText, "월 KRW 6,667");
  assert.equal(lifetimePlan?.badgeText, "일회성 구매");
  assert.equal(
    getDefaultPaywallCopy("ko-KR", { title: "Pro" }).continueButton,
    "계속",
  );
});

test("keeps first-step next button copy package-owned", () => {
  const copy = getDefaultPaywallCopy("ko-KR", {
    title: "Pro",
    nextButton: "Custom",
    nextButtonAccessibilityLabel: "Custom accessibility label",
  } as Parameters<typeof getDefaultPaywallCopy>[1] & PaywallValueStepText);
  const valueStepCopy = copy as typeof copy & PaywallValueStepText;

  assert.equal(valueStepCopy.nextButton, "다음");
  assert.equal(
    valueStepCopy.nextButtonAccessibilityLabel,
    "요금제 선택으로 계속",
  );
});

test("keeps purchase-step review section title package-owned", () => {
  const copy = getDefaultPaywallCopy("ko-KR", {
    title: "Pro",
    reviewSectionTitle: "Custom reviews",
  } as Parameters<typeof getDefaultPaywallCopy>[1] & PaywallReviewSectionText);
  const reviewCopy = copy as typeof copy & PaywallReviewSectionText;

  assert.equal(reviewCopy.reviewSectionTitle, "사용자 리뷰");
});

test("provides localized support messages for paywall and profile", () => {
  const paywallCopy = getDefaultPaywallCopy("ko-KR", { title: "Pro" });
  const customPaywallCopy = getDefaultPaywallCopy("ko-KR", {
    title: "Pro",
    supportMessage: "Your subscription supports future updates.",
  });
  const profileCopy = getDefaultProfileSubscriptionCopy("ko-KR", {
    productName: "Pro",
  });

  assert.equal(
    paywallCopy.supportMessage,
    "유료 구독은 이 앱을 계속 만들고 개선하는 데 큰 도움이 됩니다. 구독하면 더 편한 기능, 안정적인 서비스, 꾸준한 업데이트를 먼저 누릴 수 있어요.",
  );
  assert.equal(
    customPaywallCopy.supportMessage,
    "Your subscription supports future updates.",
  );
  assert.equal(
    profileCopy.supportMessage,
    "유료 구독은 이 앱을 계속 만들고 개선하는 데 큰 도움이 됩니다. 더 안정적인 서비스와 꾸준한 업데이트로 보답하겠습니다. 감사합니다!",
  );
});

test("localizes support messages for every non-English paywall locale", () => {
  for (const locale of PAYWALL_TEXT_LOCALES) {
    const paywallCopy = getDefaultPaywallCopy(locale, { title: "Pro" });
    const profileCopy = getDefaultProfileSubscriptionCopy(locale, {
      productName: "Pro",
    });

    assert.ok(paywallCopy.supportMessage, locale);
    assert.ok(profileCopy.supportMessage, locale);

    if (locale === "en") continue;

    assert.notEqual(
      paywallCopy.supportMessage,
      "Paid subscriptions are a huge help in keeping this app alive and improving it. Subscribers get more convenient features, a stable service, and steady updates first.",
      locale,
    );
    assert.notEqual(
      profileCopy.supportMessage,
      "Paid subscriptions are a huge help in keeping this app alive and improving it. I will return your support with a more stable service and steady updates. Thank you!",
      locale,
    );
  }
});

test("resolves every unified non-English locale without falling back to English", () => {
  for (const locale of UNIFIED_LOCALES) {
    const resolvedLocale = resolvePaywallTextLocale(locale);
    const isEnglishLocale = locale.toLowerCase().startsWith("en");

    if (isEnglishLocale) {
      assert.equal(resolvedLocale, "en", `${locale} resolved to ${resolvedLocale}`);
      continue;
    }

    assert.notEqual(resolvedLocale, "en", `${locale} resolved to ${resolvedLocale}`);
  }

  assert.equal(resolvePaywallTextLocale("fa-AE"), "fa");
  assert.equal(resolvePaywallTextLocale("no-NO"), "nb");
  assert.equal(resolvePaywallTextLocale("zh-HK"), "zhHant");
});

test("localizes continue button copy for every non-English paywall locale", () => {
  for (const locale of PAYWALL_TEXT_LOCALES) {
    const copy = getDefaultPaywallCopy(locale, { title: "Pro" });

    if (locale === "en") {
      assert.equal(copy.continueButton, "Continue");
      continue;
    }

    assert.notEqual(copy.continueButton, "Continue", locale);
  }
});

test("localizes review section title for every non-English paywall locale", () => {
  for (const locale of PAYWALL_TEXT_LOCALES) {
    const copy = getDefaultPaywallCopy(locale, { title: "Pro" });
    const reviewCopy = copy as typeof copy & PaywallReviewSectionText;

    if (locale === "en") {
      assert.equal(reviewCopy.reviewSectionTitle, "User reviews");
      continue;
    }

    assert.notEqual(reviewCopy.reviewSectionTitle, "User reviews", locale);
  }
});

test("localizes profile identifier copy for every non-English paywall locale", () => {
  for (const locale of PAYWALL_TEXT_LOCALES) {
    const copy = getDefaultProfileIdentifiersCopy(locale);

    if (locale === "en") {
      assert.equal(copy.copyButtonAccessibilityLabel, "Copy IDs");
      assert.equal(copy.hideButtonLabel, "Hide IDs");
      assert.equal(copy.showButtonLabel, "Show IDs");
      continue;
    }

    assert.match(copy.copyButtonAccessibilityLabel, /IDs/, locale);
    assert.match(copy.hideButtonLabel, /IDs/, locale);
    assert.match(copy.showButtonLabel, /IDs/, locale);
  }
});

test("omits the free profile status badge by default", () => {
  const copy = getDefaultProfileSubscriptionCopy("en", { productName: "Pro" });

  assert.equal(copy.subscribedBadge, "PRO");
  assert.equal(copy.notSubscribedBadge, undefined);
});

test("localizes profile upgrade button copy for every paywall locale", () => {
  for (const locale of PAYWALL_TEXT_LOCALES) {
    const copy = getDefaultProfileSubscriptionCopy(locale, {
      productName: "Pro",
    });

    assert.ok(copy.upgradeButton?.includes("Pro"), locale);
    assert.notEqual(copy.upgradeButton, "Pro", locale);
  }
});

test("localizes generated paywall copy for every non-English paywall locale", () => {
  for (const locale of PAYWALL_TEXT_LOCALES) {
    const copy = getDefaultPaywallCopy(locale, { title: "Pro" });
    const plans = createPaywallPlans(
      [
        makePackage("$rc_monthly", 10, "$10.00"),
        makePackage("$rc_annual", 80, "$80.00"),
      ],
      getDefaultPaywallPlanOptions(locale),
    );
    const trialTitle = copy.formatTrialIncludedTitle?.({
      value: 2,
      unit: "week",
    });
    const trialDisclosure = copy.formatTrialPriceDisclosure?.(
      { value: 2, unit: "week" },
      "$80.00",
    );
    const annualPlan = plans.find((plan) => plan.period === "annual");
    const monthlyPlan = plans.find((plan) => plan.period === "monthly");

    assert.ok(copy.closeButtonAccessibilityLabel, locale);
    assert.ok(copy.trialIncludedDescription, locale);
    assert.ok(trialTitle, locale);
    assert.ok(trialDisclosure, locale);
    assert.ok(annualPlan?.monthlyPriceText, locale);
    assert.ok(annualPlan?.pricePerPeriodText, locale);
    assert.ok(monthlyPlan?.pricePerPeriodText, locale);

    if (locale === "en") continue;

    assert.notEqual(copy.closeButtonAccessibilityLabel, "Close paywall", locale);
    assert.doesNotMatch(
      copy.trialIncludedDescription ?? "",
      /Cancel anytime/,
      locale,
    );
    assert.doesNotMatch(trialTitle ?? "", /Free Trial Included/, locale);
    assert.doesNotMatch(trialDisclosure ?? "", / free, then /, locale);
    assert.doesNotMatch(annualPlan?.monthlyPriceText ?? "", / \/ mo$/, locale);
    assert.doesNotMatch(annualPlan?.pricePerPeriodText ?? "", / \/ year$/, locale);
    assert.doesNotMatch(monthlyPlan?.pricePerPeriodText ?? "", / \/ month$/, locale);
  }
});
