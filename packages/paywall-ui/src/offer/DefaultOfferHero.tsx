import { Image, StyleSheet, View } from "react-native";

export const DefaultOfferHero = () => {
  return (
    <View style={styles.container}>
      <Image
        accessibilityIgnoresInvertColors
        resizeMode="contain"
        source={require("../assets/offer/limited-time-gift.png")}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: 190,
    justifyContent: "center",
    width: "100%",
  },
  image: {
    height: 180,
    width: 280,
  },
});
