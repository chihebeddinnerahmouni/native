import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import colors from "../../../constants/colors";

type CardComponentProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export const CardComponent = ({ children, style }: CardComponentProps) => {
  return <View style={[CardStyles.container, style]}>{children}</View>;
};

const CardStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgColor,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 9,
    gap: 16,
    //Android
    elevation: 1,
    //iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 11.85,
  },
});
