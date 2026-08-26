import assert from "node:assert/strict";
import test from "node:test";

import { resolveHealthSyncMockPalette } from "../src/onboarding/health-sync-mock-palette";

test("apple-health uses the pink heart on a white square badge", () => {
  const palette = resolveHealthSyncMockPalette("apple-health");
  assert.equal(palette.heartColor, "#FF2D55");
  assert.equal(palette.badgeBackgroundColor, "#FFFFFF");
  assert.ok(palette.badgeBorderRadius < 20);
});

test("health-connect uses the blue heart on a soft round badge", () => {
  const palette = resolveHealthSyncMockPalette("health-connect");
  assert.equal(palette.heartColor, "#1A73E8");
  assert.equal(palette.badgeBackgroundColor, "#E8F0FE");
  assert.equal(palette.badgeBorderRadius, 20);
});
