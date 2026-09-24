import assert from "node:assert/strict";
import test from "node:test";

import {
  getLimitedTimeOfferAlternativePlans,
  getLimitedTimeOfferCountdownParts,
  resolveLimitedTimeOfferWindow,
  resolveLimitedTimeOfferSelectedPlan,
  resolvePaywallVariant,
  splitLimitedTimeOfferFeatureRows,
} from "../src/offer/limited-time-offer";
import type { PaywallFeatureComparisonRow, PaywallPlan } from "../src/types";

const createPlan = (id: string, period: PaywallPlan["period"]): PaywallPlan => ({
  id,
  period,
  priceText: `$${id}`,
  rawPackage: {},
  title: id,
});

test("keeps a 24 hour offer active until its exact boundary", () => {
  const startedAt = 1_800_000_000_000;
  const activeWindow = resolveLimitedTimeOfferWindow({
    duration: { unit: "hour", value: 24 },
    now: startedAt + 24 * 60 * 60 * 1000 - 1,
    startedAt,
  });
  const expiredWindow = resolveLimitedTimeOfferWindow({
    duration: { unit: "hour", value: 24 },
    now: startedAt + 24 * 60 * 60 * 1000,
    startedAt,
  });

  assert.equal(activeWindow.status, "active");
  assert.equal(activeWindow.remainingMs, 1);
  assert.equal(expiredWindow.status, "expired");
  assert.equal(expiredWindow.remainingMs, 0);
});

test("treats invalid timestamps and durations as invalid", () => {
  assert.equal(
    resolveLimitedTimeOfferWindow({
      duration: { unit: "hour", value: 0 },
      startedAt: Date.now(),
    }).status,
    "invalid",
  );
  assert.equal(
    resolveLimitedTimeOfferWindow({
      duration: { unit: "day", value: 1 },
      startedAt: Number.NaN,
    }).status,
    "invalid",
  );
});

test("only selects the offer when eligibility, window, and product all agree", () => {
  const activeWindow = resolveLimitedTimeOfferWindow({
    duration: { unit: "day", value: 1 },
    now: 100,
    startedAt: 100,
  });

  assert.equal(
    resolvePaywallVariant({
      hasOfferProduct: true,
      isEligible: true,
      offerWindow: activeWindow,
    }),
    "limitedTimeOffer",
  );
  assert.equal(
    resolvePaywallVariant({
      hasOfferProduct: false,
      isEligible: true,
      offerWindow: activeWindow,
    }),
    "standard",
  );
});

test("rounds countdown seconds up so time never disappears early", () => {
  assert.deepEqual(getLimitedTimeOfferCountdownParts(3_661_001), {
    hours: 1,
    minutes: 1,
    seconds: 2,
    totalSeconds: 3_662,
  });
  assert.equal(getLimitedTimeOfferCountdownParts(Number.NaN).totalSeconds, 0);
});

test("keeps alternative plans unique and excludes the featured offer", () => {
  const lifetime = createPlan("lifetime", "lifetime");
  const monthly = createPlan("monthly", "monthly");
  const annual = createPlan("annual", "annual");

  assert.deepEqual(
    getLimitedTimeOfferAlternativePlans(lifetime, [
      monthly,
      lifetime,
      annual,
      monthly,
    ]).map((plan) => plan.id),
    ["monthly", "annual"],
  );
});

test("selects a visible subscription plan and falls back to the offer", () => {
  const lifetime = createPlan("lifetime", "lifetime");
  const monthly = createPlan("monthly", "monthly");

  assert.equal(
    resolveLimitedTimeOfferSelectedPlan(lifetime, [monthly], "monthly"),
    monthly,
  );
  assert.equal(
    resolveLimitedTimeOfferSelectedPlan(lifetime, [monthly], "missing"),
    lifetime,
  );
});

test("splits featured and remaining offer benefits around the plan list", () => {
  const rows = Array.from({ length: 7 }, (_, index) => ({
    free: { kind: "excluded" as const },
    id: `feature-${index + 1}`,
    label: `Feature ${index + 1}`,
    paid: { kind: "included" as const },
  })) satisfies PaywallFeatureComparisonRow[];

  const groups = splitLimitedTimeOfferFeatureRows(rows, 4);

  assert.deepEqual(
    groups.previewRows.map((row) => row.id),
    ["feature-1", "feature-2", "feature-3", "feature-4"],
  );
  assert.deepEqual(
    groups.remainingRows.map((row) => row.id),
    ["feature-5", "feature-6", "feature-7"],
  );
});

test("clamps invalid offer benefit preview counts", () => {
  const rows = [
    {
      free: { kind: "excluded" as const },
      id: "feature",
      label: "Feature",
      paid: { kind: "included" as const },
    },
  ] satisfies PaywallFeatureComparisonRow[];

  assert.equal(splitLimitedTimeOfferFeatureRows(rows, 99).previewRows.length, 1);
  assert.equal(splitLimitedTimeOfferFeatureRows(rows, -1).previewRows.length, 0);
  assert.equal(
    splitLimitedTimeOfferFeatureRows(rows, Number.NaN).previewRows.length,
    1,
  );
});
