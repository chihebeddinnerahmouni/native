import React from "react";
import { StyleSheet, View } from "react-native";
import { CardComponent } from "../../../ui/cards/card.component";
import { ActionHeader } from "../../../ui/action-header.component";
import { TextBody } from "../../../ui/texts/Texts.component";
import { Button } from "../../../ui/buttons/button.component";
import { PlusIcon } from "../../../../icons";
import colors from "../../../../constants/colors";
import { Facility } from "../../../../backend/casaikos-api";
import { formatDate } from "../../../../utils";
import NoItemsFound from "../../../ui/noItemsFound";
import { useModal } from "../../../../contexts";
import { FacilityForm } from "../../../forms/property/facility.form";

type IProps = {
  facilities: Facility[];
  propertyId: string; // Made required since we need it for the form
};

export const FacilitiesComponent = ({ facilities, propertyId }: IProps) => {
  const { openModal, closeModal } = useModal();

  const onClickOpenForm = () => {
    openModal({
      title: "Add Facility",
      component: (
        <FacilityForm propertyId={propertyId} onDismiss={() => closeModal()} />
      ),
    });
  };

  return (
    <CardComponent>
      <ActionHeader
        title="Facilities"
        styles={facilitiesStyle.actionsHeader}
        actions={
          <Button
            variant="contained"
            icon={<PlusIcon color={colors.bgColor} />}
            onPress={onClickOpenForm}
          >
            Add Facility
          </Button>
        }
      />

      <View style={facilitiesStyle.listContainer}>
        {facilities && facilities.length > 0 ? (
          facilities.map((facility) => (
            <View key={facility.id} style={facilitiesStyle.facilityCard}>
              <View style={facilitiesStyle.facilityHeader}>
                <TextBody style={facilitiesStyle.facilityName}>
                  {facility.name}
                </TextBody>
                <TextBody style={facilitiesStyle.facilityDate}>
                  {formatDate(facility.createdAt)}
                </TextBody>
              </View>

              <View style={facilitiesStyle.facilityFooter}>
                <TextBody style={facilitiesStyle.createdByLabel}>
                  Created by:
                </TextBody>
                <TextBody style={facilitiesStyle.creatorName}>
                  {/* {getCreatorName(facility.createdBy)} */}
                  {facility.createdBy
                    ? `${facility.createdBy.firstName} ${facility.createdBy.lastName}`
                    : "-"}
                </TextBody>
                {facility.createdBy && (
                  <TextBody style={facilitiesStyle.creatorRole}>
                    ({facility.createdBy.role})
                  </TextBody>
                )}
              </View>
            </View>
          ))
        ) : (
          <View style={facilitiesStyle.emptyState}>
            <NoItemsFound message="No facilities found for this property." />
          </View>
        )}
      </View>
    </CardComponent>
  );
};

const facilitiesStyle = StyleSheet.create({
  actionsHeader: {
    paddingBottom: 12,
    borderColor: colors.borderColor,
    borderBottomWidth: 1,
  },
  listContainer: {
    marginTop: 12,
    gap: 12,
  },
  facilityCard: {
    padding: 16,
    backgroundColor: colors.emptyBgColor,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  facilityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  facilityName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textColor,
    flex: 1,
    marginRight: 8,
  },
  facilityDate: {
    fontSize: 12,
    color: colors.textColor2,
    fontWeight: "400",
  },
  facilityFooter: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  createdByLabel: {
    fontSize: 12,
    color: colors.textColor2,
    marginRight: 4,
  },
  creatorName: {
    fontSize: 12,
    color: colors.primaryColor,
    fontWeight: "500",
    marginRight: 4,
  },
  creatorRole: {
    fontSize: 12,
    color: colors.textColor2,
    fontStyle: "italic",
  },
  emptyState: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.emptyBgColor,
    borderRadius: 8,
  },
});
