import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Property } from "../../../../backend/casaikos-api";
import { BedIcon, LocationIcon, BathIcon, SqftIcon } from "../../../../icons";
import { Badge } from "../../badge.component";
import { noImagePlaceholder } from "../../../../constants/constant";
import { TextBody } from "../../texts/Texts.component";
import { propertyCardStyles } from "./property-card.style";
import colors from "../../../../constants/colors";

interface PropertyCardProps {
  property: Property;
  onPress?: () => void;
}

export const PropertyCard = ({ property, onPress }: PropertyCardProps) => {
  const propertyImageUrl = property.images?.[0]?.fileKey;

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
