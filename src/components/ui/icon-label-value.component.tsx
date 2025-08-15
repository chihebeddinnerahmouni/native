import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import { TextBody } from "./texts/Texts.component";
import colors from "../../constants/colors";

type IconLabelValueProps = {
  icon?: ReactNode;
  label?: string;
  value: string | number | ReactNode | undefined;
  labelStyle?: object;
  valueStyle?: object;
  styles?: object;
};

export const IconLabelValue: React.FC<IconLabelValueProps> = ({
  icon,
  label,
  value,
  labelStyle,
  valueStyle,
  styles,
}) => {
  return (
    <View style={[compStyles.container, styles]}>
      <View style={compStyles.leftSection}>
        {icon && <View style={compStyles.iconContainer}>{icon}</View>}
        {label && (
          <TextBody style={[compStyles.label, labelStyle]}>{label}</TextBody>
        )}
      </View>

      <View style={compStyles.centerSection}>
        <TextBody style={[compStyles.value, valueStyle]} numberOfLines={1}>
          {value ?? "-"}
        </TextBody>
      </View>
    </View>
  );
};

const compStyles = StyleSheet.create({
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
