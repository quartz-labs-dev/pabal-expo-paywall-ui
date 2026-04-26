import {
  createPaywallPlans,
  getDefaultSelectedPlanId,
} from "../src/create-paywall-plans";
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

test("keeps only monthly and annual packages by default", () => {
  const plans = createPaywallPlans([
    makePackage("$rc_monthly", 4.99, "$4.99"),
    makePackage("$rc_annual", 29.99, "$29.99"),
    makePackage("$rc_lifetime", 99.99, "$99.99"),
  ]);

  assert.deepEqual(plans.map((plan) => plan.id), [
    "$rc_annual",
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
    ],
    {
      annualPackageIds: ["yearly-pro"],
      monthlyPackageIds: ["monthly-pro"],
    },
  );

  assert.deepEqual(plans.map((plan) => plan.period), ["annual", "monthly"]);
});

test("formats high-value annual prices without cents", () => {
  const plans = createPaywallPlans([
    makePackage("$rc_annual", 49900, "KRW 49,900"),
  ]);

  assert.equal(plans[0]?.monthlyPriceText, "KRW 4158");
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
