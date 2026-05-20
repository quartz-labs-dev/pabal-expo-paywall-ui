import {
  StyleSheet,
  type StyleProp,
  Text,
  View,
  type ViewStyle,
} from "react-native";

import { getDefaultPermissionPromptCopy } from "../locales/onboarding";

export type PermissionPromptPreviewPlatform = "ios" | "android";

export interface PermissionPromptPreviewProps {
  platform: PermissionPromptPreviewPlatform;
  title: string;
  message?: string;
  locale?: string;
  primaryColor?: string;
}

const DEFAULT_PRIMARY_COLOR = "#007AFF";
const IOS_SYSTEM_BLUE = "#007AFF";

export const PermissionPromptPreview = ({
  platform,
  title,
  message,
  locale,
  primaryColor = DEFAULT_PRIMARY_COLOR,
}: PermissionPromptPreviewProps) => {
  const copy = getDefaultPermissionPromptCopy(locale);

  return (
    <View style={styles.root} pointerEvents="none">
      {platform === "android" ? (
        <AndroidPrompt
          allowLabel={copy.allowButton}
          denyLabel={copy.denyButton}
          message={message}
          title={title}
        />
      ) : (
        <IosPrompt
          allowLabel={copy.allowButton}
          denyLabel={copy.denyButton}
          message={message}
          title={title}
        />
      )}
      <PromptArrow
        color={primaryColor}
        style={platform === "android" ? styles.androidArrow : styles.iosArrow}
      />
    </View>
  );
};

interface PromptViewProps {
  allowLabel: string;
  denyLabel: string;
  message?: string;
  title: string;
}

const IosPrompt = ({
  allowLabel,
  denyLabel,
  message,
  title,
}: PromptViewProps) => {
  return (
    <View style={styles.iosCard}>
      <View style={styles.iosCopy}>
        <Text style={styles.iosTitle}>{title}</Text>
        {message ? <Text style={styles.iosMessage}>{message}</Text> : undefined}
      </View>
      <View style={styles.iosButtonRow}>
        <View style={styles.iosButton}>
          <Text style={styles.iosDenyText}>{denyLabel}</Text>
        </View>
        <View style={styles.iosButtonDivider} />
        <View style={styles.iosButton}>
          <Text style={styles.iosAllowText}>{allowLabel}</Text>
        </View>
      </View>
    </View>
  );
};

const AndroidPrompt = ({
  allowLabel,
  denyLabel,
  message,
  title,
}: PromptViewProps) => {
  return (
    <View style={styles.androidCard}>
      <Text style={styles.androidTitle}>{title}</Text>
      {message ? <Text style={styles.androidMessage}>{message}</Text> : undefined}
      <View style={styles.androidButtonRow}>
        <Text style={styles.androidDenyButtonText}>{denyLabel}</Text>
        <Text style={styles.androidButtonText}>{allowLabel}</Text>
      </View>
    </View>
  );
};

interface PromptArrowProps {
  color: string;
  style?: StyleProp<ViewStyle>;
}

const PromptArrow = ({ color, style }: PromptArrowProps) => {
  return (
    <View style={[styles.arrow, style]}>
      <Text
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={[styles.arrowGlyph, { color }]}
      >
        👆
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    alignSelf: "stretch",
    gap: 12,
    justifyContent: "center",
  },
  iosCard: {
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#D7D7DB",
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    maxWidth: 292,
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOffset: { height: 8, width: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 22,
    width: "100%",
  },
  iosCopy: {
    alignItems: "center",
    gap: 6,
    paddingBottom: 14,
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  iosTitle: {
    color: "#242428",
    flexShrink: 1,
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
    textAlign: "center",
  },
  iosMessage: {
    color: "#5F6267",
    flexShrink: 1,
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 17,
    textAlign: "center",
  },
  iosButtonRow: {
    borderColor: "#D7D7DB",
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    minHeight: 46,
  },
  iosButton: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    minWidth: 0,
    paddingHorizontal: 10,
  },
  iosButtonDivider: {
    backgroundColor: "#D7D7DB",
    width: StyleSheet.hairlineWidth,
  },
  iosAllowText: {
    color: IOS_SYSTEM_BLUE,
    flexShrink: 1,
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
    textAlign: "center",
  },
  iosDenyText: {
    color: "#8E8E93",
    flexShrink: 1,
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 20,
    textAlign: "center",
  },
  androidCard: {
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    elevation: 8,
    gap: 14,
    maxWidth: 320,
    paddingBottom: 8,
    paddingHorizontal: 24,
    paddingTop: 22,
    shadowColor: "#000000",
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    width: "100%",
  },
  androidTitle: {
    color: "#202124",
    flexShrink: 1,
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 24,
  },
  androidMessage: {
    color: "#5F6368",
    flexShrink: 1,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },
  androidButtonRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 24,
    justifyContent: "flex-end",
    minHeight: 44,
  },
  androidButtonText: {
    color: IOS_SYSTEM_BLUE,
    flexShrink: 1,
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 20,
    textAlign: "center",
    textTransform: "uppercase",
  },
  androidDenyButtonText: {
    color: "#5F6368",
    flexShrink: 1,
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 20,
    textAlign: "center",
    textTransform: "uppercase",
  },
  arrow: {
    alignItems: "center",
    height: 58,
    justifyContent: "center",
    width: 44,
  },
  arrowGlyph: {
    fontSize: 40,
    lineHeight: 48,
    textAlign: "center",
  },
  iosArrow: {
    transform: [{ translateX: 73 }],
  },
  androidArrow: {
    transform: [{ translateX: 112 }],
  },
});
