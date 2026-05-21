import { useEffect, useMemo, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  DEFAULT_PLAYGROUND_ONBOARDING_PLATFORM,
  resolvePlaygroundOnboardingContext,
  type PlaygroundOnboardingPlatform,
} from "./src/components/onboarding-context";
import { PreOnboardingLanguageSelector } from "./src/components/onboarding/PreOnboardingLanguageSelector";
import { HomeScreen } from "./src/screens/HomeScreen";
import { OnboardingPlaygroundScreen } from "./src/screens/OnboardingPlaygroundScreen";
import { PaywallPlaygroundScreen } from "./src/screens/PaywallPlaygroundScreen";
import { PreOnboardingPlaygroundScreen } from "./src/screens/PreOnboardingPlaygroundScreen";
import { ProfilePlaygroundScreen } from "./src/screens/ProfilePlaygroundScreen";
import type {
  PlaygroundFreeTrialMode,
  PlaygroundPaywallAnimation,
  PlaygroundPaywallFlow,
  PlaygroundLocale,
  PlaygroundPackageScenario,
  PlaygroundRoute,
  PlaygroundScenario,
} from "./src/types/playground";

const getInitialRoute = (): PlaygroundRoute => {
  if (Platform.OS !== "web" || typeof window?.location?.pathname !== "string") {
    return "home";
  }

  if (window.location.pathname === "/profile") return "profile";
  if (window.location.pathname === "/onboarding") return "onboarding";
  if (window.location.pathname === "/pre-onboarding") return "preOnboarding";

  return window.location.pathname === "/paywall" ? "paywall" : "home";
};

const pushWebPath = (route: PlaygroundRoute) => {
  if (Platform.OS !== "web" || typeof window?.history?.pushState !== "function") {
    return;
  }

  const nextPath =
    route === "paywall"
      ? "/paywall"
      : route === "profile"
        ? "/profile"
        : route === "onboarding"
          ? "/onboarding"
          : route === "preOnboarding"
            ? "/pre-onboarding"
            : "/";
  if (window.location.pathname === nextPath) return;

  window.history.pushState({ route }, "", nextPath);
};

export default function App() {
  const [route, setRoute] = useState<PlaygroundRoute>(getInitialRoute);
  const [scenario, setScenario] =
    useState<PlaygroundPackageScenario>("standard");
  const [isLongPriceEnabled, setIsLongPriceEnabled] = useState(false);
  const [paywallFlow, setPaywallFlow] =
    useState<PlaygroundPaywallFlow>("twoStep");
  const [paywallAnimation, setPaywallAnimation] =
    useState<PlaygroundPaywallAnimation>("default");
  const [freeTrialMode, setFreeTrialMode] =
    useState<PlaygroundFreeTrialMode>("sevenDays");
  const [isTrialEligible, setIsTrialEligible] = useState(true);
  const [isPreOnboardingLoginPromptVisible, setIsPreOnboardingLoginPromptVisible] =
    useState(true);
  const [onboardingPlatform, setOnboardingPlatform] =
    useState<PlaygroundOnboardingPlatform>(
      DEFAULT_PLAYGROUND_ONBOARDING_PLATFORM,
    );
  const [selectedLocale, setSelectedLocale] =
    useState<PlaygroundLocale>("en-US");
  const onboardingContext = useMemo(
    () =>
      resolvePlaygroundOnboardingContext({
        locale: selectedLocale,
        platform: onboardingPlatform,
      }),
    [onboardingPlatform, selectedLocale],
  );

  useEffect(() => {
    if (Platform.OS !== "web" || typeof window?.addEventListener !== "function") {
      return undefined;
    }

    const handlePopState = () => {
      setRoute(getInitialRoute());
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (nextRoute: PlaygroundRoute) => {
    setRoute(nextRoute);
    pushWebPath(nextRoute);
  };
  const effectiveScenario: PlaygroundScenario = isLongPriceEnabled
    ? "longPrice"
    : scenario;

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      {route === "paywall" ? (
        <PaywallPlaygroundScreen
          scenario={effectiveScenario}
          selectedLocale={selectedLocale}
          paywallFlow={paywallFlow}
          paywallAnimation={paywallAnimation}
          freeTrialMode={freeTrialMode}
          isTrialEligible={isTrialEligible}
          onClose={() => navigate("home")}
        />
      ) : route === "profile" ? (
        <ProfilePlaygroundScreen
          scenario={effectiveScenario}
          selectedLocale={selectedLocale}
          onClose={() => navigate("home")}
        />
      ) : route === "onboarding" ? (
        <OnboardingPlaygroundScreen
          onboardingContext={onboardingContext}
          onClose={() => navigate("home")}
        />
      ) : route === "preOnboarding" ? (
        <PreOnboardingPlaygroundScreen
          isLoginPromptVisible={isPreOnboardingLoginPromptVisible}
          languageSelector={
            <PreOnboardingLanguageSelector
              selectedLocale={selectedLocale}
              theme={onboardingContext.theme}
              onChangeLocale={setSelectedLocale}
            />
          }
          onboardingContext={onboardingContext}
          onContinue={() => navigate("home")}
        />
      ) : (
        <HomeScreen
          scenario={scenario}
          isLongPriceEnabled={isLongPriceEnabled}
          selectedLocale={selectedLocale}
          paywallFlow={paywallFlow}
          paywallAnimation={paywallAnimation}
          onboardingPlatform={onboardingPlatform}
          freeTrialMode={freeTrialMode}
          isTrialEligible={isTrialEligible}
          isPreOnboardingLoginPromptVisible={isPreOnboardingLoginPromptVisible}
          onChangeScenario={setScenario}
          onToggleLongPrice={setIsLongPriceEnabled}
          onToggleTrialEligibility={setIsTrialEligible}
          onTogglePreOnboardingLoginPrompt={
            setIsPreOnboardingLoginPromptVisible
          }
          onChangeLocale={setSelectedLocale}
          onChangePaywallFlow={setPaywallFlow}
          onChangePaywallAnimation={setPaywallAnimation}
          onChangeOnboardingPlatform={setOnboardingPlatform}
          onChangeFreeTrialMode={setFreeTrialMode}
          onOpenOnboarding={() => navigate("onboarding")}
          onOpenPaywall={() => navigate("paywall")}
          onOpenPreOnboarding={() => navigate("preOnboarding")}
          onOpenProfile={() => navigate("profile")}
        />
      )}
    </SafeAreaProvider>
  );
}
