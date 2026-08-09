import type {
  PaywallFeatureComparisonCell,
  PaywallFeatureComparisonExcludedStyle,
  PaywallFeatureComparisonIncludedStyle,
  PaywallTheme,
} from "../types";

export type PaywallComparisonColumn = "free" | "paid";

export const COMPARISON_CHECK_MARK = "✓";
export const COMPARISON_EXCLUDED_MARK = "–";

export interface ComparisonCellStyleOptions {
  includedColor?: string;
  includedStyle?: PaywallFeatureComparisonIncludedStyle;
  excludedStyle?: PaywallFeatureComparisonExcludedStyle;
}

// Returns the visible glyph for a cell, or null when the cell should stay
// visually empty (excluded cells with `excludedStyle: "hidden"`).
export const resolveComparisonCellGlyph = (
  cell: PaywallFeatureComparisonCell,
  excludedStyle: PaywallFeatureComparisonExcludedStyle = "dash"
): string | null => {
  if (cell.kind === "included") return COMPARISON_CHECK_MARK;
  if (cell.kind === "excluded") {
    return excludedStyle === "hidden" ? null : COMPARISON_EXCLUDED_MARK;
  }
  return cell.text;
};

// What a screen reader announces for a cell. Included and excluded cells have
// no text to fall back on, so they read nothing unless the app labels them.
// A text cell reads itself, which is right for a value like "3" and wrong for
// a symbol like "∞" — hence the optional override.
export const resolveComparisonCellAccessibilityLabel = (
  cell: PaywallFeatureComparisonCell
): string | undefined => {
  if (cell.kind === "text") return cell.accessibilityLabel ?? cell.text;

  return cell.accessibilityLabel;
};

export const resolveComparisonCellColor = (
  cell: PaywallFeatureComparisonCell,
  column: PaywallComparisonColumn,
  theme: PaywallTheme,
  options: ComparisonCellStyleOptions = {}
): string => {
  if (cell.kind === "included") {
    if (options.includedColor) return options.includedColor;
    if (options.includedStyle === "circledCheck") return theme.accentColor;
  }

  if (column === "free") return theme.primaryTextColor;
  return theme.accentColor;
};
