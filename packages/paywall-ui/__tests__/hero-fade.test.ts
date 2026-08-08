import assert from "node:assert/strict";
import test from "node:test";

import {
  DEFAULT_HERO_FADE_HEIGHT_RATIO,
  HERO_FADE_IMAGE_URI,
} from "../src/shared/hero-fade";

test("hero fade image is an embedded PNG data URI", () => {
  const prefix = "data:image/png;base64,";
  assert.ok(HERO_FADE_IMAGE_URI.startsWith(prefix));

  const decoded = Buffer.from(
    HERO_FADE_IMAGE_URI.slice(prefix.length),
    "base64"
  );
  const pngSignature = Buffer.from([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
  ]);
  assert.deepEqual(decoded.subarray(0, 8), pngSignature);

  // IHDR: width at byte 16, height at byte 20.
  assert.equal(decoded.readUInt32BE(16), 1);
  assert.equal(decoded.readUInt32BE(20), 64);
});

test("hero fade covers a partial slice of the hero", () => {
  assert.ok(DEFAULT_HERO_FADE_HEIGHT_RATIO > 0);
  assert.ok(DEFAULT_HERO_FADE_HEIGHT_RATIO < 1);
});
