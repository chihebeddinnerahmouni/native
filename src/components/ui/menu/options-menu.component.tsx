import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { TextBody } from "../texts/Texts.component";
import { colors } from "../../../constants/colors";

export type MenuOption = {
  label: string;
  onPress: () => void;
  color?: string;
};

type OptionsMenuProps = {
  options: MenuOption[];
};

export const OptionsMenu = ({ options }: OptionsMenuProps) => {
  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.option,
            index < options.length - 1 && styles.optionBorder,
          ]}
          onPress={option.onPress}
          activeOpacity={0.7}
        >
          <TextBody
            style={[styles.optionText, option.color && { color: option.color }]}
          >
            {option.label}
          </TextBody>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgColor,
    borderRadius: 8,
    paddingVertical: 8,
    minWidth: 120,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  optionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.textColor,
  },
});
