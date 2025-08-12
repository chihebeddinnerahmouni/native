import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { PageTitle2 } from "./texts/Texts.component";

type ActionHeaderProps = {
  title?: string;
  actions?: React.ReactNode;
  styles?: ViewStyle;
};
export const ActionHeader = ({ title, actions, styles }: ActionHeaderProps) => {
  return (
    <View style={[ActionHeaderStyles.container, styles]}>
      <PageTitle2>{title}</PageTitle2>
      {actions}
    </View>
  );
};

const ActionHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
  },
});
