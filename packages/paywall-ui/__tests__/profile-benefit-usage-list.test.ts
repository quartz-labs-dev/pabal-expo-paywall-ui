import assert from "node:assert/strict";
import test from "node:test";

import { isBenefitUsageTableVisible } from "../src/profile/benefit-usage-visibility";

test("a non-collapsible table always shows", () => {
  assert.equal(
    isBenefitUsageTableVisible({
      collapsible: false,
      hasTitle: true,
      isExpanded: false,
    }),
    true
  );
});

test("a collapsible table shows only while expanded", () => {
  const visible = (isExpanded: boolean) =>
    isBenefitUsageTableVisible({ collapsible: true, hasTitle: true, isExpanded });

  assert.equal(visible(false), false);
  assert.equal(visible(true), true);
});

test("a collapsible table without a title has nothing to tap, so it shows", () => {
  assert.equal(
    isBenefitUsageTableVisible({
      collapsible: true,
      hasTitle: false,
      isExpanded: false,
    }),
    true
  );
});

test("every locale has its own 'view all Pro benefits' toggle label", async () => {
  const { getDefaultProfileSubscriptionCopy, PAYWALL_TEXT_LOCALES } =
    await import("../src/locales/localized-paywall-copy");
  const english = getDefaultProfileSubscriptionCopy("en").viewAllBenefitsTitle;

  assert.equal(english, "View all Pro benefits");
  assert.equal(
    getDefaultProfileSubscriptionCopy("ko").viewAllBenefitsTitle,
    "프로 혜택 전체 보기"
  );
  for (const locale of PAYWALL_TEXT_LOCALES) {
    const label = getDefaultProfileSubscriptionCopy(locale).viewAllBenefitsTitle;
    assert.ok(label && label.trim().length > 0, locale);
    if (!locale.startsWith("en")) assert.notEqual(label, english, locale);
  }
});
