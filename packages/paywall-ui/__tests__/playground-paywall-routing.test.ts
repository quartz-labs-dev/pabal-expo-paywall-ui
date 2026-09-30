import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const readPlaygroundSource = (path: string): string => {
  return readFileSync(
    join(process.cwd(), "..", "..", "apps", "playground", path),
    "utf8",
  );
};

test("keeps standard and special-offer paywall entries independent", () => {
  const appSource = readPlaygroundSource("App.tsx");
  const homeSource = readPlaygroundSource("src/screens/HomeScreen.tsx");
  const paywallSource = readPlaygroundSource(
    "src/screens/PaywallPlaygroundScreen.tsx",
  );

  assert.match(appSource, /window\.location\.pathname === "\/offer-paywall"/);
  assert.match(appSource, /navigate\("paywall"\)/);
  assert.match(appSource, /navigate\("offerPaywall"\)/);
  assert.match(
    appSource,
    /variant=\{route === "offerPaywall" \? "offer" : "standard"\}/,
  );
  assert.match(homeSource, /title="Standard paywall"/);
  assert.match(homeSource, /Open \/paywall/);
  assert.match(homeSource, /title="Special offer paywall"/);
  assert.match(homeSource, /Open \/offer-paywall/);
  assert.match(homeSource, /title="Paywall settings"/);
  assert.match(homeSource, /title="Special offer settings"/);
  assert.match(homeSource, /title="Offer window"/);
  assert.match(homeSource, /title="Lifetime discount"/);
  assert.match(homeSource, /<OfferAlternativePlansSettings/);
  assert.match(paywallSource, /if \(variant === "offer" && lifetimeOfferPlan\)/);
  assert.match(
    paywallSource,
    /areOfferAlternativePlansVisible \? alternativeOfferPlans : undefined/,
  );
  assert.match(
    paywallSource,
    /featureComparison=\{offerFeatureComparison\}/,
  );
  assert.match(paywallSource, /visibleRowCount: 4/);
  assert.match(paywallSource, /annualSelectedDescription/);
  assert.match(paywallSource, /monthlySelectedDescription/);
  assert.match(paywallSource, /formatDiscountText\?\.\(58\)/);
  assert.match(
    paywallSource,
    /headerTheme=\{\{ backgroundColor: "transparent" \}\}/,
  );
  assert.match(paywallSource, /theme=\{designPresentation\.theme\}/);
  assert.match(
    paywallSource,
    /reviewSection=\{playgroundPaywallConfig\.reviewSection\}/,
  );
});

test("preserves the legacy offer query as an offer route", () => {
  const appSource = readPlaygroundSource("App.tsx");

  assert.match(
    appSource,
    /new URLSearchParams\(window\.location\.search\)\.get\("offer"\) === "1"/,
  );
  assert.match(appSource, /return "offerPaywall";/);
});
