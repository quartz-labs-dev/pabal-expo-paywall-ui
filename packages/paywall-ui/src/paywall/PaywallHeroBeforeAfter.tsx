import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

export interface PaywallHeroBeforeAfterProps {
  beforeLabel: string;
  afterLabel: string;
  beforeValue: string;
  afterValue: string;
  accentColor: string;
  /**
   * Custom content rendered under each column's value (a chart, an image,
   * anything). When omitted, a default mini bar chart renders using
   * `beforeBarHeights` / `afterBarHeights`.
   */
  beforeContent?: ReactNode;
  afterContent?: ReactNode;
  beforeBarHeights?: number[];
  afterBarHeights?: number[];
  textColor?: string;
  mutedBarColor?: string;
}

const DEFAULT_BEFORE_BAR_HEIGHTS = [26, 34, 30, 38];
const DEFAULT_AFTER_BAR_HEIGHTS = [10, 8, 12, 9];

interface BarChartProps {
  barHeights: number[];
  barColor: string;
}

const BarChart = ({ barHeights, barColor }: BarChartProps) => {
  return (
    <View style={styles.chart}>
      {barHeights.map((height, index) => (
        <View
          key={index}
          style={[styles.bar, { backgroundColor: barColor, height }]}
        />
      ))}
    </View>
  );
};

interface ColumnProps {
  label: string;
  value: string;
  content: ReactNode;
  textColor: string;
  isMuted?: boolean;
}

const Column = ({ label, value, content, textColor, isMuted }: ColumnProps) => {
  return (
    <View style={[styles.column, isMuted && styles.columnMuted]}>
      <Text style={[styles.columnLabel, { color: textColor }]}>{label}</Text>
      <Text style={[styles.columnValue, { color: textColor }]}>{value}</Text>
      {content}
    </View>
  );
};

// Opal-style before/after stats hero for the `hero` slot. Renders on a
// transparent background so an app-provided `backgroundOverlay` glow stays
// visible behind it. All copy is app-provided (and app-localized). The
// per-column content is an open slot; the built-in mini bar chart is just
// the default example.
export const PaywallHeroBeforeAfter = ({
  beforeLabel,
  afterLabel,
  beforeValue,
  afterValue,
  accentColor,
  beforeContent,
  afterContent,
  beforeBarHeights = DEFAULT_BEFORE_BAR_HEIGHTS,
  afterBarHeights = DEFAULT_AFTER_BAR_HEIGHTS,
  textColor = "#FFFFFF",
  mutedBarColor = "rgba(255, 255, 255, 0.34)",
}: PaywallHeroBeforeAfterProps) => {
  return (
    <View style={styles.root}>
      <Column
        label={beforeLabel}
        value={beforeValue}
        content={
          beforeContent ?? (
            <BarChart barHeights={beforeBarHeights} barColor={mutedBarColor} />
          )
        }
        textColor={textColor}
        isMuted
      />
      <View style={styles.divider} />
      <Column
        label={afterLabel}
        value={afterValue}
        content={
          afterContent ?? (
            <BarChart barHeights={afterBarHeights} barColor={accentColor} />
          )
        }
        textColor={textColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "flex-end",
    flex: 1,
    flexDirection: "row",
    gap: 18,
    justifyContent: "center",
    paddingBottom: 16,
  },
  column: {
    alignItems: "center",
    gap: 4,
    width: 128,
  },
  columnMuted: {
    opacity: 0.72,
  },
  columnLabel: {
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 18,
    opacity: 0.72,
  },
  columnValue: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 30,
  },
  chart: {
    alignItems: "flex-end",
    flexDirection: "row",
    gap: 8,
    height: 40,
    marginTop: 6,
  },
  bar: {
    borderRadius: 3,
    width: 14,
  },
  divider: {
    alignSelf: "stretch",
    backgroundColor: "rgba(255, 255, 255, 0.14)",
    marginBottom: 4,
    width: 1,
  },
});
