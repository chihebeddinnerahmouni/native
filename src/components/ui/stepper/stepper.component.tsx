import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../../constants/colors";

export type StepperProps = {
  currentStep: number;
  totalSteps: number;
};

export const Stepper = ({ currentStep, totalSteps }: StepperProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.stepsContainer}>
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <View
              key={stepNumber}
              style={[
                styles.stepLine,
                (isActive || isCompleted) && styles.stepLineActive,
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: colors.bgColor,
  },
  stepsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepLine: {
    flex: 1,
    height: 4,
    backgroundColor: colors.borderColor,
    borderRadius: 2,
  },
  stepLineActive: {
    backgroundColor: colors.primaryColor,
  },
});
