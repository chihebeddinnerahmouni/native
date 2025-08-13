import React from "react";
import { StyleSheet, View } from "react-native";
import { CardComponent } from "../../../ui/cards/card.component";
import { ActionHeader } from "../../../ui/action-header.component";
import { TextLabel } from "../../../ui/texts/Texts.component";
import colors from "../../../../constants/colors";
import { Facility } from "../../../../backend/casaikos-api";
import { formatDate } from "../../../../utils";
import NoItemsFound from "../../../ui/noItemsFound";

type IProps = {
  facilities: Facility[];
  propertyId?: string;
};

export const FacilitiesComponent = ({ facilities }: IProps) => {
  const getCreatorName = (creator: Facility["createdBy"]) => {
    if (!creator) return "Unknown";
    return `${creator.firstName} ${creator.lastName}`;
  };

  return (
    <CardComponent>
      <ActionHeader title="Facilities" styles={facilitiesStyle.actionsHeader} />

      <View style={facilitiesStyle.listContainer}>
        {facilities && facilities.length > 0 ? (
          facilities.map((facility) => (
            <View key={facility.id} style={facilitiesStyle.facilityCard}>
              <View style={facilitiesStyle.facilityHeader}>
                <TextLabel style={facilitiesStyle.facilityName}>
                  {facility.name}
                </TextLabel>
                <TextLabel style={facilitiesStyle.facilityDate}>
                  {formatDate(facility.createdAt)}
                </TextLabel>
              </View>

              <View style={facilitiesStyle.facilityFooter}>
                <TextLabel style={facilitiesStyle.createdByLabel}>
                  Created by:
                </TextLabel>
                <TextLabel style={facilitiesStyle.creatorName}>
                  {getCreatorName(facility.createdBy)}
                </TextLabel>
                {facility.createdBy && (
                  <TextLabel style={facilitiesStyle.creatorRole}>
                    ({facility.createdBy.role})
                  </TextLabel>
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
