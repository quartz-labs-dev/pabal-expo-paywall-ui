import assert from "node:assert/strict";
import test from "node:test";

import {
  getLimitedTimeOfferCountdownParts,
  resolveLimitedTimeOfferWindow,
  resolvePaywallVariant,
} from "../src/offer/limited-time-offer";

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
