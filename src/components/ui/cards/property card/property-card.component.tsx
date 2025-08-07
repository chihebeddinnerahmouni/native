import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Property } from "../../../../backend/casaikos-api";
import { BedIcon, LocationIcon, BathIcon, SqftIcon } from "../../../../icons";
import { Badge } from "../../badge.component";
import { no_image_placeholder } from "../../../../constants/constant";

interface PropertyCardProps {
  property: Property;
  onPress?: () => void;
}

export const PropertyCard = ({ property, onPress }: PropertyCardProps) => {
  //   const defaultImage = no_image_placeholder;
  const propertyImage = /*property.images?.[0]?.url || */ no_image_placeholder;

  return (
    <TouchableOpacity
      style={styles.propertyCard}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Badge type="success" style={styles.statusBadge} text="Available" />

      <Image
        source={{ uri: no_image_placeholder }}
        style={styles.propertyImage}
        defaultSource={{ uri: no_image_placeholder }}
        resizeMode="cover"
      />

      <View style={styles.propertyContent}>
        <Text style={styles.propertyTitle} numberOfLines={1}>
          {property.title}
        </Text>

        <View style={styles.propertyLocation}>
          <LocationIcon size={16} color="#666" />
          <Text style={styles.locationText} numberOfLines={2}>
            {property.address?.street}, {property.address?.city},{" "}
            {property.address?.country}
          </Text>
        </View>

        <View style={styles.propertyInfosContainer}>
          <View style={styles.propertyInfoItem}>
            <BedIcon size={16} color="#666" />
            <Text style={styles.infoText}>{property.bedrooms || 0}</Text>
          </View>

          <View style={styles.propertyInfoItem}>
            <BathIcon size={16} color="#666" />
            <Text style={styles.infoText}>{property.bathrooms || 0}</Text>
          </View>

          <View style={styles.propertyInfoItem}>
            <SqftIcon size={16} color="#666" />
            <Text style={styles.infoText}>
              {property.propertySize || 0} Sq Ft
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  propertyCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 8,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    // marginBottom: 16,
  },
  statusBadge: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 1,
  },
  propertyImage: {
    width: "100%",
    height: 170,
    borderRadius: 8,
    marginBottom: 8,
  },
  propertyContent: {
    gap: 8,
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  propertyLocation: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
  },
  locationText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
    flex: 1,
  },
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
    color: "#666",
    marginLeft: 4,
  },
});
