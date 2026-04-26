import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { HomeScreen } from "./src/screens/HomeScreen";
import { PaywallPlaygroundScreen } from "./src/screens/PaywallPlaygroundScreen";
import type {
  PlaygroundRoute,
  PlaygroundScenario,
} from "./src/types/playground";

const getInitialRoute = (): PlaygroundRoute => {
  if (typeof window === "undefined") return "home";
  return window.location.pathname === "/paywall" ? "paywall" : "home";
};

const pushWebPath = (route: PlaygroundRoute) => {
  if (typeof window === "undefined") return;

  const nextPath = route === "paywall" ? "/paywall" : "/";
  if (window.location.pathname === nextPath) return;

  window.history.pushState({ route }, "", nextPath);
};

export default function App() {
  const [route, setRoute] = useState<PlaygroundRoute>(getInitialRoute);
  const [scenario, setScenario] = useState<PlaygroundScenario>("standard");

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

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
          onClose={() => navigate("home")}
        />
      ) : (
        <HomeScreen
          scenario={scenario}
          onChangeScenario={setScenario}
          onOpenPaywall={() => navigate("paywall")}
        />
      )}
    </SafeAreaProvider>
  );
}
