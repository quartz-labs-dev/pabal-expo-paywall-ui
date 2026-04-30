import assert from "node:assert/strict";
import test from "node:test";

import { getColorWithAlpha } from "../src/color-utils";

test("applies alpha to hex colors", () => {
  assert.equal(getColorWithAlpha("#5AC8B7", 0.09), "rgba(90, 200, 183, 0.09)");
  assert.equal(getColorWithAlpha("#abc", 0.36), "rgba(170, 187, 204, 0.36)");
});

test("replaces existing alpha in hex colors", () => {
  assert.equal(getColorWithAlpha("#abcd", 0.42), "rgba(170, 187, 204, 0.42)");
  assert.equal(getColorWithAlpha("#aabbccdd", 0.74), "rgba(170, 187, 204, 0.74)");
});

test("applies alpha to rgb colors", () => {
  assert.equal(
    getColorWithAlpha("rgb(90, 200, 183)", 0.1),
    "rgba(90, 200, 183, 0.1)",
  );
  assert.equal(
    getColorWithAlpha("rgb(90 200 183)", 0.1),
    "rgba(90 200 183 / 0.1)",
  );
});

test("replaces existing alpha in rgba colors", () => {
  assert.equal(
    getColorWithAlpha("rgba(90, 200, 183, 0.5)", 0.09),
    "rgba(90, 200, 183, 0.09)",
  );
  assert.equal(
    getColorWithAlpha("rgba(90 200 183 / 0.5)", 0.09),
    "rgba(90 200 183 / 0.09)",
  );
});

test("applies alpha to hsl colors", () => {
  assert.equal(
    getColorWithAlpha("hsl(190, 48%, 57%)", 0.09),
    "hsla(190, 48%, 57%, 0.09)",
  );
  assert.equal(
    getColorWithAlpha("hsl(190 48% 57%)", 0.09),
    "hsla(190 48% 57% / 0.09)",
  );
});

test("replaces existing alpha in hsla colors", () => {
  assert.equal(
    getColorWithAlpha("hsla(190, 48%, 57%, 0.5)", 0.09),
    "hsla(190, 48%, 57%, 0.09)",
  );
  assert.equal(
    getColorWithAlpha("hsla(190 48% 57% / 0.5)", 0.09),
    "hsla(190 48% 57% / 0.09)",
  );
});

test("falls back for unsupported color syntax", () => {
  assert.equal(getColorWithAlpha("var(--accent)", 0.09), "var(--accent)");
  assert.equal(getColorWithAlpha("hsl(var(--accent))", 0.09), "hsl(var(--accent))");
  assert.equal(getColorWithAlpha("rgb()", 0.09), "rgb()");
  assert.equal(
    getColorWithAlpha("var(--accent)", 0.09, "transparent"),
    "transparent",
  );
});

test("clamps alpha to the valid color range", () => {
  assert.equal(getColorWithAlpha("#5AC8B7", -1), "rgba(90, 200, 183, 0)");
  assert.equal(getColorWithAlpha("#5AC8B7", 2), "rgba(90, 200, 183, 1)");
});
