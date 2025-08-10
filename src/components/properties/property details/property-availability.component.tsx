import React from "react";
import { CardComponent } from "../../ui/cards/card.component";
import { Property } from "../../../backend/casaikos-api";
import { StyleSheet, View } from "react-native";
import { ActionHeader } from "../../ui/action-header.component";
import { Button } from "../../ui/buttons/button.component";
import { EditIcon } from "../../../icons";
import colors from "../../../constants/colors";
import { amenitiesList } from "../../../utils";
import { NoItemsFound } from "../../ui/noItemsFound";
import { useModal } from "../../../contexts";
import { AmenitiesForm } from "../../forms/property/amenities.form";
import { AmenityComponent } from "../amenity.component";

type IProps = {
  property: Property;
};

export const AvailabilitiesComponent = ({ property }: IProps) => {
  const { openModal, closeModal } = useModal();

  const onClickOpenForm = (property: Property) => {
    openModal({
      title: "Update Amenities",
      slideDirection: "right",
      component: (
        <AmenitiesForm property={property} onDismiss={() => closeModal()} />
      ),
    });
  };

  return (
    <>
      <CardComponent>
        <View>
          <ActionHeader
            title="Availabilities"
            styles={availabilitiesStyle.actionsHeader}
            // actions={
            //   <Button
            //     variant="contained"
            //     icon={<EditIcon color={colors.bgColor} />}
            //     onPress={() => {
            //       onClickOpenForm(property);
            //     }}
            //   >
            //     Edit Amenities
            //   </Button>
            // }
          />
          <View style={availabilitiesStyle.amenitiesList}>
            {property.amenities && property.amenities.length > 0 ? (
              amenitiesList
                ?.filter((amenity) =>
                  property.amenities?.includes(amenity.title)
                )
                ?.map((amenity) => (
                  <View
                    key={amenity.title}
                    style={availabilitiesStyle.amenityContainer}
                  >
                    <AmenityComponent amenity={amenity} />
                  </View>
                ))
            ) : (
              <NoItemsFound message="No amenities listed for this property" />
            )}
          </View>
        </View>
      </CardComponent>
    </>
  );
};

const availabilitiesStyle = StyleSheet.create({
  actionsHeader: {
    paddingBottom: 12,
    borderColor: colors.borderColor,
    borderBottomWidth: 1,
  },
  amenitiesList: {
    marginTop: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  amenityContainer: {
    flex: 1,
    minWidth: "45%",
    maxWidth: "48%",
  },
});
