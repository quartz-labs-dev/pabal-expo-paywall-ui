import type {
  PaywallFeatureComparisonCollapse,
  PaywallFeatureComparisonRow,
} from "../types";

/** Mirrors the `minHeight` of a single comparison row. */
const COMPARISON_ROW_HEIGHT = 44;

/**
 * How far the paywall follows an expansion at most: about five comparison
 * rows. Following the full revealed height scrolls past the rows the tap was
 * meant to show.
 */
export const EXPAND_SCROLL_MAX_DISTANCE = COMPARISON_ROW_HEIGHT * 5;

/**
 * Scroll offset that lands inside the rows an expansion just revealed. Never
 * moves further than the expansion revealed, and never moves backwards. The
 * ScrollView clamps the result, so a target past the end is safe.
 */
export const resolveExpandScrollTarget = (
  currentOffset: number,
  revealedHeight: number
): number =>
  currentOffset +
  Math.max(0, Math.min(revealedHeight, EXPAND_SCROLL_MAX_DISTANCE));

export interface ComparisonRowGroups {
  /**
   * False when the table shows every row, either because no `collapse` config
   * was given or because it would hide nothing.
   */
  isCollapsible: boolean;
  /** Rows that are always visible. */
  staticRows: PaywallFeatureComparisonRow[];
  /** Rows revealed by the toggle. Empty when the table is not collapsible. */
  collapsibleRows: PaywallFeatureComparisonRow[];
}

/**
 * Splits comparison rows into the always-visible group and the group behind
 * the expand toggle. A `visibleRowCount` that would hide nothing — or that is
 * zero or negative, which would hide the whole table — disables collapsing.
 */
export const resolveComparisonRowGroups = (
  rows: PaywallFeatureComparisonRow[],
  collapse?: PaywallFeatureComparisonCollapse
): ComparisonRowGroups => {
  const visibleRowCount = collapse?.visibleRowCount ?? 0;
  const isCollapsible = Boolean(
    collapse && visibleRowCount > 0 && visibleRowCount < rows.length
  );

  if (!isCollapsible) {
    return { collapsibleRows: [], isCollapsible: false, staticRows: rows };
  }

  return {
    collapsibleRows: rows.slice(visibleRowCount),
    isCollapsible: true,
    staticRows: rows.slice(0, visibleRowCount),
  };
};
