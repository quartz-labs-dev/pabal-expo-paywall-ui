import assert from "node:assert/strict";
import test from "node:test";

import {
  getNextSlideIndex,
  getSlideIndexFromOffset,
} from "../src/paywall/hero-carousel-math";

test("maps scroll offsets to the nearest slide index", () => {
  assert.equal(getSlideIndexFromOffset(0, 375, 3), 0);
  assert.equal(getSlideIndexFromOffset(370, 375, 3), 1);
  assert.equal(getSlideIndexFromOffset(750, 375, 3), 2);
});

test("clamps out-of-range offsets", () => {
  assert.equal(getSlideIndexFromOffset(-100, 375, 3), 0);
  assert.equal(getSlideIndexFromOffset(5000, 375, 3), 2);
});

test("guards against zero width or empty slides", () => {
  assert.equal(getSlideIndexFromOffset(375, 0, 3), 0);
  assert.equal(getSlideIndexFromOffset(375, 375, 0), 0);
});

test("auto-advance wraps around", () => {
  assert.equal(getNextSlideIndex(0, 3), 1);
  assert.equal(getNextSlideIndex(2, 3), 0);
  assert.equal(getNextSlideIndex(5, 0), 0);
});
