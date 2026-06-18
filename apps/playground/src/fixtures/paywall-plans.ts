import type {
  PlaygroundPackageScenario,
  PlaygroundScenario,
} from "../types/playground";
import { getMockRevenueCatPackages } from "./revenuecat-mock-data";

export const packageScenarioLabels: Record<PlaygroundPackageScenario, string> = {
  lifetimeOnly: "Lifetime only",
  standard: "Monthly + annual",
  weeklyAnnual: "Weekly + annual",
  weeklyOnly: "Weekly only",
};

export const packageScenarioDescriptions: Record<
  PlaygroundPackageScenario,
  string
> = {
  lifetimeOnly: "Checks fallback behavior when the offering has only lifetime.",
  standard: "Default offering with both monthly and annual packages.",
  weeklyAnnual: "Checks a subscription offering with weekly and annual packages.",
  weeklyOnly: "Checks fallback behavior when the offering has only weekly.",
};

export const scenarioLabels: Record<PlaygroundScenario, string> = {
  ...packageScenarioLabels,
  annualOnly: "Annual only",
  longPrice: "Long price",
  monthlyOnly: "Monthly only",
};

export const scenarioDescriptions: Record<PlaygroundScenario, string> = {
  ...packageScenarioDescriptions,
  annualOnly: "Checks fallback behavior when the offering has only annual.",
  longPrice: "Checks whether long localized KRW price strings fit cleanly.",
  monthlyOnly: "Checks fallback behavior when the offering has only monthly.",
};

export const getPackagesForScenario = getMockRevenueCatPackages;
