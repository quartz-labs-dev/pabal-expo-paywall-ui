import type { ReactNode } from "react";

export type PaywallPlanPeriod = "monthly" | "annual";

export interface PaywallPlan<TPackage = unknown> {
  id: string;
  period: PaywallPlanPeriod;
  title: string;
  priceText: string;
  monthlyPriceText?: string;
  discountText?: string;
  badgeText?: string;
  description?: string;
  isRecommended?: boolean;
  rawPackage: TPackage;
}

export interface PaywallCopy {
  title: string;
  subtitle?: string;
  purchaseButton: string;
  purchasingButton?: string;
  restoreButton: string;
  termsText: string;
  privacyText: string;
  legalPrefix?: string;
}

export interface PaywallTheme {
  backgroundColor: string;
  surfaceColor: string;
  selectedSurfaceColor: string;
  borderColor: string;
  selectedBorderColor: string;
  primaryTextColor: string;
  secondaryTextColor: string;
  accentColor: string;
  accentTextColor: string;
  mutedTextColor: string;
}

export interface PaywallProps<TPackage = unknown> {
  plans: PaywallPlan<TPackage>[];
  hero: ReactNode;
  heroHeightRatio?: number;
  benefits: string[];
  copy: PaywallCopy;
  selectedPlanId?: string;
  theme?: Partial<PaywallTheme>;
  isPurchasing?: boolean;
  onSelectPlan: (planId: string) => void;
  onPurchase: (plan: PaywallPlan<TPackage>) => Promise<void> | void;
  onRestore: () => Promise<void> | void;
  onClose: () => void;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
}

export interface PurchasesPackageLike {
  identifier: string;
  packageType?: string;
  product: {
    price: number;
    priceString: string;
    title?: string;
    description?: string;
    subscriptionPeriod?: string | null;
  };
}

export interface CreatePaywallPlansOptions {
  monthlyPackageIds?: string[];
  annualPackageIds?: string[];
  monthlyTitle?: string;
  annualTitle?: string;
  monthlyDescription?: string;
  annualDescription?: string;
  annualBadgeText?: string;
  recommendedPeriod?: PaywallPlanPeriod;
  displayOrder?: PaywallPlanPeriod[];
}
