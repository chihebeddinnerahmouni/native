import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Property, EAmenityType } from "../../../backend/casaikos-api";
import { TextBody } from "../../ui/texts/Texts.component";
import colors from "../../../constants/colors";
import { amenitiesList } from "../../../utils";

type IProps = {
  property: Property;
  onAmenitiesChange?: (amenities: EAmenityType[]) => void;
};

export const AmenitiesForm = ({ property, onAmenitiesChange }: IProps) => {
  const [selectedAmenities, setSelectedAmenities] = useState<EAmenityType[]>(
    property.amenities || []
  );

  useEffect(() => {
    onAmenitiesChange?.(selectedAmenities);
  }, [selectedAmenities, onAmenitiesChange]);

  const toggleAmenity = (amenityType: EAmenityType) => {
    setSelectedAmenities((prev) => {
      if (prev.includes(amenityType)) {
        return prev.filter((amenity) => amenity !== amenityType);
      } else {
        return [...prev, amenityType];
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.amenitiesList}>
        {amenitiesList?.map((amenity) => {
          const isSelected = selectedAmenities.includes(amenity.title);
          return (
            <SelectableAmenityComponent
              key={amenity.title}
              amenity={amenity}
              isSelected={isSelected}
              onToggle={() => toggleAmenity(amenity.title)}
            />
          );
        })}
      </View>
    </View>
  );
};

const SelectableAmenityComponent = ({
  amenity,
  isSelected,
  onToggle,
}: {
  amenity: { Icon: React.FC; title: EAmenityType };
  isSelected: boolean;
  onToggle: () => void;
}) => (
  <TouchableOpacity
    style={[
      styles.amenityContainer,
      isSelected ? styles.selectedAmenity : styles.unselectedAmenity,
    ]}
    onPress={onToggle}
    activeOpacity={0.7}
  >
    <amenity.Icon />
    <TextBody
      style={[
        styles.amenityText,
        { color: isSelected ? colors.primaryColor : colors.textColor2 },
      ]}
    >
      {amenity.title}
    </TextBody>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  amenitiesList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  amenityContainer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    flex: 1,
    minWidth: "45%",
    maxWidth: "48%",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  selectedAmenity: {
    opacity: 1,
    borderColor: colors.primaryColor,
    backgroundColor: colors.primaryLight,
  },
  unselectedAmenity: {
    opacity: 0.5,
    borderColor: colors.borderColor,
    backgroundColor: colors.bgColor,
  },
  amenityText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "500",
  },
});
