import assert from "node:assert/strict";
import test from "node:test";

import {
  COMPARISON_CHECK_MARK,
  COMPARISON_EXCLUDED_MARK,
  resolveComparisonCellColor,
  resolveComparisonCellGlyph,
} from "../src/paywall/comparison-cells";
import { defaultPaywallTheme } from "../src/shared/theme";

test("included cells always render the checkmark glyph", () => {
  assert.equal(
    resolveComparisonCellGlyph({ kind: "included" }),
    COMPARISON_CHECK_MARK
  );
  assert.equal(
    resolveComparisonCellGlyph({ kind: "included" }, "hidden"),
    COMPARISON_CHECK_MARK
  );
});

test("excluded cells render a dash by default and hide when requested", () => {
  assert.equal(
    resolveComparisonCellGlyph({ kind: "excluded" }),
    COMPARISON_EXCLUDED_MARK
  );
  assert.equal(resolveComparisonCellGlyph({ kind: "excluded" }, "hidden"), null);
});

test("text cells render their text regardless of excluded style", () => {
  assert.equal(
    resolveComparisonCellGlyph({ kind: "text", text: "24h" }, "hidden"),
    "24h"
  );
});

test("legacy check colors follow the column", () => {
  const free = resolveComparisonCellColor(
    { kind: "included" },
    "free",
    defaultPaywallTheme
  );
  const paid = resolveComparisonCellColor(
    { kind: "included" },
    "paid",
    defaultPaywallTheme
  );
  assert.equal(free, defaultPaywallTheme.primaryTextColor);
  assert.equal(paid, defaultPaywallTheme.accentColor);
});

test("circledCheck uses the accent for both columns", () => {
  const options = { includedStyle: "circledCheck" as const };
  const free = resolveComparisonCellColor(
    { kind: "included" },
    "free",
    defaultPaywallTheme,
    options
  );
  assert.equal(free, defaultPaywallTheme.accentColor);
});

test("includedColor overrides both styles", () => {
  const color = resolveComparisonCellColor(
    { kind: "included" },
    "free",
    defaultPaywallTheme,
    { includedColor: "#34C759", includedStyle: "circledCheck" }
  );
  assert.equal(color, "#34C759");
});
