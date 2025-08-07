import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import { TextBody } from "./texts/Texts.component";
import colors from "../../constants/colors";

type IconLabelValueProps = {
  icon?: ReactNode;
  label?: string;
  value: string | number;
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
    <View style={[styles.container, styles.horizontal, containerStyle]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}

      <View style={styles.textContainerHorizontal}>
        {label && (
          <TextBody style={[styles.label, labelStyle]}>{label}</TextBody>
        )}
        <TextBody style={[styles.value, valueStyle]}>{value}</TextBody>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  horizontal: {
    flexDirection: "row",
  },
  iconContainer: {
    marginRight: 8,
    marginBottom: 4,
  },
  textContainerHorizontal: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
