import React from "react";
import { TextBody } from "../../ui/texts/Texts.component";
import { CardComponent } from "../../ui/cards/card.component";
import { Property } from "../../../backend/casaikos-api";
import { StyleSheet, View } from "react-native";
import { ActionHeader } from "../../ui/action-header.component";
import { Button } from "../../ui/buttons/button.component";
import { EditIcon } from "../../../icons";
import colors from "../../../constants/colors";
import { amenitiesList } from "../../../utils";
import { NoItemsFound } from "../../ui/noItemsFound";

type IProps = {
  property: Property;
};

export const AmenitiesComponent = ({ property }: IProps) => {
  return (
    <>
      <CardComponent>
        <View style={amenitiesStyle.container}>
          <ActionHeader
            title="Amenities"
            styles={amenitiesStyle.actionsHeader}
            actions={
              <Button
                variant="contained"
                icon={<EditIcon color={colors.bgColor} />}
                onPress={() => {
                  // onClickOpenForm();
                }}
              >
                Edit Amenities
              </Button>
            }
          />
          <View style={amenitiesStyle.amenitiesList}>
            {property.amenities && property.amenities.length > 0 ? (
              amenitiesList
                ?.filter((amenity) =>
                  property.amenities?.includes(amenity.title)
                )
                ?.map((amenity) => (
                  <AmenityComponent key={amenity.title} amenity={amenity} />
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

const AmenityComponent = ({
  amenity,
}: {
  amenity: { Icon: React.FC; title: string };
}) => (
  <View style={amenityCompStyles.amenityContainer}>
    <amenity.Icon />
    <TextBody>{amenity.title}</TextBody>
  </View>
);

const amenityCompStyles = StyleSheet.create({
  amenityContainer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    flex: 1,
    minWidth: "45%",
    maxWidth: "48%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderColor,
    backgroundColor: colors.bgColor,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});

const amenitiesStyle = StyleSheet.create({
  container: {
    // padding: 16,
  },
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
});
