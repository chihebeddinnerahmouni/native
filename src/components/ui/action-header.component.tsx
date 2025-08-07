import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { PageTitle } from "./texts/Texts.component";

type ActionHeaderProps = {
  title?: string;
  actions?: React.ReactNode;
  styles?: ViewStyle;
};
export const ActionHeader = ({ title, actions, styles }: ActionHeaderProps) => {
  return (
    <View style={[ActionHeaderStyles.container, styles]}>
      <PageTitle>{title}</PageTitle>
      {actions}
    </View>
  );
};

const ActionHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
