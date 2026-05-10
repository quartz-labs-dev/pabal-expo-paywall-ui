import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const readPaywallSource = (): string => {
  return readFileSync(join(process.cwd(), "src", "Paywall.tsx"), "utf8");
};

test("keeps paywall body visibility independent from step transition animation", () => {
  const source = readPaywallSource();
  const animatedStepStyle = /const animatedStepStyle = \{([\s\S]*?)\n  \};/.exec(
    source,
  );

  assert.ok(animatedStepStyle, "animatedStepStyle should exist");
  assert.doesNotMatch(animatedStepStyle[1] ?? "", /\bopacity\s*:/);
  assert.doesNotMatch(
    source,
    /Animated\.multiply\(initialTransition, stepTransition\)/
  );
  assert.match(
    source,
    /const bodyTranslateY = Animated\.add\(initialTranslateY, stepTranslateY\);/
  );
  assert.match(animatedStepStyle[1] ?? "", /translateY: bodyTranslateY/);
});

test("keeps step transitions as a single vertical settle animation", () => {
  const source = readPaywallSource();

  assert.doesNotMatch(source, /STEP_TRANSITION_OUT_DURATION/);
  assert.doesNotMatch(source, /STEP_TRANSITION_IN_DURATION/);
  assert.doesNotMatch(source, /STEP_TRANSITION_DISTANCE/);
  assert.doesNotMatch(source, /translateX: stepTranslateX/);
  assert.doesNotMatch(source, /requestAnimationFrame/);
  assert.match(source, /const STEP_TRANSITION_DURATION = 240;/);
  assert.match(source, /const INITIAL_TRANSITION_DURATION = 460;/);
  assert.match(source, /const stepTranslateY = stepTransition\.interpolate/);
  assert.match(source, /outputRange: \[8, 0\]/);
});
