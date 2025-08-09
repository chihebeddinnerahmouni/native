import React from "react";
import { StyleSheet, View } from "react-native";
import { BathIcon, BedIcon, SqftIcon } from "../../icons";
import { TextBody } from "../ui/texts/Texts.component";
import { Property } from "../../backend/casaikos-api";
import colors from "../../constants/colors";

type IProps = {
  property: Property;
};
export const PropertyIndicators = ({ property }: IProps) => {
  return (
    <View style={indicatorsStyles.propertyInfosContainer}>
      <View style={indicatorsStyles.propertyInfoItem}>
        <BedIcon size={16} color={colors.textColor2} />
        <TextBody style={indicatorsStyles.infoText}>
          {property.bedrooms || 0}
        </TextBody>
      </View>

      <View style={indicatorsStyles.propertyInfoItem}>
        <BathIcon size={16} color={colors.textColor2} />
        <TextBody style={indicatorsStyles.infoText}>
          {property.bathrooms || 0}
        </TextBody>
      </View>

      <View style={indicatorsStyles.propertyInfoItem}>
        <SqftIcon size={16} color={colors.textColor2} />
        <TextBody style={indicatorsStyles.infoText}>
          {property.propertySize || 0} Sq Ft
        </TextBody>
      </View>
    </View>
  );
};

const indicatorsStyles = StyleSheet.create({
  propertyInfosContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 24,
  },
  propertyInfoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    fontSize: 14,
    color: colors.textColor2,
    marginLeft: 4,
  },
});
