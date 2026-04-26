import type { PurchasesPackageLike } from "@pabal/expo-paywall-ui";
import type { PlaygroundScenario } from "../types/playground";

type MockPackageType =
  | "UNKNOWN"
  | "CUSTOM"
  | "LIFETIME"
  | "ANNUAL"
  | "SIX_MONTH"
  | "THREE_MONTH"
  | "TWO_MONTH"
  | "MONTHLY"
  | "WEEKLY";

type MockProductCategory = "NON_SUBSCRIPTION" | "SUBSCRIPTION" | "UNKNOWN";

type MockProductType =
  | "CONSUMABLE"
  | "NON_CONSUMABLE"
  | "NON_RENEWABLE_SUBSCRIPTION"
  | "AUTO_RENEWABLE_SUBSCRIPTION"
  | "PREPAID_SUBSCRIPTION"
  | "UNKNOWN";

interface MockPresentedOfferingContext {
  readonly offeringIdentifier: string;
  readonly placementIdentifier: string | null;
  readonly targetingContext: {
    readonly revision: number;
    readonly ruleId: string;
  } | null;
}

interface MockPurchasesStoreProduct {
  readonly identifier: string;
  readonly description: string;
  readonly title: string;
  readonly price: number;
  readonly priceString: string;
  readonly pricePerWeek: number | null;
  readonly pricePerMonth: number | null;
  readonly pricePerYear: number | null;
  readonly pricePerWeekString: string | null;
  readonly pricePerMonthString: string | null;
  readonly pricePerYearString: string | null;
  readonly currencyCode: string;
  readonly introPrice: null;
  readonly discounts: null;
  readonly productCategory: MockProductCategory;
  readonly productType: MockProductType;
  readonly subscriptionPeriod: string | null;
  readonly defaultOption: null;
  readonly subscriptionOptions: null;
  readonly presentedOfferingIdentifier: string | null;
  readonly presentedOfferingContext: MockPresentedOfferingContext | null;
}

export interface MockPurchasesPackage extends PurchasesPackageLike {
  readonly identifier: string;
  readonly packageType: MockPackageType;
  readonly product: MockPurchasesStoreProduct;
  readonly offeringIdentifier: string;
  readonly presentedOfferingContext: MockPresentedOfferingContext;
  readonly webCheckoutUrl: string | null;
}

export interface MockPurchasesOffering {
  readonly identifier: string;
  readonly serverDescription: string;
  readonly metadata: Record<string, unknown>;
  readonly availablePackages: MockPurchasesPackage[];
  readonly lifetime: MockPurchasesPackage | null;
  readonly annual: MockPurchasesPackage | null;
  readonly sixMonth: MockPurchasesPackage | null;
  readonly threeMonth: MockPurchasesPackage | null;
  readonly twoMonth: MockPurchasesPackage | null;
  readonly monthly: MockPurchasesPackage | null;
  readonly weekly: MockPurchasesPackage | null;
  readonly webCheckoutUrl: string | null;
}

export interface MockPurchasesOfferings {
  readonly all: Record<string, MockPurchasesOffering>;
  readonly current: MockPurchasesOffering | null;
}

const createPresentedOfferingContext = (
  offeringIdentifier: string,
): MockPresentedOfferingContext => ({
  offeringIdentifier,
  placementIdentifier: null,
  targetingContext: null,
});

const createStoreProduct = ({
  currencyCode,
  description,
  identifier,
  price,
  pricePerMonth,
  pricePerMonthString,
  pricePerWeek,
  pricePerWeekString,
  pricePerYear,
  pricePerYearString,
  priceString,
  subscriptionPeriod,
  title,
  offeringIdentifier,
}: {
  currencyCode: string;
  description: string;
  identifier: string;
  price: number;
  pricePerMonth: number | null;
  pricePerMonthString: string | null;
  pricePerWeek: number | null;
  pricePerWeekString: string | null;
  pricePerYear: number | null;
  pricePerYearString: string | null;
  priceString: string;
  subscriptionPeriod: string;
  title: string;
  offeringIdentifier: string;
}): MockPurchasesStoreProduct => ({
  identifier,
  description,
  title,
  price,
  priceString,
  pricePerWeek,
  pricePerMonth,
  pricePerYear,
  pricePerWeekString,
  pricePerMonthString,
  pricePerYearString,
  currencyCode,
  introPrice: null,
  discounts: null,
  productCategory: "SUBSCRIPTION",
  productType: "AUTO_RENEWABLE_SUBSCRIPTION",
  subscriptionPeriod,
  defaultOption: null,
  subscriptionOptions: null,
  presentedOfferingIdentifier: offeringIdentifier,
  presentedOfferingContext: createPresentedOfferingContext(offeringIdentifier),
});

const createPackage = ({
  identifier,
  offeringIdentifier,
  packageType,
  product,
}: {
  identifier: string;
  offeringIdentifier: string;
  packageType: MockPackageType;
  product: MockPurchasesStoreProduct;
}): MockPurchasesPackage => ({
  identifier,
  packageType,
  product,
  offeringIdentifier,
  presentedOfferingContext: createPresentedOfferingContext(offeringIdentifier),
  webCheckoutUrl: null,
});

const createOffering = ({
  availablePackages,
  identifier,
  metadata,
  serverDescription,
}: {
  availablePackages: MockPurchasesPackage[];
  identifier: string;
  metadata?: Record<string, unknown>;
  serverDescription: string;
}): MockPurchasesOffering => {
  const annual =
    availablePackages.find((pack) => pack.packageType === "ANNUAL") ?? null;
  const monthly =
    availablePackages.find((pack) => pack.packageType === "MONTHLY") ?? null;

  return {
    identifier,
    serverDescription,
    metadata: metadata ?? {},
    availablePackages,
    lifetime: null,
    annual,
    sixMonth: null,
    threeMonth: null,
    twoMonth: null,
    monthly,
    weekly: null,
    webCheckoutUrl: null,
  };
};

const createOfferings = (
  current: MockPurchasesOffering,
): MockPurchasesOfferings => ({
  all: {
    [current.identifier]: current,
  },
  current,
});

const usdOfferingIdentifier = "default";
const usdMonthlyPackage = createPackage({
  identifier: "$rc_monthly",
  offeringIdentifier: usdOfferingIdentifier,
  packageType: "MONTHLY",
  product: createStoreProduct({
    currencyCode: "USD",
    description: "Flexible access with monthly billing.",
    identifier: "pabal_pro_monthly",
    offeringIdentifier: usdOfferingIdentifier,
    price: 4.99,
    pricePerMonth: 4.99,
    pricePerMonthString: "$4.99",
    pricePerWeek: 1.15,
    pricePerWeekString: "$1.15",
    pricePerYear: 59.88,
    pricePerYearString: "$59.88",
    priceString: "$4.99",
    subscriptionPeriod: "P1M",
    title: "Monthly Pro",
  }),
});

const usdAnnualPackage = createPackage({
  identifier: "$rc_annual",
  offeringIdentifier: usdOfferingIdentifier,
  packageType: "ANNUAL",
  product: createStoreProduct({
    currencyCode: "USD",
    description: "Best for people who use the app every week.",
    identifier: "pabal_pro_annual",
    offeringIdentifier: usdOfferingIdentifier,
    price: 29.99,
    pricePerMonth: 2.5,
    pricePerMonthString: "$2.50",
    pricePerWeek: 0.58,
    pricePerWeekString: "$0.58",
    pricePerYear: 29.99,
    pricePerYearString: "$29.99",
    priceString: "$29.99",
    subscriptionPeriod: "P1Y",
    title: "Annual Pro",
  }),
});

const krwOfferingIdentifier = "localized_kr";
const krwMonthlyPackage = createPackage({
  identifier: "$rc_monthly",
  offeringIdentifier: krwOfferingIdentifier,
  packageType: "MONTHLY",
  product: createStoreProduct({
    currencyCode: "KRW",
    description: "Cancel anytime.",
    identifier: "pabal_pro_monthly_kr",
    offeringIdentifier: krwOfferingIdentifier,
    price: 6900,
    pricePerMonth: 6900,
    pricePerMonthString: "KRW 6,900",
    pricePerWeek: 1592,
    pricePerWeekString: "KRW 1,592",
    pricePerYear: 82800,
    pricePerYearString: "KRW 82,800",
    priceString: "KRW 6,900",
    subscriptionPeriod: "P1M",
    title: "Monthly Pro",
  }),
});

const krwAnnualPackage = createPackage({
  identifier: "$rc_annual",
  offeringIdentifier: krwOfferingIdentifier,
  packageType: "ANNUAL",
  product: createStoreProduct({
    currencyCode: "KRW",
    description: "Lower monthly cost for committed users.",
    identifier: "pabal_pro_annual_kr",
    offeringIdentifier: krwOfferingIdentifier,
    price: 49900,
    pricePerMonth: 4158,
    pricePerMonthString: "KRW 4,158",
    pricePerWeek: 960,
    pricePerWeekString: "KRW 960",
    pricePerYear: 49900,
    pricePerYearString: "KRW 49,900",
    priceString: "KRW 49,900",
    subscriptionPeriod: "P1Y",
    title: "Annual Pro",
  }),
});

const standardOffering = createOffering({
  identifier: usdOfferingIdentifier,
  serverDescription: "Default monthly and annual subscription offering.",
  metadata: {
    paywallVariant: "standard",
  },
  availablePackages: [usdMonthlyPackage, usdAnnualPackage],
});

const annualOnlyOffering = createOffering({
  identifier: "annual_only",
  serverDescription: "Offering with only an annual package.",
  availablePackages: [
    {
      ...usdAnnualPackage,
      offeringIdentifier: "annual_only",
      presentedOfferingContext: createPresentedOfferingContext("annual_only"),
    },
  ],
});

const monthlyOnlyOffering = createOffering({
  identifier: "monthly_only",
  serverDescription: "Offering with only a monthly package.",
  availablePackages: [
    {
      ...usdMonthlyPackage,
      offeringIdentifier: "monthly_only",
      presentedOfferingContext: createPresentedOfferingContext("monthly_only"),
    },
  ],
});

const longPriceOffering = createOffering({
  identifier: krwOfferingIdentifier,
  serverDescription: "Offering with long localized KRW price strings.",
  metadata: {
    locale: "ko-KR",
  },
  availablePackages: [krwMonthlyPackage, krwAnnualPackage],
});

export const mockRevenueCatOfferingsByScenario: Record<
  PlaygroundScenario,
  MockPurchasesOfferings
> = {
  standard: createOfferings(standardOffering),
  annualOnly: createOfferings(annualOnlyOffering),
  monthlyOnly: createOfferings(monthlyOnlyOffering),
  longPrice: createOfferings(longPriceOffering),
};

export const getMockRevenueCatOfferings = (
  scenario: PlaygroundScenario,
): MockPurchasesOfferings => mockRevenueCatOfferingsByScenario[scenario];

export const getMockRevenueCatOffering = (
  scenario: PlaygroundScenario,
): MockPurchasesOffering => {
  const offering = getMockRevenueCatOfferings(scenario).current;
  if (offering === null) {
    throw new Error(`Missing mock RevenueCat offering for scenario: ${scenario}`);
  }

  return offering;
};

export const getMockRevenueCatPackages = (
  scenario: PlaygroundScenario,
): MockPurchasesPackage[] =>
  getMockRevenueCatOffering(scenario).availablePackages;
