import assert from "node:assert/strict";
import test from "node:test";

import {
  getOnboardingCompanionPreviewVisibility,
  resolveOnboardingCompanionPreviewAccentColor,
} from "../src/onboarding/onboarding-companion-preview-layout";

test("widget variant renders only the phone", () => {
  assert.deepEqual(getOnboardingCompanionPreviewVisibility("widget"), {
    showsPhone: true,
    showsWatch: false,
  });
});

test("watch variant renders only the watch", () => {
  assert.deepEqual(getOnboardingCompanionPreviewVisibility("watch"), {
    showsPhone: false,
    showsWatch: true,
  });
});

test("widget-watch variant renders both devices", () => {
  assert.deepEqual(getOnboardingCompanionPreviewVisibility("widget-watch"), {
    showsPhone: true,
    showsWatch: true,
  });
});

test("stage accent color falls back to the onboarding theme", () => {
  assert.equal(
    resolveOnboardingCompanionPreviewAccentColor(undefined, "#F05A22"),
    "#F05A22",
  );
});

test("stage accent color can be customized independently", () => {
  assert.equal(
    resolveOnboardingCompanionPreviewAccentColor("#7C6CF2", "#F05A22"),
    "#7C6CF2",
  );
});
