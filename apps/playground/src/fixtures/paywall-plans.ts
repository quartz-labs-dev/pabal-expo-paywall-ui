import type { PurchasesPackageLike } from "@pabal/expo-paywall-ui";
import type { PlaygroundScenario } from "../types/playground";

export const scenarioLabels: Record<PlaygroundScenario, string> = {
  standard: "Monthly + annual",
  annualOnly: "Annual only",
  monthlyOnly: "Monthly only",
  longPrice: "Long price",
};

export const scenarioDescriptions: Record<PlaygroundScenario, string> = {
  standard: "월간과 연간 상품이 모두 있는 기본 페이월입니다.",
  annualOnly: "RevenueCat offering에 연간 상품만 있을 때의 fallback을 확인합니다.",
  monthlyOnly: "RevenueCat offering에 월간 상품만 있을 때의 fallback을 확인합니다.",
  longPrice: "KRW처럼 긴 가격 문자열이 카드 안에서 깨지지 않는지 확인합니다.",
};

export const mockPackages: PurchasesPackageLike[] = [
  {
    identifier: "$rc_monthly",
    packageType: "MONTHLY",
    product: {
      price: 4.99,
      priceString: "$4.99",
      title: "Monthly Pro",
      description: "Flexible access with monthly billing.",
      subscriptionPeriod: "P1M",
    },
  },
  {
    identifier: "$rc_annual",
    packageType: "ANNUAL",
    product: {
      price: 29.99,
      priceString: "$29.99",
      title: "Annual Pro",
      description: "Best for people who use the app every week.",
      subscriptionPeriod: "P1Y",
    },
  },
];

export const longLocalizedPricePackages: PurchasesPackageLike[] = [
  {
    identifier: "$rc_monthly",
    packageType: "MONTHLY",
    product: {
      price: 6900,
      priceString: "KRW 6,900",
      title: "Monthly Pro",
      description: "Cancel anytime.",
      subscriptionPeriod: "P1M",
    },
  },
  {
    identifier: "$rc_annual",
    packageType: "ANNUAL",
    product: {
      price: 49900,
      priceString: "KRW 49,900",
      title: "Annual Pro",
      description: "Lower monthly cost for committed users.",
      subscriptionPeriod: "P1Y",
    },
  },
];

export const getPackagesForScenario = (
  scenario: PlaygroundScenario,
): PurchasesPackageLike[] => {
  if (scenario === "annualOnly") {
    return mockPackages.filter((pack) => pack.identifier === "$rc_annual");
  }
  if (scenario === "monthlyOnly") {
    return mockPackages.filter((pack) => pack.identifier === "$rc_monthly");
  }
  if (scenario === "longPrice") return longLocalizedPricePackages;
  return mockPackages;
};
