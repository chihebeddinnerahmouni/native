import React from "react";
import { StyleSheet, View } from "react-native";
import { TextBody } from "../ui/texts/Texts.component";
import colors from "../../constants/colors";

type IProps = {
  value: string | number | React.ReactNode;
  Icon?: React.ReactNode;
};

export const InfoComp = ({ value, Icon }: IProps) => {
  return (
    <View style={styles.container}>
      {Icon}
      <TextBody style={styles.text} numberOfLines={2}>
        {value}
      </TextBody>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  text: {
    fontSize: 14,
    color: colors.textColor2,
    marginLeft: 8,
    flex: 1,
  },
});
