import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../../constants/colors";

export type StepperProps = {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
};

export const Stepper = ({
  currentStep,
  totalSteps,
  stepTitles,
}: StepperProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.stepsContainer}>
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isLast = index === totalSteps - 1;

          return (
            <View key={stepNumber} style={styles.stepContainer}>
              {!isLast && (
                <View
                  style={[
                    styles.stepLine,
                    (isActive || isCompleted) && styles.stepLineActive,
                  ]}
                />
              )}
              <View style={styles.stepInfo}>
                <View
                  style={[
                    styles.stepCircle,
                    (isActive || isCompleted) && styles.stepCircleActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.stepNumber,
                      (isActive || isCompleted) && styles.stepNumberActive,
                    ]}
                  >
                    {stepNumber}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.stepTitle,
                    (isActive || isCompleted) && styles.stepTitleActive,
                  ]}
                >
                  {stepTitles[index]}
                </Text>
              </View>
            </View>
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
    justifyContent: "space-between",
  },
  stepContainer: {
    flex: 1,
    alignItems: "center",
    position: "relative",
  },
  stepLine: {
    height: 4,
    backgroundColor: colors.borderColor,
    position: "absolute",
    top: 18,
    left: "75%",
    right: "-25%",
    zIndex: 1,
  },
  stepLineActive: {
    backgroundColor: colors.primaryColor,
  },
  stepInfo: {
    alignItems: "center",
    zIndex: 2,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.bgColor,
    borderWidth: 2,
    borderColor: colors.borderColor,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  stepCircleActive: {
    backgroundColor: colors.primaryColor,
    borderColor: colors.primaryColor,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textColor2,
  },
  stepNumberActive: {
    color: colors.bgColor,
  },
  stepTitle: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.textColor2,
    textAlign: "center",
    maxWidth: 80,
  },
  stepTitleActive: {
    color: colors.primaryColor,
    fontWeight: "600",
  },
});
