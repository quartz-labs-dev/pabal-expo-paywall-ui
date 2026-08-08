import assert from "node:assert/strict";
import { test } from "node:test";

import {
  EXPAND_SCROLL_MAX_DISTANCE,
  resolveComparisonRowGroups,
  resolveExpandScrollTarget,
} from "../src/paywall/feature-comparison-collapse";
import type {
  PaywallFeatureComparisonCollapse,
  PaywallFeatureComparisonRow,
} from "../src/types";

const createRows = (count: number): PaywallFeatureComparisonRow[] =>
  Array.from({ length: count }, (_row, index) => ({
    free: { kind: "excluded" as const },
    id: `row-${index}`,
    label: `Row ${index}`,
    paid: { kind: "included" as const },
  }));

const createCollapse = (
  visibleRowCount: number
): PaywallFeatureComparisonCollapse => ({
  collapseLabel: "Show less",
  expandLabel: "Show all",
  visibleRowCount,
});

test("keeps every row visible when no collapse config is given", () => {
  const rows = createRows(5);
  const groups = resolveComparisonRowGroups(rows);

  assert.equal(groups.isCollapsible, false);
  assert.deepEqual(groups.staticRows, rows);
  assert.deepEqual(groups.collapsibleRows, []);
});

test("splits rows at the visible count", () => {
  const rows = createRows(5);
  const groups = resolveComparisonRowGroups(rows, createCollapse(2));

  assert.equal(groups.isCollapsible, true);
  assert.deepEqual(
    groups.staticRows.map((row) => row.id),
    ["row-0", "row-1"]
  );
  assert.deepEqual(
    groups.collapsibleRows.map((row) => row.id),
    ["row-2", "row-3", "row-4"]
  );
});

test("never drops a row across the two groups", () => {
  const rows = createRows(21);
  const groups = resolveComparisonRowGroups(rows, createCollapse(10));

  assert.deepEqual(
    [...groups.staticRows, ...groups.collapsibleRows].map((row) => row.id),
    rows.map((row) => row.id)
  );
});

test("disables collapsing when it would hide nothing", () => {
  const rows = createRows(3);

  [3, 4].forEach((visibleRowCount) => {
    const groups = resolveComparisonRowGroups(
      rows,
      createCollapse(visibleRowCount)
    );

    assert.equal(groups.isCollapsible, false);
    assert.deepEqual(groups.staticRows, rows);
    assert.deepEqual(groups.collapsibleRows, []);
  });
});

test("follows a tall expansion by at most the capped distance", () => {
  assert.equal(
    resolveExpandScrollTarget(400, 900),
    400 + EXPAND_SCROLL_MAX_DISTANCE
  );
});

test("follows a short expansion only as far as it revealed", () => {
  assert.equal(resolveExpandScrollTarget(400, 60), 460);
});

test("never scrolls backwards", () => {
  assert.equal(resolveExpandScrollTarget(400, 0), 400);
  assert.equal(resolveExpandScrollTarget(400, -120), 400);
});

test("disables collapsing rather than hiding the whole table", () => {
  const rows = createRows(3);

  [0, -1].forEach((visibleRowCount) => {
    const groups = resolveComparisonRowGroups(
      rows,
      createCollapse(visibleRowCount)
    );

    assert.equal(groups.isCollapsible, false);
    assert.deepEqual(groups.staticRows, rows);
  });
});
