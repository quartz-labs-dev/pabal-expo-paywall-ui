import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const readPaywallSource = (): string => {
  return readFileSync(join(process.cwd(), "src", "Paywall.tsx"), "utf8");
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
