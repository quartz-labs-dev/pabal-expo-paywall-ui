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
  assert.doesNotMatch(source, /Animated\.multiply\(initialTransition, stepTransition\)/);
  assert.match(animatedStepStyle[1] ?? "", /translateY: initialTranslateY/);
  assert.match(animatedStepStyle[1] ?? "", /translateX: stepTranslateX/);
});

test("keeps step transitions as a single slide-in animation", () => {
  const source = readPaywallSource();

  assert.doesNotMatch(source, /STEP_TRANSITION_OUT_DURATION/);
  assert.doesNotMatch(source, /STEP_TRANSITION_IN_DURATION/);
  assert.doesNotMatch(source, /requestAnimationFrame/);
  assert.match(source, /const STEP_TRANSITION_DURATION = 180;/);
  assert.match(source, /const STEP_TRANSITION_DISTANCE = 16;/);
});
