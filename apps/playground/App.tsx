import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { HomeScreen } from "./src/screens/HomeScreen";
import { PaywallPlaygroundScreen } from "./src/screens/PaywallPlaygroundScreen";
import type {
  PlaygroundPaywallFlow,
  PlaygroundRoute,
  PlaygroundScenario,
} from "./src/types/playground";

const getInitialRoute = (): PlaygroundRoute => {
  if (Platform.OS !== "web" || typeof window?.location?.pathname !== "string") {
    return "home";
  }

  return window.location.pathname === "/paywall" ? "paywall" : "home";
};

const pushWebPath = (route: PlaygroundRoute) => {
  if (Platform.OS !== "web" || typeof window?.history?.pushState !== "function") {
    return;
  }

  const nextPath = route === "paywall" ? "/paywall" : "/";
  if (window.location.pathname === nextPath) return;

  window.history.pushState({ route }, "", nextPath);
};

export default function App() {
  const [route, setRoute] = useState<PlaygroundRoute>(getInitialRoute);
  const [scenario, setScenario] = useState<PlaygroundScenario>("standard");
  const [paywallFlow, setPaywallFlow] =
    useState<PlaygroundPaywallFlow>("twoStep");

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

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      {route === "paywall" ? (
        <PaywallPlaygroundScreen
          scenario={scenario}
          paywallFlow={paywallFlow}
          onClose={() => navigate("home")}
        />
      ) : (
        <HomeScreen
          scenario={scenario}
          paywallFlow={paywallFlow}
          onChangeScenario={setScenario}
          onChangePaywallFlow={setPaywallFlow}
          onOpenPaywall={() => navigate("paywall")}
        />
      )}
    </SafeAreaProvider>
  );
}
