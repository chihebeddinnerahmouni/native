import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import { TextBody } from "./texts/Texts.component";
import colors from "../../constants/colors";

type IconLabelValueProps = {
  icon?: ReactNode;
  label?: string;
  value: string | number | ReactNode;
  labelStyle?: object;
  valueStyle?: object;
  containerStyle?: object;
};

export const IconLabelValue: React.FC<IconLabelValueProps> = ({
  icon,
  label,
  value,
  labelStyle,
  valueStyle,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.leftSection}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        {label && (
          <TextBody style={[styles.label, labelStyle]}>{label}</TextBody>
        )}
      </View>

      <View style={styles.centerSection}>
        <TextBody style={[styles.value, valueStyle]} numberOfLines={1}>
          {value}
        </TextBody>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  centerSection: {
    flex: 1,
    alignItems: "flex-start",
  },
  iconContainer: {
    marginRight: 8,
  },
  label: {
    fontSize: 14,
    color: colors.textColor2,
    fontWeight: "400",
  },
  value: {
    fontSize: 14,
    color: colors.textColor,
    fontWeight: "500",
  },
});
