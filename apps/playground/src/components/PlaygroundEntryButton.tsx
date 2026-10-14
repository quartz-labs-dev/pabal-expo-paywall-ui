import { Pressable, StyleSheet, Text, View } from "react-native";

interface PlaygroundEntryButtonProps {
  title: string;
  description: string;
  route: string;
  onPress: () => void;
}

export const PlaygroundEntryButton = ({
  title,
  description,
  route,
  onPress,
}: PlaygroundEntryButtonProps) => (
  <Pressable
    accessibilityHint={description}
    accessibilityRole="button"
    onPress={onPress}
    style={({ pressed }) => [styles.entry, pressed && styles.entryPressed]}
  >
    <View style={styles.body}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.route}>{route}</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
    <Text style={styles.chevron}>›</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  entry: {
    alignItems: "center",
    backgroundColor: "#151D25",
    borderColor: "#2B3845",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    minHeight: 64,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  entryPressed: {
    borderColor: "#5AC8B7",
  },
  body: {
    flex: 1,
    gap: 4,
  },
  titleRow: {
    alignItems: "baseline",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  title: {
    color: "#F5F7FA",
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 20,
  },
  route: {
    color: "#6F7D8A",
    fontFamily: "monospace",
    fontSize: 11,
    lineHeight: 15,
  },
  description: {
    color: "#9AA7B4",
    fontSize: 12,
    lineHeight: 17,
  },
  chevron: {
    color: "#6F7D8A",
    fontSize: 22,
    lineHeight: 24,
  },
});
