import assert from "node:assert/strict";
import test from "node:test";

import {
  getTitleSegmentsText,
  normalizeTitleSegments,
} from "../src/paywall/title-segments";

test("normalizes mixed string and object segments", () => {
  const segments = normalizeTitleSegments([
    "Start your free week and gain ",
    { text: "2+ hours", emphasized: true },
    " back",
  ]);

  assert.deepEqual(segments, [
    { text: "Start your free week and gain ", emphasized: false },
    { text: "2+ hours", emphasized: true },
    { text: " back", emphasized: false },
  ]);
});

test("treats missing emphasized flag as false and drops empty segments", () => {
  const segments = normalizeTitleSegments([
    { text: "Upgrade" },
    "",
    { text: "", emphasized: true },
  ]);

  assert.deepEqual(segments, [{ text: "Upgrade", emphasized: false }]);
});

test("joins segments into the plain title string", () => {
  const text = getTitleSegmentsText([
    "Gain ",
    { text: "2+ hours", emphasized: true },
    " back",
  ]);

  assert.equal(text, "Gain 2+ hours back");
});
