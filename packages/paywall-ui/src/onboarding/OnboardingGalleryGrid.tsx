import { useEffect, useMemo, useRef } from "react";
import {
  Animated,
  Easing,
  Image,
  type ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { getColorWithAlpha } from "../shared/color-utils";
import type { OnboardingContentTheme } from "./types";

export interface OnboardingGalleryGridItem {
  backgroundColor: string;
  id: string;
  imageSource?: ImageSourcePropType;
  title: string;
}

export interface OnboardingGalleryGridProps {
  accessibilityLabel?: string;
  animationDurationMs?: number;
  isBorderVisible?: boolean;
  isEdgeToEdge?: boolean;
  isStageBackgroundVisible?: boolean;
  isTitleVisible?: boolean;
  items: readonly OnboardingGalleryGridItem[];
  rowCount?: number;
  theme: OnboardingContentTheme;
}

interface GalleryGridRowProps {
  animationDurationMs: number;
  direction: GalleryGridRowDirection;
  isBorderVisible: boolean;
  isEdgeToEdge: boolean;
  isTitleVisible: boolean;
  items: readonly OnboardingGalleryGridItem[];
  rowIndex: number;
  textColor: string;
}

type GalleryGridRowDirection = "left" | "right";

const DEFAULT_ROW_COUNT = 3;
const DEFAULT_ANIMATION_DURATION_MS = 16000;
const TILE_WIDTH = 88;
const TILE_HEIGHT = 124;
const TILE_GAP = 10;
const ROW_GAP = 10;

export const OnboardingGalleryGrid = ({
  accessibilityLabel = "Animated content gallery",
  animationDurationMs = DEFAULT_ANIMATION_DURATION_MS,
  isBorderVisible = true,
  isEdgeToEdge = false,
  isStageBackgroundVisible = true,
  isTitleVisible = true,
  items,
  rowCount = DEFAULT_ROW_COUNT,
  theme,
}: OnboardingGalleryGridProps) => {
  const rows = useMemo(
    () => createGalleryRows(items, rowCount),
    [items, rowCount],
  );
  const textColor = theme.primaryTextColor;
  const stageBackgroundColor = getColorWithAlpha(
    theme.cardBackgroundColor,
    0.42,
    theme.backgroundColor,
  );

  return (
    <View
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="image"
      style={[
        styles.root,
        !isEdgeToEdge && styles.constrainedRoot,
        {
          backgroundColor: isStageBackgroundVisible
            ? stageBackgroundColor
            : "transparent",
        },
      ]}
    >
      {rows.map((rowItems, rowIndex) => (
        <GalleryGridRow
          animationDurationMs={animationDurationMs}
          direction={rowIndex === 1 ? "left" : "right"}
          isBorderVisible={isBorderVisible}
          isEdgeToEdge={isEdgeToEdge}
          isTitleVisible={isTitleVisible}
          items={rowItems}
          key={rowIndex}
          rowIndex={rowIndex}
          textColor={textColor}
        />
      ))}
    </View>
  );
};

const GalleryGridRow = ({
  animationDurationMs,
  direction,
  isBorderVisible,
  isEdgeToEdge,
  isTitleVisible,
  items,
  rowIndex,
  textColor,
}: GalleryGridRowProps) => {
  const progress = useRef(new Animated.Value(0)).current;
  const distance = Math.max(items.length, 1) * (TILE_WIDTH + TILE_GAP);
  const rowItems = items.length > 0 ? items : EMPTY_ROW_ITEMS;
  const repeatedItems = [...rowItems, ...rowItems];

  useEffect(() => {
    progress.setValue(0);
    const animation = Animated.loop(
      Animated.timing(progress, {
        duration: animationDurationMs,
        easing: Easing.linear,
        toValue: 1,
        useNativeDriver: true,
      }),
    );

    animation.start();
    return () => animation.stop();
  }, [animationDurationMs, progress, rowIndex]);

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: direction === "right" ? [-distance, 0] : [0, -distance],
  });

  return (
    <View style={styles.rowClip}>
      <Animated.View
        style={[
          styles.rowTrack,
          !isEdgeToEdge && styles.paddedRowTrack,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        {repeatedItems.map((item, index) => (
          <GalleryGridTile
            isBorderVisible={isBorderVisible}
            isTitleVisible={isTitleVisible}
            item={item}
            key={`${rowIndex}-${item.id}-${index}`}
            textColor={textColor}
          />
        ))}
      </Animated.View>
    </View>
  );
};

interface GalleryGridTileProps {
  isBorderVisible: boolean;
  isTitleVisible: boolean;
  item: OnboardingGalleryGridItem;
  textColor: string;
}

const GalleryGridTile = ({
  isBorderVisible,
  isTitleVisible,
  item,
  textColor,
}: GalleryGridTileProps) => {
  return (
    <View
      style={[
        styles.tile,
        {
          backgroundColor: item.backgroundColor,
          borderWidth: isBorderVisible ? 2 : 0,
        },
      ]}
    >
      {item.imageSource ? (
        <Image
          resizeMode="cover"
          source={item.imageSource}
          style={styles.tileImage}
        />
      ) : null}
      {isTitleVisible ? (
        <View
          style={[
            styles.tileTitleLayer,
            Boolean(item.imageSource) && styles.tileTitleLayerOverImage,
          ]}
        >
          <Text
            adjustsFontSizeToFit
            minimumFontScale={0.72}
            numberOfLines={4}
            style={[styles.tileTitle, { color: textColor }]}
          >
            {item.title}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const createGalleryRows = (
  items: readonly OnboardingGalleryGridItem[],
  rowCount: number,
) => {
  const safeRowCount = Math.max(Math.floor(rowCount), 1);
  const rows = Array.from(
    { length: safeRowCount },
    () => [] as OnboardingGalleryGridItem[],
  );

  items.forEach((item, index) => {
    rows[index % safeRowCount].push(item);
  });

  return rows.map((row) => {
    if (row.length >= 4) return row;

    const repetitions = Math.max(Math.ceil(4 / Math.max(row.length, 1)), 1);
    return Array.from({ length: repetitions }, () => row).flat();
  });
};

const EMPTY_ROW_ITEMS: readonly OnboardingGalleryGridItem[] = [
  {
    backgroundColor: "#F1F5F9",
    id: "empty-gallery-item",
    title: "",
  },
];

const styles = StyleSheet.create({
  root: {
    borderRadius: 8,
    gap: ROW_GAP,
    overflow: "hidden",
    paddingVertical: 16,
    width: "100%",
  },
  constrainedRoot: {
    maxWidth: 380,
  },
  rowClip: {
    height: TILE_HEIGHT,
    overflow: "hidden",
    width: "100%",
  },
  rowTrack: {
    flexDirection: "row",
    gap: TILE_GAP,
  },
  paddedRowTrack: {
    paddingHorizontal: TILE_GAP,
  },
  tile: {
    borderColor: "#111111",
    borderRadius: 8,
    borderWidth: 2,
    height: TILE_HEIGHT,
    overflow: "hidden",
    shadowColor: "#111111",
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowOpacity: 0.24,
    shadowRadius: 0,
    width: TILE_WIDTH,
  },
  tileImage: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
  },
  tileTitle: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 16,
  },
  tileTitleLayer: {
    flex: 1,
    padding: 9,
  },
  tileTitleLayerOverImage: {
    backgroundColor: "rgba(255, 255, 255, 0.68)",
    flex: 0,
  },
});
