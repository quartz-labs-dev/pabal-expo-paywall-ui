import assert from "node:assert/strict";
import test from "node:test";

import {
  getPinnedContentPaddingTop,
  PINNED_HERO_SHEET_OVERLAP,
} from "../src/paywall/pinned-hero-layout";

test("content starts overlapping the hero by the fixed overlap amount", () => {
  assert.equal(
    getPinnedContentPaddingTop(300),
    300 - PINNED_HERO_SHEET_OVERLAP
  );
});

test("never goes negative for a hero shorter than the overlap", () => {
  assert.equal(getPinnedContentPaddingTop(10), 0);
  assert.equal(getPinnedContentPaddingTop(0), 0);
});
