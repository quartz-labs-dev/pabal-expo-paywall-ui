import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const offerSource = readFileSync(
  join(process.cwd(), "src", "offer", "LimitedTimeOfferPaywall.tsx"),
  "utf8",
);

test("orders offer content around always-visible alternative plans", () => {
  const previewFeaturesIndex = offerSource.indexOf(
    "comparison={previewComparison}",
  );
  const alternativePlansIndex = offerSource.indexOf(
    "styles.alternativePlansSection",
  );
  const remainingFeaturesIndex = offerSource.indexOf(
    "comparison={remainingComparison}",
  );
  const reviewsIndex = offerSource.indexOf("<PaywallReviewSection");
  const supportIndex = offerSource.indexOf("<SupportMessageBubble");
  const legalIndex = offerSource.indexOf("<LegalLinks");

  assert.ok(previewFeaturesIndex > 0);
  assert.ok(previewFeaturesIndex < alternativePlansIndex);
  assert.ok(alternativePlansIndex < remainingFeaturesIndex);
  assert.ok(remainingFeaturesIndex < reviewsIndex);
  assert.ok(reviewsIndex < supportIndex);
  assert.ok(supportIndex < legalIndex);
  assert.doesNotMatch(offerSource, /isAlternativePlansExpanded/);
});

test("uses the default illustration and standard fixed CTA layout", () => {
  assert.match(offerSource, /hero \?\? <DefaultOfferHero \/>/);
  assert.match(offerSource, /variant="pill"/);
  assert.match(offerSource, /paddingBottom: footerHeight \+ 24/);
  assert.match(offerSource, /onLayout=\{\(event\) => \{/);
  assert.match(offerSource, /<PurchaseButton/);
});
