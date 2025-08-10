import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { formatCurrency } from "../../../../utils";
import { TextBody } from "../../../ui/texts/Texts.component";
import colors from "../../../../constants/colors";

interface ProgressBarProps {
  value?: number;
}

interface MonthlySummary {
  rentedDays: number;
  availableDays: number;
  numberOfDays: number;
  revenue: number;
  target?: number;
  rentedDaysPercentage: number;
  availableDaysPercentage: number;
  revenuePercentage: number;
}

interface TargetGroupProps {
  monthlySummary: MonthlySummary;
}

export const TargetGroup: React.FC<TargetGroupProps> = ({ monthlySummary }) => {
  return (
    <ScrollView
      style={styles.targetGroup}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Days rented */}
      <View style={styles.targetContainer}>
        <TextBody style={styles.title}>Days rented</TextBody>
        <TextBody style={styles.numbers}>
          <TextBody style={styles.green}>{monthlySummary.rentedDays}</TextBody>{" "}
          / {monthlySummary.availableDays} days
        </TextBody>
        <ProgressBar value={monthlySummary.rentedDaysPercentage} />
        <TextBody style={styles.revenue}>
          {" "}
          <TextBody style={styles.revenuePercent}>
            {monthlySummary.revenue}%
          </TextBody>{" "}
          vs last month
        </TextBody>
      </View>

      {/* Days available */}
      <View style={styles.targetContainer}>
        <TextBody style={styles.title}>Days available</TextBody>
        <TextBody style={styles.numbers}>
          <TextBody style={styles.green}>
            {monthlySummary.availableDays}
          </TextBody>{" "}
          / {monthlySummary.numberOfDays} days
        </TextBody>
        <ProgressBar value={monthlySummary.availableDaysPercentage} />
        <TextBody style={styles.revenue}>
          {" "}
          <TextBody style={styles.revenuePercent}>
            {monthlySummary.revenue}%
          </TextBody>{" "}
          vs last month
        </TextBody>
      </View>

      {/* Revenue / target */}
      <View style={styles.targetContainer}>
        <TextBody style={styles.title}>Revenue / target</TextBody>
        <TextBody style={styles.numbers}>
          <TextBody style={styles.green}>
            {formatCurrency(monthlySummary.revenue)}
          </TextBody>
          / {formatCurrency(monthlySummary.target || 0)}
        </TextBody>
        <ProgressBar value={monthlySummary.revenuePercentage} />
        <TextBody style={styles.revenue}>
          {" "}
          <TextBody style={styles.revenuePercent}>
            {monthlySummary.revenue}%
          </TextBody>{" "}
          vs last month
        </TextBody>
      </View>
    </ScrollView>
  );
};

const ProgressBar: React.FC<ProgressBarProps> = ({ value = 0 }) => {
  const getStatusColor = (val: number) => {
    if (val < 30) return colors.errorColor;
    if (val < 100) return colors.warningColor;
    return colors.primaryColor;
  };

  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressBar,
            {
              width: `${Math.ceil(value)}%`,
              backgroundColor: getStatusColor(value),
            },
          ]}
        />
      </View>
      <TextBody style={styles.percentText}>{Math.ceil(value)}%</TextBody>
    </View>
  );
};

const styles = StyleSheet.create({
  targetGroup: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  scrollContent: {
    paddingRight: 16,
  },
  targetContainer: {
    width: 185,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderColor,
    backgroundColor: colors.bgColor,
    marginRight: 13,
  },
  title: {
    color: colors.textColor,
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    marginBottom: 8,
  },
  numbers: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.textColor,
    marginBottom: 8,
  },
  green: {
    color: colors.primaryColor,
  },
  revenue: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.textColor,
    marginTop: 8,
  },
  revenuePercent: {
    color: colors.primaryColor,
  },
  // ProgressBar styles
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 4,
  },
  progressTrack: {
    flex: 1,
    height: 7,
    backgroundColor: colors.emptyBgColor,
    borderRadius: 3.5,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 3.5,
  },
  percentText: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.textColor2,
    minWidth: 35,
    textAlign: "right",
  },
});

// export default TargetGroup;
