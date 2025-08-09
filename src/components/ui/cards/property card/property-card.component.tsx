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
import { OptionsMenu } from "../../menu/options-menu.component";
import { PropertyForm } from "../../../forms";
import { PropertyLocation } from "../../../properties/property-location.component";
import { PropertyIndicators } from "../../../properties/property-indicators.component";

interface PropertyCardProps {
  property: Property;
  onPress?: () => void;
  onDelete?: (property: Property) => void;
}

export const PropertyCard = ({
  property,
  onPress,
  onDelete,
}: PropertyCardProps) => {
  const propertyImageUrl = property.images?.[0]?.fileKey;
  const { openModal, closeModal } = useModal();

  const onClickOpenForm = (property: Property) => {
    openModal({
      title: "Update Property",
      slideDirection: "right",
      component: (
        <PropertyForm selectedProperty={property} closeModal={closeModal} />
      ),
      onDismiss: () => {
        // console.log("Modal dismissed");
      },
    });
  };

  const handleOptionsPress = () => {
    openModal({
      title: "Property Options",
      component: (
        <OptionsMenu
          options={[
            {
              label: "Edit Property",
              onPress: () => {
                closeModal();
                onClickOpenForm(property);
              },
            },
            {
              label: "Delete Property",
              onPress: () => {
                closeModal();
                onDelete
                  ? onDelete(property)
                  : console.log("Delete property:", property.title);
              },
              color: colors.errorColor,
            },
          ]}
        />
      ),
      animationType: "fade",
    });
  };

  return (
    <TouchableOpacity
      style={propertyCardStyles.propertyCard}
      onPress={onPress}
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
        <DotsIcon size={20} color={colors.textColor} />
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
