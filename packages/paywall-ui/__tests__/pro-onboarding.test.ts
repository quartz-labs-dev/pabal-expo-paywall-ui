import assert from "node:assert/strict";
import test from "node:test";

import {
  getDefaultProOnboardingCopy,
  PAYWALL_TEXT_LOCALES,
} from "../src/locales/localized-paywall-copy";
import {
  getNextProOnboardingItemId,
  isProOnboardingItemNew,
} from "../src/pro-onboarding/pro-onboarding";

const order = ["theme", "widget", "recap", "health"];

test("suggests a NEW item first, then the order, skipping used items", () => {
  assert.equal(
    getNextProOnboardingItemId({ order, usedItemIds: [], newItemIds: ["health"] }),
    "health"
  );
  assert.equal(
    getNextProOnboardingItemId({ order, usedItemIds: ["theme"] }),
    "widget"
  );
});

test("a used NEW item is not suggested", () => {
  assert.equal(
    getNextProOnboardingItemId({
      order,
      usedItemIds: ["health"],
      newItemIds: ["health"],
    }),
    "theme"
  );
});

test("returns null when everything is used", () => {
  assert.equal(getNextProOnboardingItemId({ order, usedItemIds: order }), null);
});

test("NEW compares against the last seen version or the baseline", () => {
  const isNew = (lastSeenVersion: string | null) =>
    isProOnboardingItemNew({
      addedInVersion: "3.23.0",
      lastSeenVersion,
      baselineVersion: "3.22.0",
    });

  assert.equal(isNew(null), true);
  assert.equal(isNew("3.22.9"), true);
  assert.equal(isNew("3.23.0"), false);
  assert.equal(
    isProOnboardingItemNew({ lastSeenVersion: null, baselineVersion: "1.0.0" }),
    false
  );
});

test("every locale has its own onboarding copy", () => {
  const english = getDefaultProOnboardingCopy("en");
  assert.equal(english.title, "Pro feature guide");
  assert.equal(getDefaultProOnboardingCopy("ko").tryButton, "해보기");

  const keys = [
    "title",
    "nextTitle",
    "tryButton",
    "alreadyUsedButton",
    "inUseBadge",
    "allExplored",
  ] as const;
  for (const locale of PAYWALL_TEXT_LOCALES) {
    const copy = getDefaultProOnboardingCopy(locale);
    for (const key of keys) {
      assert.ok(copy[key].trim().length > 0, `${locale} ${key}`);
      if (!locale.startsWith("en")) {
        assert.notEqual(copy[key], english[key], `${locale} ${key}`);
      }
    }
  }
});
