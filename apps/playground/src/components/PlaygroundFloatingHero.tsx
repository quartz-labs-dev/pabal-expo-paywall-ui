import { StyleSheet, Text, View } from "react-native";

interface PlaygroundFloatingHeroProps {
  accentColor: string;
}

// Transparent-background hero: a floating widget stack, so the paywall's
// `backgroundOverlay` ambient glow stays visible behind it (Tide Guide
// style), unlike an opaque full-bleed photo hero.
export const PlaygroundFloatingHero = ({
  accentColor,
}: PlaygroundFloatingHeroProps) => {
  return (
    <View style={styles.root}>
      <View style={[styles.card, styles.cardBack]} />
      <View style={[styles.card, styles.cardMid]} />
      <View style={[styles.card, styles.cardFront]}>
        <View style={[styles.iconDot, { backgroundColor: accentColor }]} />
        <View style={styles.lines}>
          <View style={[styles.line, styles.lineWide]} />
          <View style={[styles.line, styles.lineNarrow]} />
        </View>
        <Text style={[styles.badge, { color: accentColor }]}>PRO</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 18,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.10)",
    borderColor: "rgba(255, 255, 255, 0.14)",
    borderCurve: "continuous",
    borderRadius: 22,
    borderWidth: 1,
    width: 264,
  },
  cardBack: {
    height: 18,
    marginBottom: -10,
    opacity: 0.45,
    transform: [{ scaleX: 0.84 }],
  },
  cardMid: {
    height: 20,
    marginBottom: -12,
    opacity: 0.7,
    transform: [{ scaleX: 0.92 }],
  },
  cardFront: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.14)",
    flexDirection: "row",
    gap: 12,
    height: 64,
    paddingHorizontal: 16,
  },
  iconDot: {
    borderRadius: 12,
    height: 24,
    width: 24,
  },
  lines: {
    flex: 1,
    gap: 6,
  },
  line: {
    backgroundColor: "rgba(255, 255, 255, 0.38)",
    borderRadius: 3,
    height: 6,
  },
  lineWide: {
    width: "72%",
  },
  lineNarrow: {
    opacity: 0.6,
    width: "46%",
  },
  badge: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },
});
