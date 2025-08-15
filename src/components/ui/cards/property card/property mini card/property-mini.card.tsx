/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Property } from "../../../../../backend/casaikos-api";
import colors from "../../../../../constants/colors";
import { TextBody } from "../../../texts/Texts.component";
import { noImagePlaceholder } from "../../../../../constants/constant";
import { PropertyLocation } from "../../../../properties/property-location.component";
import { PropertyIndicators } from "../../../../properties/property-indicators.component";
import { useNavigation } from "@react-navigation/native";
import { ERoute, EScreens, ETabs } from "../../../../../utils";
import { getImageUrl } from "../../../../../utils/validators/images.utils";

type IProps = {
  property: Property | null;
};
export const PropertyMiniCard = ({ property }: IProps) => {
  const navigator = useNavigation();

  if (!property) return null;

  const propertyImageUrl = property.images?.[0]?.fileKey;

  const navigationHandle = () => {
    (navigator as any).navigate(ETabs.MAIN, {
      screen: EScreens.PROPERTIES,
      params: {
        screen: ERoute.PROPERTIES_DETAILS,
        params: { propertyId: property._id },
      },
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={navigationHandle}>
      <View style={styles.topContainer}>
        <Image
          source={
            propertyImageUrl
              ? { uri: getImageUrl(property.images?.[0]) }
              : noImagePlaceholder
          }
          style={styles.image}
          defaultSource={noImagePlaceholder}
          resizeMode="cover"
        />
        <View style={styles.infosContainer}>
          <TextBody style={styles.title}>{property.title}</TextBody>
          <PropertyLocation address={property.address} />
          <PropertyIndicators property={property} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 12,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 75,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 8,
  },
  infosContainer: {
    flex: 1,
    justifyContent: "space-between",
    height: "100%",
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textColor,
  },
});
