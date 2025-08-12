import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Property, EAmenityType } from "../../../backend/casaikos-api";
import colors from "../../../constants/colors";
import { amenitiesList } from "../../../utils";
import { AmenityComponent } from "../../properties/property details/amenities/amenity.component";
import { usePropertiesMutation } from "../../../api-query/hooks";
import { FormActions } from "../../ui/form/form-items.component";

type IProps = {
  property: Property;
  onDismiss?: () => void;
};

export const AmenitiesForm = ({ property, onDismiss }: IProps) => {
  const [selectedAmenities, setSelectedAmenities] = useState<EAmenityType[]>(
    property.amenities || []
  );
  const { editAmenities, isEditAmenitiesPending } = usePropertiesMutation();

  const onClickSubmit = async () => {
    editAmenities({
      propertyId: property?._id ?? "",
      amenities: selectedAmenities,
    }).then(() => {
      onDismiss?.();
    });
  };

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
            <TouchableOpacity
              key={amenity.title}
              style={[
                styles.amenityContainer,
                isSelected ? styles.selectedAmenity : styles.unselectedAmenity,
              ]}
              onPress={() => toggleAmenity(amenity.title)}
              activeOpacity={0.7}
            >
              <AmenityComponent
                amenity={amenity}
                styles={styles.amenityContent}
              />
            </TouchableOpacity>
          );
        })}
      </View>
      <FormActions
        onPress={() => onClickSubmit()}
        isLoading={isEditAmenitiesPending}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  amenitiesList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  amenityContainer: {
    flex: 1,
    minWidth: "45%",
    maxWidth: "48%",
    borderRadius: 8,
    borderWidth: 1,
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
  amenityContent: {
    margin: 0,
    padding: 0,
  },
});
