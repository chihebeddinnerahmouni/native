import React from "react";
import { StyleSheet, View } from "react-native";
import { LocationIcon } from "../../icons";
import { TextBody } from "../ui/texts/Texts.component";
import { Address } from "../../backend/casaikos-api";
import colors from "../../constants/colors";

type IProps = {
  address: Address | undefined;
};

export const PropertyLocation = ({ address }: IProps) => {
  return (
    <View style={locationStyle.propertyLocation}>
      <LocationIcon size={16} color={colors.textColor2} />
      <TextBody style={locationStyle.locationText} numberOfLines={2}>
        {address?.street}, {address?.city}, {address?.country}
      </TextBody>
    </View>
  );
};

export const locationStyle = StyleSheet.create({
  propertyLocation: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
  },
  locationText: {
    fontSize: 14,
    color: colors.textColor2,
    marginLeft: 4,
    flex: 1,
  },
});
