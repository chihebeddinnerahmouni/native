import React from "react";
import { StyleSheet, Text } from "react-native";
import { colors } from "../../constants/colors";

interface IProps {
  title: string;
}

export const TitlePageComponent = ({ title }: IProps) => {
  return <Text style={TitlePageStyles.text}>{title}</Text>;
};

const TitlePageStyles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: colors.textColor,
  },
});
