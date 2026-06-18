import assert from "node:assert/strict";
import test from "node:test";

import {
  DEFAULT_TRIAL_DURATION,
  resolveFreeTrialConfig,
} from "../src/paywall/free-trial-config";
import type { PaywallPlan, PaywallPlanPeriod } from "../src/types";

const createPlan = (
  id: string,
  period: PaywallPlanPeriod,
): PaywallPlan => ({
  id,
  period,
  title: id,
  priceText: "$9.99",
  rawPackage: { id },
});

const weeklyPlan = createPlan("weekly", "weekly");
const monthlyPlan = createPlan("monthly", "monthly");
const annualPlan = createPlan("annual", "annual");
const lifetimePlan = createPlan("lifetime", "lifetime");

test("uses the default trial duration for enabled or omitted freeTrial", () => {
  assert.deepEqual(resolveFreeTrialConfig(undefined, monthlyPlan), {
    duration: DEFAULT_TRIAL_DURATION,
  });
  assert.deepEqual(resolveFreeTrialConfig(true, monthlyPlan), {
    duration: DEFAULT_TRIAL_DURATION,
  });
});

test("disables free trial globally or for lifetime plans", () => {
  assert.equal(resolveFreeTrialConfig(false, monthlyPlan), undefined);
  assert.equal(
    resolveFreeTrialConfig(
      {
        byPlanId: {
          lifetime: true,
        },
      },
      lifetimePlan,
    ),
    undefined,
  );
});

test("applies global trial duration when no plan override matches", () => {
  assert.deepEqual(
    resolveFreeTrialConfig(
      {
        duration: { value: 2, unit: "week" },
        byPeriod: {
          weekly: { duration: { value: 3, unit: "day" } },
        },
      },
      monthlyPlan,
    ),
    { duration: { value: 2, unit: "week" } },
  );
});

test("applies byPeriod trial duration for the selected plan period", () => {
  assert.deepEqual(
    resolveFreeTrialConfig(
      {
        duration: { value: 7, unit: "day" },
        byPeriod: {
          weekly: { duration: { value: 3, unit: "day" } },
          annual: { duration: { value: 2, unit: "week" } },
        },
      },
      weeklyPlan,
    ),
    { duration: { value: 3, unit: "day" } },
  );
  assert.deepEqual(
    resolveFreeTrialConfig(
      {
        duration: { value: 7, unit: "day" },
        byPeriod: {
          annual: { duration: { value: 2, unit: "week" } },
        },
      },
      annualPlan,
    ),
    { duration: { value: 2, unit: "week" } },
  );
});

test("lets byPeriod disable trial for one selected plan period", () => {
  assert.equal(
    resolveFreeTrialConfig(
      {
        duration: { value: 7, unit: "day" },
        byPeriod: {
          weekly: false,
        },
      },
      weeklyPlan,
    ),
    undefined,
  );
  assert.deepEqual(
    resolveFreeTrialConfig(
      {
        duration: { value: 7, unit: "day" },
        byPeriod: {
          weekly: false,
        },
      },
      monthlyPlan,
    ),
    { duration: { value: 7, unit: "day" } },
  );
});

test("uses byPlanId before byPeriod for plan-specific overrides", () => {
  assert.deepEqual(
    resolveFreeTrialConfig(
      {
        duration: { value: 7, unit: "day" },
        byPeriod: {
          weekly: { duration: { value: 3, unit: "day" } },
        },
        byPlanId: {
          weekly: { duration: { value: 1, unit: "week" } },
        },
      },
      weeklyPlan,
    ),
    { duration: { value: 1, unit: "week" } },
  );
});

test("uses the global duration for true or empty plan overrides", () => {
  assert.deepEqual(
    resolveFreeTrialConfig(
      {
        duration: { value: 10, unit: "day" },
        byPlanId: {
          weekly: true,
        },
      },
      weeklyPlan,
    ),
    { duration: { value: 10, unit: "day" } },
  );
  assert.deepEqual(
    resolveFreeTrialConfig(
      {
        duration: { value: 10, unit: "day" },
        byPlanId: {
          monthly: {},
        },
      },
      monthlyPlan,
    ),
    { duration: { value: 10, unit: "day" } },
  );
});

test("falls back to global trial when no selected plan is available", () => {
  assert.deepEqual(
    resolveFreeTrialConfig({
      duration: { value: 2, unit: "week" },
      byPeriod: {
        monthly: false,
      },
    }),
    { duration: { value: 2, unit: "week" } },
  );
});
