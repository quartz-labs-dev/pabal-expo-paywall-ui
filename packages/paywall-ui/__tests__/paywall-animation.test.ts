import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const readPaywallSource = (): string => {
  return readFileSync(join(process.cwd(), "src", "Paywall.tsx"), "utf8");
};

const readTypesSource = (): string => {
  return readFileSync(join(process.cwd(), "src", "types.ts"), "utf8");
};

const readPaywallAnimationSource = (): string => {
  return readFileSync(
    join(process.cwd(), "src", "paywall-animation.ts"),
    "utf8",
  );
};

const readFeatureComparisonSource = (): string => {
  return readFileSync(
    join(process.cwd(), "src", "PaywallFeatureComparison.tsx"),
    "utf8",
  );
};

const readProfileSubscriptionSource = (): string => {
  return readFileSync(
    join(process.cwd(), "src", "ProfileSubscriptionSection.tsx"),
    "utf8",
  );
};

const readProfileBenefitUsageSource = (): string => {
  return readFileSync(
    join(process.cwd(), "src", "ProfileBenefitUsageList.tsx"),
    "utf8",
  );
};

test("keeps default paywall body animation as movement without opacity", () => {
  const source = readPaywallSource();
  const animatedMovementStyle =
    /const animatedMovementStyle = shouldAnimateMovement([\s\S]*?)\n  const animatedOpacityStyle =/.exec(
      source,
    );

  assert.ok(animatedMovementStyle, "animatedMovementStyle should exist");
  assert.doesNotMatch(animatedMovementStyle[1] ?? "", /\bopacity\s*:/);
  assert.match(
    source,
    /const bodyTranslateY = Animated\.add\(initialTranslateY, stepTranslateY\);/
  );
  assert.match(animatedMovementStyle[1] ?? "", /translateY: bodyTranslateY/);
});

test("supports opacity-only paywall body animation without movement", () => {
  const source = readPaywallSource();
  const animatedOpacityStyle =
    /const animatedOpacityStyle = shouldAnimateOpacity([\s\S]*?)\n\n  useEffect/.exec(
      source,
    );

  assert.ok(animatedOpacityStyle, "animatedOpacityStyle should exist");
  assert.match(source, /const shouldAnimateOpacity = animationMode === "opacity";/);
  assert.match(
    source,
    /const bodyOpacity = Animated\.multiply\(initialTransition, stepTransition\);/
  );
  assert.match(animatedOpacityStyle[1] ?? "", /\bopacity: bodyOpacity/);
  assert.doesNotMatch(animatedOpacityStyle[1] ?? "", /\btransform\s*:/);
});

test("keeps step transitions as a single vertical settle animation", () => {
  const source = readPaywallSource();
  const animationSource = readPaywallAnimationSource();

  assert.doesNotMatch(source, /STEP_TRANSITION_DURATION/);
  assert.doesNotMatch(source, /STEP_TRANSITION_OUT_DURATION/);
  assert.doesNotMatch(source, /STEP_TRANSITION_IN_DURATION/);
  assert.doesNotMatch(source, /translateX: stepTranslateX/);
  assert.doesNotMatch(source, /requestAnimationFrame/);
  assert.match(
    source,
    /const stepTranslateY = createContentRiseTranslateY\(stepTransition\);/,
  );
  assert.match(
    source,
    /startContentRiseTransition\(stepTransition, \(\{ finished \}\) =>/,
  );
  assert.match(
    animationSource,
    /const CONTENT_RISE_TRANSITION_DURATION = 500;/,
  );
  assert.match(
    animationSource,
    /const CONTENT_RISE_TRANSITION_DISTANCE = 20;/,
  );
  assert.match(
    animationSource,
    /outputRange: \[CONTENT_RISE_TRANSITION_DISTANCE, 0\]/,
  );
});

test("renders feature comparison cells from explicit cell kinds", () => {
  const paywallSource = readPaywallSource();
  const featureComparisonSource = readFeatureComparisonSource();
  const typesSource = readTypesSource();

  assert.match(
    paywallSource,
    /const shouldShowFeatureComparison = Boolean\(featureComparison\?\.rows\.length\);/,
  );
  assert.match(
    paywallSource,
    /benefits=\{shouldShowFeatureComparison \? \[\] : visibleBenefits\}/,
  );
  assert.match(featureComparisonSource, /kind === "included"/);
  assert.match(featureComparisonSource, /kind === "excluded"/);
  assert.match(featureComparisonSource, /cell\.text/);
  assert.match(featureComparisonSource, /accessibilityRole="button"/);
  assert.match(featureComparisonSource, /accessibilityLabel=\{row\.label\}/);
  assert.match(featureComparisonSource, /row\.onPress/);
  assert.match(typesSource, /label: string/);
  assert.match(typesSource, /labelContent\?: ReactNode/);
});

test("keeps profile benefit list and usage modes explicit", () => {
  const profileSource = readProfileSubscriptionSource();
  const usageSource = readProfileBenefitUsageSource();
  const typesSource = readTypesSource();

  assert.match(
    profileSource,
    /benefitDisplayMode === "usage" &&\s+Boolean\(benefitUsageSection\?\.items\.length\)/,
  );
  assert.match(profileSource, /<PaywallBenefitList/);
  assert.match(profileSource, /<ProfileBenefitUsageList/);
  assert.match(usageSource, /usageColumnTitle/);
  assert.match(usageSource, /proLimitColumnTitle/);
  assert.match(usageSource, /proLimitText/);
  assert.match(usageSource, /accessibilityRole="button"/);
  assert.match(usageSource, /accessibilityLabel=\{item\.title\}/);
  assert.match(usageSource, /item\.onPress/);
  assert.match(typesSource, /title: string/);
  assert.match(typesSource, /titleContent\?: ReactNode/);
  assert.doesNotMatch(usageSource, /item\.icon/);
});
