import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { HomeScreen } from "./src/screens/HomeScreen";
import { PaywallPlaygroundScreen } from "./src/screens/PaywallPlaygroundScreen";
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

  return window.location.pathname === "/paywall" ? "paywall" : "home";
};

const pushWebPath = (route: PlaygroundRoute) => {
  if (Platform.OS !== "web" || typeof window?.history?.pushState !== "function") {
    return;
  }

  const nextPath =
    route === "paywall" ? "/paywall" : route === "profile" ? "/profile" : "/";
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
  const [selectedLocale, setSelectedLocale] =
    useState<PlaygroundLocale>("en-US");

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
          onClose={() => navigate("home")}
        />
      ) : route === "profile" ? (
        <ProfilePlaygroundScreen
          scenario={effectiveScenario}
          selectedLocale={selectedLocale}
          onClose={() => navigate("home")}
        />
      ) : (
        <HomeScreen
          scenario={scenario}
          isLongPriceEnabled={isLongPriceEnabled}
          selectedLocale={selectedLocale}
          paywallFlow={paywallFlow}
          paywallAnimation={paywallAnimation}
          freeTrialMode={freeTrialMode}
          onChangeScenario={setScenario}
          onToggleLongPrice={setIsLongPriceEnabled}
          onChangeLocale={setSelectedLocale}
          onChangePaywallFlow={setPaywallFlow}
          onChangePaywallAnimation={setPaywallAnimation}
          onChangeFreeTrialMode={setFreeTrialMode}
          onOpenPaywall={() => navigate("paywall")}
          onOpenProfile={() => navigate("profile")}
        />
      )}
    </SafeAreaProvider>
  );
}
