import type { PlaygroundScenario } from "../types/playground";
import { getMockRevenueCatPackages } from "./revenuecat-mock-data";

export const scenarioLabels: Record<PlaygroundScenario, string> = {
  standard: "Monthly + annual",
  annualOnly: "Annual only",
  monthlyOnly: "Monthly only",
  longPrice: "Long price",
};

export const scenarioDescriptions: Record<PlaygroundScenario, string> = {
  standard: "Default offering with both monthly and annual packages.",
  annualOnly: "Checks fallback behavior when the offering has only annual.",
  monthlyOnly: "Checks fallback behavior when the offering has only monthly.",
  longPrice: "Checks whether long localized KRW price strings fit cleanly.",
};

export const getPackagesForScenario = getMockRevenueCatPackages;
