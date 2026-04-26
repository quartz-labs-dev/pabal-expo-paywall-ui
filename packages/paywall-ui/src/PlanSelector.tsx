import { StyleSheet, View } from "react-native";

import { PlanCard } from "./PlanCard";
import type { PaywallPlan, PaywallTheme } from "./types";

interface PlanSelectorProps<TPackage> {
  plans: PaywallPlan<TPackage>[];
  selectedPlanId?: string;
  shouldAnimate: boolean;
  theme: PaywallTheme;
  onSelectPlan: (planId: string) => void;
}

export const PlanSelector = <TPackage,>({
  plans,
  selectedPlanId,
  shouldAnimate,
  theme,
  onSelectPlan,
}: PlanSelectorProps<TPackage>) => {
  return (
    <View style={styles.container}>
      {plans.map((plan) => (
        <PlanCard
          key={plan.id}
          plan={plan}
          isSelected={plan.id === selectedPlanId}
          shouldAnimate={shouldAnimate}
          theme={theme}
          onPress={() => onSelectPlan(plan.id)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
});
