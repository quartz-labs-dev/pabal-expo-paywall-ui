import assert from "node:assert/strict";
import test from "node:test";

import { resolveHealthSyncMockPalette } from "../src/onboarding/health-sync-mock-palette";

test("apple-health backs its own white squircle artwork", () => {
  const palette = resolveHealthSyncMockPalette("apple-health");
  assert.equal(palette.badgeBackgroundColor, "#FFFFFF");
  assert.ok(palette.badgeBorderRadius < 20);
});

test("health-connect grounds its transparent artwork on a soft round badge", () => {
  const palette = resolveHealthSyncMockPalette("health-connect");
  assert.equal(palette.badgeBackgroundColor, "#E8F0FE");
  assert.equal(palette.badgeBorderRadius, 20);
});
