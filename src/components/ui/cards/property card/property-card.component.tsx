import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Property } from "../../../../backend/casaikos-api";
import {
  BedIcon,
  LocationIcon,
  BathIcon,
  SqftIcon,
  DotsIcon,
} from "../../../../icons";
import { Badge } from "../../badge.component";
import { noImagePlaceholder } from "../../../../constants/constant";
import { TextBody } from "../../texts/Texts.component";
import { propertyCardStyles } from "./property-card.style";
import colors from "../../../../constants/colors";
import { useModal } from "../../../../contexts";
import { OptionsMenu } from "../../menu/options-menu.component";

interface PropertyCardProps {
  property: Property;
  onPress?: () => void;
  onEdit?: (property: Property) => void;
  onDelete?: (property: Property) => void;
}

export const PropertyCard = ({
  property,
  onPress,
  onEdit,
  onDelete,
}: PropertyCardProps) => {
  const propertyImageUrl = property.images?.[0]?.fileKey;
  const { openModal, closeModal } = useModal();

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
                onEdit?.(property);
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

        <View style={propertyCardStyles.propertyLocation}>
          <LocationIcon size={16} color={colors.textColor2} />
          <TextBody style={propertyCardStyles.locationText} numberOfLines={2}>
            {property.address?.street}, {property.address?.city},{" "}
            {property.address?.country}
          </TextBody>
        </View>

        <View style={propertyCardStyles.propertyInfosContainer}>
          <View style={propertyCardStyles.propertyInfoItem}>
            <BedIcon size={16} color={colors.textColor2} />
            <TextBody style={propertyCardStyles.infoText}>
              {property.bedrooms || 0}
            </TextBody>
          </View>

          <View style={propertyCardStyles.propertyInfoItem}>
            <BathIcon size={16} color={colors.textColor2} />
            <TextBody style={propertyCardStyles.infoText}>
              {property.bathrooms || 0}
            </TextBody>
          </View>

          <View style={propertyCardStyles.propertyInfoItem}>
            <SqftIcon size={16} color={colors.textColor2} />
            <TextBody style={propertyCardStyles.infoText}>
              {property.propertySize || 0} Sq Ft
            </TextBody>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
