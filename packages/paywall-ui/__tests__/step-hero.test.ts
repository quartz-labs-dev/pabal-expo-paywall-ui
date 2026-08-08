import assert from "node:assert/strict";
import test from "node:test";

import {
  hasStepHeroOverride,
  resolveStepHeroSettings,
} from "../src/paywall/step-hero";

const base = {
  hero: "carousel",
  heroHeightRatio: 0.3,
  heroFade: false,
  heroLayout: "scroll",
} as const;

test("both steps share the top-level hero when the step carries no override", () => {
  assert.deepEqual(resolveStepHeroSettings(base, undefined, true), base);
  assert.deepEqual(resolveStepHeroSettings(base, {}, true), base);
});

test("the top-level hero applies while the override step is not the one rendering", () => {
  assert.deepEqual(
    resolveStepHeroSettings(base, { hero: "photo" }, false),
    base
  );
});

test("an override replaces only the fields it carries", () => {
  assert.deepEqual(
    resolveStepHeroSettings(base, { hero: "photo" }, true),
    { ...base, hero: "photo" }
  );

  assert.deepEqual(
    resolveStepHeroSettings(
      base,
      { hero: "photo", heroHeightRatio: 0.42, heroFade: true, heroLayout: "pinned" },
      true
    ),
    {
      hero: "photo",
      heroHeightRatio: 0.42,
      heroFade: true,
      heroLayout: "pinned",
    }
  );
});

test("an override can turn a shared fade off and render no hero node", () => {
  const shared = { ...base, heroFade: true } as const;

  assert.equal(
    resolveStepHeroSettings(shared, { heroFade: false }, true).heroFade,
    false
  );
  assert.equal(
    resolveStepHeroSettings(shared, { hero: null }, true).hero,
    null
  );
});

test("only an actual override crossfades the hero between steps", () => {
  assert.equal(hasStepHeroOverride(undefined), false);
  assert.equal(hasStepHeroOverride({}), false);
  assert.equal(hasStepHeroOverride({ hero: "photo" }), true);
  assert.equal(hasStepHeroOverride({ heroLayout: "pinned" }), true);
  // A hero shared across both steps must hold still; fading it would break
  // the continuity that makes the two steps read as one screen.
  assert.equal(hasStepHeroOverride({ hero: undefined }), false);
});
