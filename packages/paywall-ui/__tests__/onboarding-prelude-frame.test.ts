import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const readSource = (path: string): string => {
  return readFileSync(join(process.cwd(), path), "utf8");
};

test("exports the prelude frame as a public onboarding primitive", () => {
  const indexSource = readSource("src/index.ts");
  const typesSource = readSource("src/onboarding/types.ts");

  assert.match(
    indexSource,
    /export \{ OnboardingPreludeFrame \} from "\.\/onboarding\/OnboardingPreludeFrame";/,
  );
  assert.match(
    indexSource,
    /OnboardingPreludeFrameProps,\n\} from "\.\/onboarding\/OnboardingPreludeFrame";/,
  );
  assert.match(indexSource, /RequiredOnboardingPreludeSteps,/);
  assert.match(
    typesSource,
    /export type RequiredOnboardingPreludeSteps = readonly \[\n  OnboardingPreludeStep,\n  OnboardingPreludeStep,\n\];/,
  );
});

test("keeps prelude tap hint color aligned with prelude copy color", () => {
  const preludeFrameSource = readSource(
    "src/onboarding/OnboardingPreludeFrame.tsx",
  );
  const stepFrameSource = readSource("src/onboarding/OnboardingStepFrame.tsx");

  assert.match(
    preludeFrameSource,
    /continueButtonTextStyle=\{\{ color: step\.bodyColor \}\}/,
  );
  assert.match(
    preludeFrameSource,
    /continueButtonTextColor: step\.bodyColor/,
  );
  assert.match(stepFrameSource, /color: theme\.continueButtonTextColor/);
  assert.match(stepFrameSource, /continueButtonTextStyle/);
  assert.doesNotMatch(
    stepFrameSource,
    /styles\.tapHintArrow,[\s\S]{0,120}continueButtonBackgroundColor/,
  );
});

test("keeps prelude screen chrome in the package instead of the playground", () => {
  const preludeFrameSource = readSource(
    "src/onboarding/OnboardingPreludeFrame.tsx",
  );
  const playgroundSource = readFileSync(
    join(
      process.cwd(),
      "..",
      "..",
      "apps",
      "playground",
      "src",
      "screens",
      "OnboardingPlaygroundScreen.tsx",
    ),
    "utf8",
  );

  assert.match(preludeFrameSource, /continueActionPresentation="tapHint"/);
  assert.match(preludeFrameSource, /isFullScreenTapEnabled/);
  assert.match(preludeFrameSource, /showHeader=\{false\}/);
  assert.match(preludeFrameSource, /isBodyScrollEnabled=\{false\}/);
  assert.match(preludeFrameSource, /<OnboardingPreludeContent/);
  assert.match(playgroundSource, /<OnboardingPreludeFrame/);
  assert.doesNotMatch(playgroundSource, /OnboardingPreludeContent/);
  assert.doesNotMatch(playgroundSource, /introContentContainer/);
});

test("keeps playground onboarding prelude mandatory before main steps", () => {
  const fixtureSource = readFileSync(
    join(
      process.cwd(),
      "..",
      "..",
      "apps",
      "playground",
      "src",
      "fixtures",
      "onboarding-prelude-steps.ts",
    ),
    "utf8",
  );
  const playgroundSource = readFileSync(
    join(
      process.cwd(),
      "..",
      "..",
      "apps",
      "playground",
      "src",
      "screens",
      "OnboardingPlaygroundScreen.tsx",
    ),
    "utf8",
  );

  assert.match(fixtureSource, /RequiredOnboardingPreludeSteps/);
  assert.match(playgroundSource, /currentStepIndex < preludeSteps\.length/);
  assert.match(
    playgroundSource,
    /Math\.max\(currentStepIndex - preludeSteps\.length, 0\)/,
  );
});
