import assert from "node:assert/strict";
import test from "node:test";

import {
  getDefaultLimitedTimeOfferCopy,
  PAYWALL_TEXT_LOCALES,
} from "../src/locales/localized-paywall-copy";
import { resolveLimitedTimeOfferPurchasePresentation } from "../src/offer/limited-time-offer";
import type { PaywallPlan } from "../src/types";

const marketing = { badgeText: "24h", countdownLabel: "Ends in", title: "Pro" };

test("provides a package-owned two-line title in every locale", () => {
  for (const locale of PAYWALL_TEXT_LOCALES) {
    const copy = getDefaultLimitedTimeOfferCopy(locale, { badgeText: "", countdownLabel: "" });
    assert.equal(copy.title.split("\n").length, 2, locale);
    assert.ok(copy.title.split("\n").every((line) => line.trim().length > 0), locale);
  }
  assert.equal(getDefaultLimitedTimeOfferCopy("en", { badgeText: "", countdownLabel: "" }).title, "One payment.\nPro forever.");
  assert.equal(getDefaultLimitedTimeOfferCopy("ko", { badgeText: "", countdownLabel: "" }).title, "한 번 결제로\n평생 Pro.");
});
const plan = (period: PaywallPlan["period"], priceText: string): PaywallPlan => ({
  id: period, period, priceText, rawPackage: {}, title: period,
});

test("localizes other plans and close labels for every supported locale", () => {
  for (const locale of PAYWALL_TEXT_LOCALES) {
    const copy = getDefaultLimitedTimeOfferCopy(locale, marketing);
    assert.ok(copy.alternativePlansTitle, locale);
    assert.equal(copy.viewAllPlansButton, copy.alternativePlansTitle, locale);
    assert.ok(copy.closeButtonAccessibilityLabel, locale);
    if (locale !== "en") assert.notEqual(copy.alternativePlansTitle, "View other plans", locale);
  }
  assert.equal(getDefaultLimitedTimeOfferCopy("ko-KR", marketing).alternativePlansTitle, "다른 플랜 보기");
  assert.equal(getDefaultLimitedTimeOfferCopy("zh-TW", marketing).alternativePlansTitle, "查看其他方案");
});

test("updates actual prices and billing periods with the selected plan", () => {
  const copy = getDefaultLimitedTimeOfferCopy("ko", marketing);
  for (const [period, price, disclosure] of [
    ["monthly", "$2.99", "$2.99 / 월"],
    ["annual", "$14.99", "$14.99 / 년"],
    ["lifetime", "$20.99", "일회성 구매"],
  ] as const) {
    const presentation = resolveLimitedTimeOfferPurchasePresentation({
      copy, locale: "ko", plan: plan(period, price),
    });
    assert.ok(presentation.label.includes(price));
    assert.equal(presentation.disclosure, disclosure);
    assert.ok(!presentation.label.includes("무료"));
  }
});

test("never advertises a trial without eligibility or on lifetime purchases", () => {
  const copy = getDefaultLimitedTimeOfferCopy("ko", marketing);
  const config = { byPeriod: { annual: true, monthly: false } };
  const annual = resolveLimitedTimeOfferPurchasePresentation({
    copy, locale: "ko", plan: plan("annual", "$14.99"), freeTrial: config,
  });
  assert.equal(annual.label, "7일 무료, 이후 $14.99");
  assert.equal(annual.disclosure, "지금 결제되는 금액은 없습니다");
  for (const period of ["monthly", "lifetime"] as const) {
    const result = resolveLimitedTimeOfferPurchasePresentation({
      copy, locale: "ko", plan: plan(period, "$2.99"), freeTrial: config,
    });
    assert.ok(!result.label.includes("무료"));
    assert.notEqual(result.disclosure, annual.disclosure);
  }
});

test("supports custom selected-period labels and disclosures without hiding trial terms", () => {
  const copy = getDefaultLimitedTimeOfferCopy("en", {
    ...marketing,
    purchaseButtonByPeriod: { lifetime: "Special deal: $20.99", annual: "Yearly Pro" },
    purchaseDisclosureByPeriod: { lifetime: "One payment, no renewal" },
  });
  const lifetime = resolveLimitedTimeOfferPurchasePresentation({
    copy, plan: plan("lifetime", "$20.99"), freeTrial: true,
  });
  assert.equal(lifetime.label, "Special deal: $20.99");
  assert.equal(lifetime.disclosure, "One payment, no renewal");
  assert.equal(resolveLimitedTimeOfferPurchasePresentation({
    copy, plan: plan("annual", "$14.99"), freeTrial: true,
  }).label, "7 days free, then $14.99");
});
