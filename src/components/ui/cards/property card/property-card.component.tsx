/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Property } from "../../../../backend/casaikos-api";
import { DotsIcon } from "../../../../icons";
import { Badge } from "../../badge.component";
import { noImagePlaceholder } from "../../../../constants/constant";
import { TextBody } from "../../texts/Texts.component";
import { propertyCardStyles } from "./property-card.style";
import colors from "../../../../constants/colors";
import { useModal } from "../../../../contexts";
import { PropertyForm } from "../../../forms";
import { PropertyLocation } from "../../../properties/property-location.component";
import { PropertyIndicators } from "../../../properties/property-indicators.component";
import { useActionSheet } from "../../../../hooks/useActionSheet";
import { useNavigation } from "@react-navigation/native";
import { ETabs, EScreens, ERoute } from "../../../../utils";

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const propertyImageUrl = property.images?.[0]?.fileKey;
  const { openModal, closeModal } = useModal();
  const { showActionSheet } = useActionSheet();
  const navigator = useNavigation();

  const navigationHandle = () => {
    (navigator as any).navigate(ETabs.MAIN, {
      screen: EScreens.PROPERTIES,
      params: {
        screen: ERoute.PROPERTIES_DETAILS,
        params: { propertyId: property._id },
      },
    });
  };

  const onClickOpenForm = (property: Property) => {
    openModal({
      title: "Update Property",
      component: (
        <PropertyForm selectedProperty={property} closeModal={closeModal} />
      ),
      onDismiss: () => {
        // console.log("Modal dismissed");
      },
    });
  };

  const handleOptionsPress = () => {
    showActionSheet({
      title: "Property Options",
      message: `What would you like to do with ${property.title}?`,
      options: [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => {},
        },
        {
          text: "Edit",
          style: "default",
          onPress: () => {
            onClickOpenForm(property);
          },
        },
        {
          text: "Delete",
          style: "destructive",
          // onPress: () => onDelete?.(property),
          onPress: () => {},
        },
      ],
    });
  };

  return (
    <TouchableOpacity
      style={propertyCardStyles.propertyCard}
      onPress={navigationHandle}
      activeOpacity={0.8}
    >
      <Badge
        type="success"
        style={propertyCardStyles.statusBadge}
        text="Available"
      />

      <TouchableOpacity
        style={propertyCardStyles.optionsButton}
        onPress={handleOptionsPress}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <DotsIcon size={4} color={colors.textColor} />
      </TouchableOpacity>

      <Image
        source={
          propertyImageUrl ? { uri: propertyImageUrl } : noImagePlaceholder
        }
        style={propertyCardStyles.propertyImage}
        defaultSource={noImagePlaceholder}
        resizeMode="cover"
      />

      <View style={propertyCardStyles.propertyContent}>
        <TextBody style={propertyCardStyles.propertyTitle} numberOfLines={1}>
          {property.title}
        </TextBody>

        <PropertyLocation address={property.address} />
        <PropertyIndicators property={property} />
      </View>
    </TouchableOpacity>
  );
};
