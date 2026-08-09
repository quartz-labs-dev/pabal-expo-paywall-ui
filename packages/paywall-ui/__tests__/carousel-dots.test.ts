import assert from "node:assert/strict";
import test from "node:test";

import {
  ACTIVE_CAROUSEL_DOT_WIDTH,
  DEFAULT_INACTIVE_CAROUSEL_DOT_COLOR,
  INACTIVE_CAROUSEL_DOT_WIDTH,
  resolveCarouselDotAppearance,
} from "../src/paywall/carousel-dots";

test("the active dot takes the accent color and stretches into a pill", () => {
  assert.deepEqual(resolveCarouselDotAppearance(true, "#5AC8B7"), {
    backgroundColor: "#5AC8B7",
    width: ACTIVE_CAROUSEL_DOT_WIDTH,
  });
});

test("inactive dots keep the dark-paywall default when no color is given", () => {
  assert.deepEqual(resolveCarouselDotAppearance(false, "#5AC8B7"), {
    backgroundColor: DEFAULT_INACTIVE_CAROUSEL_DOT_COLOR,
    width: INACTIVE_CAROUSEL_DOT_WIDTH,
  });
  assert.deepEqual(
    resolveCarouselDotAppearance(false, "#5AC8B7", undefined),
    {
      backgroundColor: DEFAULT_INACTIVE_CAROUSEL_DOT_COLOR,
      width: INACTIVE_CAROUSEL_DOT_WIDTH,
    }
  );
});

test("an app on a light background can replace the inactive color", () => {
  assert.deepEqual(
    resolveCarouselDotAppearance(false, "#111827", "#B8C7DA"),
    {
      backgroundColor: "#B8C7DA",
      width: INACTIVE_CAROUSEL_DOT_WIDTH,
    }
  );
});

test("the inactive color never overrides the active dot", () => {
  assert.equal(
    resolveCarouselDotAppearance(true, "#111827", "#B8C7DA")
      .backgroundColor,
    "#111827"
  );
});
