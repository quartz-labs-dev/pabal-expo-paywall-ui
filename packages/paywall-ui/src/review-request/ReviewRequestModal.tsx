import {
  Image,
  Modal,
  Pressable,
  type StyleProp,
  StyleSheet,
  Text,
  type TextStyle,
  View,
  type ImageSourcePropType,
  type ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { getColorWithAlpha } from "../shared/color-utils";
import { mergePaywallTheme } from "../shared/theme";
import type { PaywallTheme, ReviewRequestModalProps } from "../types";

export const defaultReviewRequestProfileImage =
  require("../assets/retriever.webp") as ImageSourcePropType;

const DEFAULT_DEVELOPER_NAME = "Quartz";
const MODAL_HORIZONTAL_MARGIN = 20;

export const ReviewRequestModal = ({
  visible,
  copy,
  developerName = DEFAULT_DEVELOPER_NAME,
  profileImageSource = defaultReviewRequestProfileImage,
  styles: styleOverrides,
  theme: themeOverride,
  isRequestingReview = false,
  isRequestingFeedback = false,
  isDismissing = false,
  onRequestReview,
  onRequestFeedback,
  onDismiss,
  onPressProfileMessage,
  showPlayButton = false,
}: ReviewRequestModalProps) => {
  const insets = useSafeAreaInsets();
  const theme = mergePaywallTheme(themeOverride);
  const hasProfileAction = Boolean(onPressProfileMessage);
  const title =
    copy.title ?? `Hi, I'm ${developerName}, the developer of the app 👋`;
  const profileAccessibilityLabel =
    copy.profileImageAccessibilityLabel ?? title;
  const playAccessibilityLabel =
    copy.playButtonAccessibilityLabel ?? profileAccessibilityLabel;

  return (
    <Modal
      animationType="fade"
      onRequestClose={onDismiss}
      transparent
      visible={visible}
    >
      <View
        style={[
          styles.backdrop,
          {
            paddingBottom: Math.max(insets.bottom, 18),
            paddingTop: Math.max(insets.top, 18),
          },
          styleOverrides?.backdrop,
        ]}
      >
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.surfaceColor,
              borderColor: getColorWithAlpha(theme.primaryTextColor, 0.12),
            },
            styleOverrides?.card,
          ]}
        >
          <View style={[styles.copyGroup, styleOverrides?.copyGroup]}>
            <Text
              style={[
                styles.title,
                { color: theme.primaryTextColor },
                styleOverrides?.title,
              ]}
            >
              {title}
            </Text>
            <Text
              style={[
                styles.message,
                { color: theme.secondaryTextColor },
                styleOverrides?.message,
              ]}
            >
              {copy.message}
            </Text>
          </View>

          <Pressable
            accessibilityLabel={
              hasProfileAction ? playAccessibilityLabel : profileAccessibilityLabel
            }
            accessibilityRole={hasProfileAction ? "button" : "image"}
            disabled={!hasProfileAction}
            onPress={onPressProfileMessage}
            style={({ pressed }) => [
              styles.profileButton,
              {
                opacity: pressed ? 0.86 : 1,
              },
              styleOverrides?.profileButton,
            ]}
          >
            <Image
              accessibilityIgnoresInvertColors
              source={profileImageSource}
              style={[styles.profileImage, styleOverrides?.profileImage]}
            />
            {showPlayButton ? (
              <View
                pointerEvents="none"
                style={[
                  styles.playButton,
                  {
                    backgroundColor: getColorWithAlpha(theme.accentColor, 0.88),
                  },
                  styleOverrides?.playButton,
                ]}
              >
                <View
                  style={[
                    styles.playTriangle,
                    {
                      borderLeftColor: theme.accentTextColor,
                    },
                    styleOverrides?.playTriangle,
                  ]}
                />
              </View>
            ) : null}
          </Pressable>

          <View style={[styles.actionGroup, styleOverrides?.actionGroup]}>
            <ModalActionButton
              isLoading={isRequestingReview}
              label={copy.satisfiedButton}
              style={styleOverrides?.primaryButton}
              textStyle={styleOverrides?.primaryButtonText}
              theme={theme}
              variant="primary"
              onPress={onRequestReview}
            />
            <ModalActionButton
              isLoading={isRequestingFeedback}
              label={copy.feedbackButton}
              style={styleOverrides?.secondaryButton}
              textStyle={styleOverrides?.secondaryButtonText}
              theme={theme}
              variant="secondary"
              onPress={onRequestFeedback}
            />
            <ModalActionButton
              isLoading={isDismissing}
              label={copy.laterButton}
              style={styleOverrides?.laterButton}
              textStyle={styleOverrides?.laterButtonText}
              theme={theme}
              variant="ghost"
              onPress={onDismiss}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

interface ModalActionButtonProps {
  isLoading: boolean;
  label: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  theme: PaywallTheme;
  variant: "primary" | "secondary" | "ghost";
  onPress: () => Promise<void> | void;
}

const ModalActionButton = ({
  isLoading,
  label,
  style,
  textStyle,
  theme,
  variant,
  onPress,
}: ModalActionButtonProps) => {
  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isLoading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionButton,
        isPrimary && {
          backgroundColor: theme.primaryTextColor,
          borderColor: theme.primaryTextColor,
        },
        isSecondary && {
          backgroundColor: "transparent",
          borderColor: getColorWithAlpha(theme.primaryTextColor, 0.28),
        },
        variant === "ghost" && styles.ghostActionButton,
        {
          opacity: pressed || isLoading ? 0.76 : 1,
        },
        style,
      ]}
    >
      <Text
        numberOfLines={2}
        style={[
          styles.actionButtonText,
          {
            color: isPrimary
              ? theme.backgroundColor
              : isSecondary
                ? theme.primaryTextColor
                : theme.secondaryTextColor,
          },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    alignItems: "center",
    backgroundColor: "rgba(5, 8, 12, 0.66)",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: MODAL_HORIZONTAL_MARGIN,
  },
  card: {
    alignItems: "center",
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    elevation: 10,
    gap: 16,
    maxWidth: 390,
    paddingHorizontal: 20,
    paddingVertical: 22,
    shadowColor: "#000000",
    shadowOffset: {
      height: 18,
      width: 0,
    },
    shadowOpacity: 0.18,
    shadowRadius: 28,
    width: "100%",
  },
  copyGroup: {
    alignItems: "center",
    gap: 12,
    width: "100%",
  },
  title: {
    flexShrink: 1,
    fontSize: 21,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 26,
    textAlign: "center",
  },
  message: {
    flexShrink: 1,
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0,
    lineHeight: 20,
    textAlign: "center",
  },
  profileButton: {
    alignItems: "center",
    height: 84,
    justifyContent: "center",
    width: 84,
  },
  profileImage: {
    borderRadius: 38,
    height: 76,
    width: 76,
  },
  playButton: {
    alignItems: "center",
    borderRadius: 66,
    height: 132,
    justifyContent: "center",
    position: "absolute",
    width: 132,
  },
  playTriangle: {
    borderBottomColor: "transparent",
    borderBottomWidth: 27,
    borderLeftWidth: 43,
    borderTopColor: "transparent",
    borderTopWidth: 27,
    height: 0,
    marginLeft: 10,
    width: 0,
  },
  actionGroup: {
    gap: 8,
    width: "100%",
  },
  actionButton: {
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 46,
    paddingHorizontal: 16,
    paddingVertical: 9,
    width: "100%",
  },
  actionButtonText: {
    flexShrink: 1,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 19,
    textAlign: "center",
  },
  ghostActionButton: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    minHeight: 38,
    paddingVertical: 8,
  },
});
