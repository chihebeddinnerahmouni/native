import React from "react";
import { CardComponent } from "../../../ui/cards/card.component";
import { Compliance } from "../../../../backend/casaikos-api";
import { StyleSheet, View } from "react-native";
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
          {complianceTypes.map((item) => {
            const compliance = compliances.find((c) => c.type === item);
            return (
              <ComplianceCard
                key={item}
                compliance={compliance ?? ({} as Compliance)}
              />
            );
          })}
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
    marginTop: 12,
    gap: 12,
  },
});
