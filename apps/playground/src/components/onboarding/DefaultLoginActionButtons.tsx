import { Pressable, StyleSheet, Text, View } from "react-native";

import type { PlaygroundOnboardingTheme } from "../onboarding-theme";
import {
  createDefaultLoginActions,
  type PlaygroundOnboardingPlatform,
} from "../../utils/onboarding-platform";

interface DefaultLoginActionButtonsProps {
  platform: PlaygroundOnboardingPlatform;
  theme: Required<PlaygroundOnboardingTheme>;
  onComplete: () => void;
}

export const DefaultLoginActionButtons = ({
  platform,
  theme,
  onComplete,
}: DefaultLoginActionButtonsProps) => {
  const defaultLoginActions = createDefaultLoginActions(platform);

  return (
    <View style={styles.defaultLoginActions}>
      {defaultLoginActions.map((label, index) => {
        const isPrimary = index === 0;

        return (
          <Pressable
            key={label}
            accessibilityRole="button"
            onPress={onComplete}
            style={[
              styles.defaultLoginActionButton,
              {
                backgroundColor: isPrimary
                  ? theme.buttonBackgroundColor
                  : theme.backgroundColor,
                borderColor: isPrimary
                  ? theme.buttonBackgroundColor
                  : theme.frameBackgroundColor,
              },
            ]}
          >
            <Text
              style={[
                styles.defaultLoginActionButtonText,
                {
                  color: isPrimary
                    ? theme.buttonTextColor
                    : theme.primaryTextColor,
                },
              ]}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  defaultLoginActions: {
    gap: 10,
    justifyContent: "center",
    width: "100%",
  },
  defaultLoginActionButton: {
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 52,
    paddingHorizontal: 16,
  },
  defaultLoginActionButtonText: {
    flexShrink: 1,
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 21,
    textAlign: "center",
  },
});
