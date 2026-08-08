import assert from "node:assert/strict";
import test from "node:test";

import {
  getLoopedPageCount,
  getSlideIndexFromOffset,
  resolveLoopedCarouselPosition,
} from "../src/paywall/hero-carousel-math";

test("maps scroll offsets to the nearest page index", () => {
  assert.equal(getSlideIndexFromOffset(0, 375, 5), 0);
  assert.equal(getSlideIndexFromOffset(370, 375, 5), 1);
  assert.equal(getSlideIndexFromOffset(750, 375, 5), 2);
});

test("clamps out-of-range offsets", () => {
  assert.equal(getSlideIndexFromOffset(-100, 375, 5), 0);
  assert.equal(getSlideIndexFromOffset(5000, 375, 5), 4);
});

test("guards against zero width or empty pages", () => {
  assert.equal(getSlideIndexFromOffset(375, 0, 5), 0);
  assert.equal(getSlideIndexFromOffset(375, 375, 0), 0);
});

test("looping adds a clone page at each edge", () => {
  assert.equal(getLoopedPageCount(3), 5);
  assert.equal(getLoopedPageCount(2), 4);
  assert.equal(getLoopedPageCount(1), 1);
  assert.equal(getLoopedPageCount(0), 0);
});

test("real pages resolve without snapping", () => {
  assert.deepEqual(resolveLoopedCarouselPosition(1, 3), {
    virtualIndex: 1,
    realIndex: 0,
    requiresSnap: false,
  });
  assert.deepEqual(resolveLoopedCarouselPosition(3, 3), {
    virtualIndex: 3,
    realIndex: 2,
    requiresSnap: false,
  });
});

test("the leading clone snaps to the real last page (backward loop)", () => {
  assert.deepEqual(resolveLoopedCarouselPosition(0, 3), {
    virtualIndex: 3,
    realIndex: 2,
    requiresSnap: true,
  });
});

test("the trailing clone snaps to the real first page (forward loop)", () => {
  assert.deepEqual(resolveLoopedCarouselPosition(4, 3), {
    virtualIndex: 1,
    realIndex: 0,
    requiresSnap: true,
  });
  assert.deepEqual(resolveLoopedCarouselPosition(9, 3), {
    virtualIndex: 1,
    realIndex: 0,
    requiresSnap: true,
  });
});

test("single-slide carousels never loop", () => {
  assert.deepEqual(resolveLoopedCarouselPosition(0, 1), {
    virtualIndex: 0,
    realIndex: 0,
    requiresSnap: false,
  });
});
