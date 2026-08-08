import { Image, StyleSheet, View } from "react-native";

// Same 1x64 alpha-ramp PNG technique the package uses for heroFade.
// Real apps should prefer the expo-linear-gradient recipe from
// docs/paywall.md; the playground stays dependency-free on purpose.
const ALPHA_RAMP_IMAGE_URI =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAABACAYAAADbER1AAAAAlUlEQVR42jXEIYyBYQAA0B9jM5vtgk0QBEVRrihXLimSpEiSJEmaJEmSpFySFOnKlSvKlSuCINgEm81sDJ89mxdeFEKIolcxxZVQUimllVFWb8opr4KKKqmsit5V1Yc+VVNdDTXVUlsdddVTXwMNNdJYE031pZnmWuhbP/rVUn/610prbbTVTnsddNRJZ1101U13hWcPpYbfIZDwKvwAAAAASUVORK5CYII=";

interface PlaygroundAmbientGlowProps {
  accentColor: string;
  opacity?: number;
}

export const PlaygroundAmbientGlow = ({
  accentColor,
  opacity = 0.22,
}: PlaygroundAmbientGlowProps) => {
  return (
    <View style={styles.root}>
      <Image
        resizeMode="stretch"
        source={{ uri: ALPHA_RAMP_IMAGE_URI }}
        style={[
          styles.glow,
          {
            opacity,
            tintColor: accentColor,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
  },
  glow: {
    height: "45%",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    // The ramp fades transparent -> opaque top-to-bottom; flip it so the
    // glow is strongest at the top of the screen.
    transform: [{ scaleY: -1 }],
    width: "100%",
  },
});
