import assert from "node:assert/strict";
import test from "node:test";

import {
  getOnboardingCompanionPreviewVisibility,
  resolveOnboardingCompanionPreviewAccentColor,
  resolveOnboardingCompanionWatchBadgePalette,
} from "../src/onboarding/onboarding-companion-preview-layout";

test("widget variant renders only the phone", () => {
  assert.deepEqual(getOnboardingCompanionPreviewVisibility("widget"), {
    showsPhone: true,
    showsStageGlow: true,
    showsWatch: false,
    showsWatchBadge: false,
  });
});

test("watch variant renders only the watch", () => {
  assert.deepEqual(getOnboardingCompanionPreviewVisibility("watch"), {
    showsPhone: false,
    showsStageGlow: true,
    showsWatch: true,
    showsWatchBadge: false,
  });
});

test("widget-watch variant renders both devices", () => {
  assert.deepEqual(getOnboardingCompanionPreviewVisibility("widget-watch"), {
    showsPhone: true,
    showsStageGlow: true,
    showsWatch: true,
    showsWatchBadge: false,
  });
});

test("stage glow can be switched off", () => {
  assert.equal(
    getOnboardingCompanionPreviewVisibility("widget-watch", {
      showsStageGlow: false,
    }).showsStageGlow,
    false,
  );
});

test("health platform shows the watch badge when the watch is on stage", () => {
  assert.equal(
    getOnboardingCompanionPreviewVisibility("widget-watch", {
      watchHealthPlatform: "apple-health",
    }).showsWatchBadge,
    true,
  );
  assert.equal(
    getOnboardingCompanionPreviewVisibility("watch", {
      watchHealthPlatform: "health-connect",
    }).showsWatchBadge,
    true,
  );
});

test("custom watch badge shows without a health platform", () => {
  assert.equal(
    getOnboardingCompanionPreviewVisibility("watch", { hasWatchBadge: true })
      .showsWatchBadge,
    true,
  );
});

test("watch badge stays hidden on the phone-only variant", () => {
  assert.equal(
    getOnboardingCompanionPreviewVisibility("widget", {
      hasWatchBadge: true,
      watchHealthPlatform: "apple-health",
    }).showsWatchBadge,
    false,
  );
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

test("watch badge scales the health palette to the app-icon tile", () => {
  assert.deepEqual(
    resolveOnboardingCompanionWatchBadgePalette("apple-health", "#111111"),
    { backgroundColor: "#FFFFFF", borderRadius: 14 },
  );
  assert.deepEqual(
    resolveOnboardingCompanionWatchBadgePalette("health-connect", "#111111"),
    { backgroundColor: "#E8F0FE", borderRadius: 30 },
  );
});

test("custom watch badge falls back to the card background", () => {
  assert.deepEqual(
    resolveOnboardingCompanionWatchBadgePalette(undefined, "#111111"),
    { backgroundColor: "#111111", borderRadius: 14 },
  );
});
