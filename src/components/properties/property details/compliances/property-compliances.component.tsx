import React from "react";
import { CardComponent } from "../../../ui/cards/card.component";
import { Compliance } from "../../../../backend/casaikos-api";
import { StyleSheet, View, FlatList } from "react-native";
import { ActionHeader } from "../../../ui/action-header.component";
import colors from "../../../../constants/colors";
import { complianceTypes } from "../../../../utils/validators/compliance.validator";
import { ComplianceCard } from "./compliance.component";

type IProps = {
  compliances: Compliance[];
  propertyId?: string;
};

export const CompliancesComponent = ({ compliances, propertyId }: IProps) => {
  return (
    <>
      <CardComponent>
        <ActionHeader
          title="Compliances"
          styles={compliancesStyle.actionsHeader}
        />
        <View style={compliancesStyle.listContainer}>
          <FlatList
            data={complianceTypes}
            renderItem={({ item }) => ComplianceCard({ item, compliances })}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View style={compliancesStyle.separator} />
            )}
          />
        </View>
      </CardComponent>
    </>
  );
};

const compliancesStyle = StyleSheet.create({
  actionsHeader: {
    paddingBottom: 12,
    borderColor: colors.borderColor,
    borderBottomWidth: 1,
  },
  listContainer: {
    flex: 1,
    marginTop: 12,
  },
  separator: {
    height: 12,
  },
});
