import {
  createPaywallPlans,
  getDefaultSelectedPlanId,
} from "../src/create-paywall-plans";
import {
  getDefaultPaywallCopy,
  getDefaultPaywallPlanOptions,
  resolvePaywallTextLocale,
} from "../src/localized-paywall-copy";
import { UNIFIED_LOCALES } from "../src/unified-locales";
import type { PurchasesPackageLike } from "../src/types";
import assert from "node:assert/strict";
import test from "node:test";

const makePackage = (
  identifier: string,
  price: number,
  priceString: string,
): PurchasesPackageLike => ({
  identifier,
  product: {
    price,
    priceString,
    description: `${identifier} description`,
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

test("can recommend lifetime packages", () => {
  const plans = createPaywallPlans(
    [
      makePackage("$rc_monthly", 10, "$10.00"),
      makePackage("$rc_lifetime", 149.99, "$149.99"),
    ],
    {
      lifetimeBadgeText: "One-time payment",
      lifetimeTitle: "Lifetime access",
      recommendedPeriod: "lifetime",
    },
  );

  const lifetimePlan = plans.find((plan) => plan.period === "lifetime");

  assert.equal(lifetimePlan?.badgeText, "One-time payment");
  assert.equal(lifetimePlan?.title, "Lifetime access");
  assert.equal(lifetimePlan?.isRecommended, true);
  assert.equal(getDefaultSelectedPlanId(plans), "$rc_lifetime");
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
    getDefaultPaywallCopy("ko-KR", { title: "Pro" }).nextButton,
    "다음",
  );
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
