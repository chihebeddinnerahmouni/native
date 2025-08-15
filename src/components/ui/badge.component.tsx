import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { TUIType } from "../../utils";

type BadgeType = "success" | "danger" | "warning" | "info";
// type BadgeType = TUIType;

interface BadgeProps {
  type: BadgeType;
  text: string;
  style?: ViewStyle;
}

export const Badge = ({ type, text, style }: BadgeProps) => {
  return (
    <View style={[styles.badge, styles[type], style]}>
      <Text style={[styles.text, styles[`${type}Text`]]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
  },
  success: {
    backgroundColor: "#d4edda",
  },
  successText: {
    color: "#155724",
  },
  danger: {
    backgroundColor: "#f8d7da",
  },
  dangerText: {
    color: "#721c24",
  },
  warning: {
    backgroundColor: "#fff3cd",
  },
  warningText: {
    color: "#856404",
  },
  info: {
    backgroundColor: "#d1ecf1",
  },
  infoText: {
    color: "#0c5460",
  },
});
