import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const offerSource = readFileSync(
  join(process.cwd(), "src", "offer", "LimitedTimeOfferPaywall.tsx"),
  "utf8",
);

test("orders collapsible features before always-visible alternative plans", () => {
  const featuresIndex = offerSource.indexOf(
    "comparison={featureComparison}",
  );
  const benefitsIndex = offerSource.indexOf("<PaywallBenefitList");
  const alternativePlansIndex = offerSource.indexOf(
    "styles.alternativePlansSection",
  );
  const reviewsIndex = offerSource.indexOf("<PaywallReviewSection");
  const supportIndex = offerSource.indexOf("<SupportMessageBubble");
  const legalIndex = offerSource.indexOf("<LegalLinks");

  assert.ok(featuresIndex > 0);
  assert.ok(featuresIndex < benefitsIndex);
  assert.ok(benefitsIndex < alternativePlansIndex);
  assert.ok(alternativePlansIndex < reviewsIndex);
  assert.ok(reviewsIndex < supportIndex);
  assert.ok(supportIndex < legalIndex);
  assert.doesNotMatch(offerSource, /isAlternativePlansExpanded/);
  assert.doesNotMatch(offerSource, /previewComparison|remainingComparison/);
});

test("uses the default illustration and standard fixed CTA layout", () => {
  assert.match(offerSource, /hero \?\? <DefaultOfferHero \/>/);
  assert.match(offerSource, /variant="pill"/);
  assert.match(offerSource, /accentColor=\{theme\.accentColor\}/);
  assert.match(offerSource, /headerThemeOverride\?\.backgroundColor/);
  assert.match(offerSource, /hasCustomHeaderBackground/);
  assert.match(offerSource, /paddingBottom: footerHeight \+ 24/);
  assert.match(offerSource, /onLayout=\{\(event\) => \{/);
  assert.match(offerSource, /<PurchaseButton/);
});
