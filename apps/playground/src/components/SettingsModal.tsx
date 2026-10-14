import type { ReactNode } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SettingsModalProps {
  children: ReactNode;
  title: string;
  visible: boolean;
  onClose: () => void;
}

export const SettingsModal = ({
  children,
  title,
  visible,
  onClose,
}: SettingsModalProps) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      animationType="fade"
      onRequestClose={onClose}
      transparent
      visible={visible}
    >
      <View
        style={[
          styles.settingsModalBackdrop,
          {
            paddingBottom: Math.max(insets.bottom, 20),
            paddingTop: Math.max(insets.top, 20),
          },
        ]}
      >
        <View style={styles.settingsModalCard}>
          <View style={styles.settingsModalHeader}>
            <Text style={styles.settingsModalTitle}>{title}</Text>
            <Pressable
              accessibilityRole="button"
              onPress={onClose}
              style={styles.settingsModalCloseButton}
            >
              <Text style={styles.settingsModalCloseButtonText}>Close</Text>
            </Pressable>
          </View>
          <ScrollView
            contentContainerStyle={styles.settingsModalContent}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  settingsModalBackdrop: {
    backgroundColor: "rgba(5, 8, 12, 0.78)",
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 14,
  },
  settingsModalCard: {
    backgroundColor: "#05080C",
    borderColor: "#2B3845",
    borderRadius: 8,
    borderWidth: 1,
    maxHeight: "86%",
    overflow: "hidden",
  },
  settingsModalHeader: {
    alignItems: "center",
    borderBottomColor: "#2B3845",
    borderBottomWidth: 1,
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  settingsModalTitle: {
    color: "#F5F7FA",
    flexShrink: 1,
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 22,
  },
  settingsModalCloseButton: {
    alignItems: "center",
    backgroundColor: "#151D25",
    borderColor: "#2B3845",
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 34,
    paddingHorizontal: 10,
  },
  settingsModalCloseButtonText: {
    color: "#F5F7FA",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 15,
  },
  settingsModalContent: {
    gap: 18,
    padding: 14,
  },
});
