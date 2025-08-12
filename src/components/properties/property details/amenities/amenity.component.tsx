import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { TextBody } from "../../../ui/texts/Texts.component";
import colors from "../../../../constants/colors";

export const AmenityComponent = ({
  amenity,
  styles,
}: {
  amenity: { Icon: React.FC; title: string };
  styles?: ViewStyle;
}) => (
  <View style={[amenityCompStyles.amenityContainer, styles]}>
    <amenity.Icon />
    <TextBody>{amenity.title}</TextBody>
  </View>
);

const amenityCompStyles = StyleSheet.create({
  amenityContainer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderColor,
    backgroundColor: colors.bgColor,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
