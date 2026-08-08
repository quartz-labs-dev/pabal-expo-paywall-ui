import { useEffect, useMemo, useState } from "react";
import { Alert, ImageBackground, StyleSheet, Text, View } from "react-native";
import {
  Paywall,
  PaywallHeroBeforeAfter,
  PaywallHeroCarousel,
  createPaywallPlans,
  getDefaultPaywallCopy,
  getDefaultPaywallPlanOptions,
  getDefaultSelectedPlanId,
  type PaywallConfig,
  type PaywallFeatureComparisonRow,
  type PaywallPlan,
  type PurchasesPackageLike,
} from "pabal-expo-paywall-ui";

import { PlaygroundAmbientGlow } from "../components/PlaygroundAmbientGlow";
import { PlaygroundFloatingHero } from "../components/PlaygroundFloatingHero";
import { getPackagesForScenario } from "../fixtures/paywall-plans";
import { getPlaygroundFreeTrialConfig } from "../fixtures/paywall-trial-policy";
import { playgroundBenefits } from "../fixtures/playground-benefits";
import type {
  PlaygroundPaywallAnimation,
  PlaygroundPaywallProduct,
  PlaygroundFreeTrialMode,
  PlaygroundPaywallFlow,
  PlaygroundLocale,
  PlaygroundScenario,
} from "../types/playground";

interface PhotoHeroProps {
  uri: string;
}

const PhotoHero = ({ uri }: PhotoHeroProps) => {
  return (
    <ImageBackground
      source={{ uri }}
      imageStyle={styles.heroImage}
      style={styles.hero}
    >
      <View />
    </ImageBackground>
  );
};

interface FeatureTitleProps {
  title: string;
}

const FeatureTitle = ({ title }: FeatureTitleProps) => {
  return (
    <View style={styles.featureTitle}>
      <Text style={styles.featureTitleText}>{title}</Text>
    </View>
  );
};

// Check-only comparison variant: every cell is included/excluded.
// circledCheck renders accent-colored checks in tinted circle badges, and
// hidden leaves excluded cells visually empty (a11y labels still apply).
const checkFeatureComparison = {
  freeColumnTitle: "Free",
  paidColumnTitle: "Pro",
  includedStyle: "circledCheck",
  excludedStyle: "hidden",
  rows: [
    {
      id: "current-conditions",
      label: "Current Conditions",
      free: { kind: "included", accessibilityLabel: "Included" },
      paid: { kind: "included", accessibilityLabel: "Included" },
    },
    {
      id: "home-screen-widget",
      label: "Home Screen Widget",
      free: { kind: "excluded", accessibilityLabel: "Not included" },
      paid: { kind: "included", accessibilityLabel: "Included" },
    },
    {
      id: "live-activities",
      label: "Live Activities",
      free: { kind: "excluded", accessibilityLabel: "Not included" },
      paid: { kind: "included", accessibilityLabel: "Included" },
    },
    {
      id: "smart-alerts",
      label: "Smart Alerts",
      free: { kind: "excluded", accessibilityLabel: "Not included" },
      paid: { kind: "included", accessibilityLabel: "Included" },
    },
    {
      id: "watch-complications",
      label: "Watch Complications",
      free: { kind: "excluded", accessibilityLabel: "Not included" },
      paid: { kind: "included", accessibilityLabel: "Included" },
    },
    {
      id: "custom-locations",
      label: "Custom Locations",
      free: { kind: "excluded", accessibilityLabel: "Not included" },
      paid: { kind: "included", accessibilityLabel: "Included" },
    },
  ],
} satisfies PaywallConfig["featureComparison"];

// The nine-row default table, shared by every product that does not bring its
// own comparison. Extracted so the summit preset can reuse the same rows with
// a collapse toggle on top.
const defaultComparisonRows = [
  {
    id: "home-screen-widget",
    label: "Home Screen Widget",
    labelContent: <FeatureTitle title="Home Screen Widget" />,
    free: { kind: "excluded", accessibilityLabel: "Not included" },
    paid: { kind: "included", accessibilityLabel: "Included" },
    onPress: () => Alert.alert("Home Screen Widget details"),
  },
  {
    id: "custom-locations",
    label: "Custom Location Settings",
    free: { kind: "text", text: "3" },
    paid: { kind: "text", text: "\u221e" },
  },
  {
    id: "custom-colors",
    label: "Custom Color Palette Settings",
    free: { kind: "excluded", accessibilityLabel: "Not included" },
    paid: { kind: "included", accessibilityLabel: "Included" },
    onPress: () => Alert.alert("Color palette details"),
  },
  {
    id: "forecast-alerts",
    label: "Forecast Alerts",
    free: { kind: "text", text: "1" },
    paid: { kind: "text", text: "\u221e" },
  },
  {
    id: "saved-observation-notes",
    label: "Saved Observation Notes",
    free: { kind: "text", text: "5" },
    paid: { kind: "text", text: "\u221e" },
  },
  {
    id: "advanced-maps",
    label: "Advanced Map Layers",
    free: { kind: "text", text: "0" },
    paid: { kind: "text", text: "6" },
  },
  {
    id: "historical-activity-timeline",
    label: "Historical Activity Timeline",
    free: { kind: "text", text: "24h" },
    paid: { kind: "text", text: "90d" },
  },
  {
    id: "multi-day-trip-planner",
    label: "Multi-Day Trip Planner",
    free: { kind: "excluded", accessibilityLabel: "Not included" },
    paid: { kind: "included", accessibilityLabel: "Included" },
  },
  {
    id: "priority-data-refresh",
    label: "Priority Data Refresh",
    free: { kind: "text", text: "15m" },
    paid: { kind: "text", text: "5m" },
  },
] satisfies PaywallFeatureComparisonRow[];

// Collapsed comparison variant: the same nine rows, but only the first four
// are shown until the toggle expands the rest. The labels carry the remaining
// count because the package leaves them to the app.
const collapsedFeatureComparison = {
  freeColumnTitle: "Free",
  paidColumnTitle: "Pro",
  collapse: {
    visibleRowCount: 4,
    expandLabel: "Show 5 more features",
    collapseLabel: "Show fewer features",
  },
  rows: defaultComparisonRows,
} satisfies PaywallConfig["featureComparison"];

// Defined before productPresets (which is evaluated at module load, ahead
// of the StyleSheet at the bottom of this file).
const carouselIconStyle = { fontSize: 22, lineHeight: 28 } as const;

// Stand-ins for the real app screens a consuming app drops into a `content`
// slide. They are deliberately wider and taller than an icon: the point of
// `content` is that it is not a glyph in a 48pt bubble.
const ScreenSlide = ({
  accentColor,
  rows,
}: {
  accentColor: string;
  rows: number[];
}) => (
  <View style={screenSlideStyles.card}>
    {rows.map((width, index) => (
      <View
        key={`row-${index}`}
        style={[
          screenSlideStyles.row,
          {
            backgroundColor:
              index === 0 ? accentColor : "rgba(255, 255, 255, 0.16)",
            width: `${width}%`,
          },
        ]}
      />
    ))}
  </View>
);

const screenSlideStyles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 16,
    gap: 8,
    padding: 16,
    width: "100%",
  },
  row: {
    borderRadius: 4,
    height: 10,
  },
});

interface PlaygroundProductPreset {
  hero: PaywallConfig["hero"];
  heroHeightRatio?: PaywallConfig["heroHeightRatio"];
  heroFade: boolean;
  heroLayout?: PaywallConfig["heroLayout"];
  /**
   * Opt out of the ambient glow. Opaque photo heroes cover the glow's
   * strongest part and then reveal it mid-ramp at their bottom edge, so the
   * two read as separate layers instead of one atmosphere.
   */
  ambientGlow?: boolean;
  accentColor: string;
  theme: PaywallConfig["theme"];
  featureComparison?: PaywallConfig["featureComparison"];
}

// Six fake products covering the hero and comparison variants:
// - aurora: opaque photo hero, no ambient glow (see docs/paywall.md), text
//   cells
// - tide: transparent floating-widget hero (glow fully visible), green checks
// - ember: before/after stats hero (Opal style), collapsed comparison table
// - drift: auto-advancing feature carousel hero, green checks
// - atlas: carousel of full-width `content` slides with auto-advance off —
//   the shape an app uses to show real screens rather than icons
// - summit: tall opaque photo hero (heroHeightRatio 0.42, ~2x the 0.23
//   default) with heroFade and heroLayout "pinned" — the hero stays fixed
//   behind the screen while the content sheet rises and scrolls over it, plus
//   a collapsed comparison table
// ember and summit share the collapsed table (4 of 9 rows visible); aurora
// keeps the same rows uncollapsed as the comparison case.
const productPresets: Record<PlaygroundPaywallProduct, PlaygroundProductPreset> =
  {
    aurora: {
      hero: (
        <PhotoHero uri="https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=80" />
      ),
      heroFade: true,
      ambientGlow: false,
      accentColor: "#5AC8B7",
      theme: {
        accentColor: "#5AC8B7",
        backgroundColor: "#05080C",
        primaryTextColor: "#F5F7FA",
      },
    },
    tide: {
      hero: <PlaygroundFloatingHero accentColor="#8B7CFF" />,
      heroFade: false,
      accentColor: "#8B7CFF",
      featureComparison: checkFeatureComparison,
      theme: {
        accentColor: "#8B7CFF",
        accentTextColor: "#120C2E",
        backgroundColor: "#140F2E",
        borderColor: "#3A3170",
        mutedTextColor: "#8E86BE",
        primaryTextColor: "#F4F2FF",
        secondaryTextColor: "#C2BBE8",
        selectedBorderColor: "#8B7CFF",
        selectedSurfaceColor: "#2A2158",
        surfaceColor: "#221B45",
      },
    },
    ember: {
      hero: (
        <PaywallHeroBeforeAfter
          accentColor="#FF9D5C"
          beforeLabel="Before"
          afterLabel="After"
          beforeValue="6h 32m"
          afterValue="1h 49m"
        />
      ),
      heroFade: false,
      accentColor: "#FF9D5C",
      featureComparison: collapsedFeatureComparison,
      theme: {
        accentColor: "#FF9D5C",
        accentTextColor: "#2A1404",
        backgroundColor: "#170D07",
        borderColor: "#45301F",
        mutedTextColor: "#9C8672",
        primaryTextColor: "#FBF4EE",
        secondaryTextColor: "#D8C4B4",
        selectedBorderColor: "#FF9D5C",
        selectedSurfaceColor: "#33200F",
        surfaceColor: "#261510",
      },
    },
    drift: {
      hero: (
        <PaywallHeroCarousel
          accentColor="#5CB8FF"
          slides={[
            {
              icon: <Text style={carouselIconStyle}>⚡</Text>,
              title: "Live Activities",
              description: "Realtime progress on your Home Screen.",
            },
            {
              icon: <Text style={carouselIconStyle}>⏰</Text>,
              title: "Smart Alerts",
              description: "Get notified the moment conditions change.",
            },
            {
              icon: <Text style={carouselIconStyle}>📊</Text>,
              title: "Deep Insights",
              description: "90-day trends across all your data.",
            },
          ]}
        />
      ),
      heroFade: false,
      accentColor: "#5CB8FF",
      featureComparison: checkFeatureComparison,
      theme: {
        accentColor: "#5CB8FF",
        accentTextColor: "#04263D",
        backgroundColor: "#071018",
        borderColor: "#24384E",
        mutedTextColor: "#7E93A8",
        primaryTextColor: "#F2F8FD",
        secondaryTextColor: "#B7C9DA",
        selectedBorderColor: "#5CB8FF",
        selectedSurfaceColor: "#0F2438",
        surfaceColor: "#122031",
      },
    },
    summit: {
      hero: (
        <PhotoHero uri="https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1200&q=80" />
      ),
      heroHeightRatio: 0.42,
      heroFade: true,
      heroLayout: "pinned",
      accentColor: "#D6D9DE",
      featureComparison: collapsedFeatureComparison,
      theme: {
        accentColor: "#D6D9DE",
        accentTextColor: "#15171A",
        backgroundColor: "#0B0C0E",
        borderColor: "#33363B",
        mutedTextColor: "#8B8F96",
        primaryTextColor: "#F5F6F7",
        secondaryTextColor: "#C6C9CE",
        selectedBorderColor: "#D6D9DE",
        selectedSurfaceColor: "#232527",
        surfaceColor: "#191A1C",
      },
    },
    atlas: {
      hero: (
        <PaywallHeroCarousel
          accentColor="#7CE0A3"
          // Off on purpose: `content` slides are screens the user is meant to
          // study, and the hero sits directly above the paywall title, so a
          // slide that advances on its own competes with reading it. The dots
          // are what signal there is more.
          autoAdvanceIntervalMs={0}
          // Fixed so the caption stays at one height while the slides, which
          // have different row counts, swipe past behind it.
          contentHeight={110}
          secondaryTextColor="#7C8A80"
          titleHeight={22}
          slides={[
            {
              key: "widget",
              content: <ScreenSlide accentColor="#7CE0A3" rows={[70, 100, 46]} />,
              title: "Home widget",
            },
            {
              key: "history",
              content: <ScreenSlide accentColor="#7CE0A3" rows={[52, 88, 100, 34]} />,
              title: "Full history",
            },
            {
              key: "trends",
              content: <ScreenSlide accentColor="#7CE0A3" rows={[100, 62, 78]} />,
              title: "Trends",
            },
          ]}
          textColor="#E9F5EE"
        />
      ),
      heroHeightRatio: 0.3,
      heroFade: false,
      accentColor: "#7CE0A3",
      featureComparison: collapsedFeatureComparison,
      theme: {
        accentColor: "#7CE0A3",
        accentTextColor: "#06210F",
        backgroundColor: "#070C09",
        borderColor: "#26332B",
        mutedTextColor: "#7C8A80",
        primaryTextColor: "#EDF6F0",
        secondaryTextColor: "#BACDC0",
        selectedBorderColor: "#7CE0A3",
        selectedSurfaceColor: "#102019",
        surfaceColor: "#111815",
      },
    },
  };

const playgroundPaywallConfig = {
  benefits: playgroundBenefits,
  featureComparison: {
    freeColumnTitle: "Free",
    paidColumnTitle: "Pro",
    rows: defaultComparisonRows,
  },
  reviewSection: {
    reviews: [
      {
        rating: 5,
        quote: "The widget is exactly what I needed for quick aurora checks.",
        author: "App Store review",
      },
      {
        rating: 5,
        quote: "Clean, fast, and useful every time the sky starts moving.",
        author: "App Store review",
      },
    ],
  },
} satisfies Pick<
  PaywallConfig,
  "benefits" | "featureComparison" | "reviewSection"
>;

interface PlaygroundPresentation {
  hero: PaywallConfig["hero"];
  heroHeightRatio?: PaywallConfig["heroHeightRatio"];
  heroFade: boolean;
  heroLayout?: PaywallConfig["heroLayout"];
  backgroundOverlay: PaywallConfig["backgroundOverlay"];
  valueStep: PaywallConfig["valueStep"];
  theme: PaywallConfig["theme"];
  featureComparison: PaywallConfig["featureComparison"];
  copyTitleSegments: PaywallConfig["copy"]["titleSegments"];
}

const getPresentation = (
  product: PlaygroundPaywallProduct,
): PlaygroundPresentation => {
  const preset = productPresets[product];
  const featureComparison =
    preset.featureComparison ?? playgroundPaywallConfig.featureComparison;

  return {
    hero: preset.hero,
    heroHeightRatio: preset.heroHeightRatio,
    heroFade: preset.heroFade,
    heroLayout: preset.heroLayout,
    backgroundOverlay:
      preset.ambientGlow === false ? undefined : (
        <PlaygroundAmbientGlow accentColor={preset.accentColor} />
      ),
    featureComparison,
    valueStep: {
      title: "Get the full Pabal experience",
      titleSegments: [
        "Get the ",
        { text: "full Pabal", emphasized: true },
        " experience",
      ],
      subtitle: "See the value first, then choose a plan on the next step.",
    },
    theme: preset.theme,
    copyTitleSegments: ["Upgrade to ", { text: "Pro", emphasized: true }],
  };
};

interface PaywallPlaygroundScreenProps {
  scenario: PlaygroundScenario;
  selectedLocale: PlaygroundLocale;
  paywallFlow: PlaygroundPaywallFlow;
  paywallAnimation: PlaygroundPaywallAnimation;
  paywallProduct: PlaygroundPaywallProduct;
  freeTrialMode: PlaygroundFreeTrialMode;
  isTrialEligible: boolean;
  onClose: () => void;
}

export const PaywallPlaygroundScreen = ({
  scenario,
  selectedLocale,
  paywallFlow,
  paywallAnimation,
  paywallProduct,
  freeTrialMode,
  isTrialEligible,
  onClose,
}: PaywallPlaygroundScreenProps) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string | undefined>();
  const [isPurchasing, setIsPurchasing] = useState(false);

  const plans = useMemo(() => {
    return createPaywallPlans(
      getPackagesForScenario(scenario),
      {
        ...getDefaultPaywallPlanOptions(selectedLocale),
        annualSelectedDescription:
          "About 90% less than a guided aurora hunt.",
        lifetimeSelectedDescription: "One payment for every aurora season.",
        monthlySelectedDescription:
          "Flexible access for your next aurora window.",
        weeklySelectedDescription:
          "Short-term access for a single aurora trip.",
      },
    );
  }, [scenario, selectedLocale]);

  const designPresentation = useMemo(
    () => getPresentation(paywallProduct),
    [paywallProduct],
  );

  const copy = useMemo(() => {
    return getDefaultPaywallCopy(selectedLocale, {
      title: "Upgrade to Pro",
      titleSegments: designPresentation.copyTitleSegments,
      subtitle: "Unlock every feature.",
    });
  }, [designPresentation.copyTitleSegments, selectedLocale]);

  useEffect(() => {
    setSelectedPlanId((currentPlanId) => {
      const stillExists = plans.some((plan) => plan.id === currentPlanId);
      return stillExists ? currentPlanId : getDefaultSelectedPlanId(plans);
    });
  }, [plans]);

  const handlePurchase = async (plan: PaywallPlan<PurchasesPackageLike>) => {
    setIsPurchasing(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setIsPurchasing(false);

    Alert.alert(
      "Purchase callback",
      `App receives rawPackage.identifier: ${plan.rawPackage.identifier}`,
    );
  };

  return (
    <View style={styles.root}>
      <Paywall
        {...playgroundPaywallConfig}
        hero={designPresentation.hero}
        heroHeightRatio={designPresentation.heroHeightRatio}
        heroLayout={designPresentation.heroLayout}
        backgroundOverlay={designPresentation.backgroundOverlay}
        featureComparison={designPresentation.featureComparison}
        heroFade={designPresentation.heroFade}
        theme={designPresentation.theme}
        valueStep={designPresentation.valueStep}
        copy={copy}
        plans={plans}
        stepMode={paywallFlow}
        animationMode={paywallAnimation}
        freeTrial={getPlaygroundFreeTrialConfig(
          freeTrialMode,
          isTrialEligible,
        )}
        selectedPlanId={selectedPlanId}
        isPurchasing={isPurchasing}
        onSelectPlan={setSelectedPlanId}
        onPurchase={handlePurchase}
        onRestore={() => Alert.alert("Restore callback")}
        onOpenDeveloperWebsite={() => Alert.alert("Developer website callback")}
        onClose={onClose}
        onOpenTerms={() => Alert.alert("Terms callback")}
        onOpenPrivacy={() => Alert.alert("Privacy callback")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  hero: {
    height: "100%",
    justifyContent: "flex-end",
    overflow: "hidden",
    width: "100%",
  },
  heroImage: {},
  featureTitle: {
    alignItems: "center",
    flexDirection: "row",
    flexShrink: 1,
    flexWrap: "wrap",
    gap: 6,
  },
  featureTitleText: {
    color: "#F5F7FA",
    flexShrink: 1,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 19,
    textDecorationLine: "underline",
  },
});
