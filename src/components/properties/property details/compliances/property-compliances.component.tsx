import React from "react";
import { CardComponent } from "../../../ui/cards/card.component";
import { Compliance, Property } from "../../../../backend/casaikos-api";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { ActionHeader } from "../../../ui/action-header.component";
import colors from "../../../../constants/colors";
import { NoItemsFound } from "../../../ui/noItemsFound";
import { getImageUrl } from "../../../../utils/validators/images.utils";
import { XIcon } from "../../../../icons";
import { FileUpload } from "../../../ui/upload-file.component";
import * as DocumentPicker from "expo-document-picker";
import { usePropertyDocMutation } from "../../../../api-query/hooks";
import { convertToRNFile } from "../../../../utils/files.utils";
import { useConfirm } from "../../../../hooks";
import { ComplianceGrid } from "./compliance.component";
import { complianceTypes } from "../../../../utils/validators/compliance.validator";

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
        <ComplianceGrid
          compliances={compliances}
          //   complianceTypes={complianceTypes}
          //   editCompliance={() => {}}
          //   formatDate={formatDate}
          //   getRemainingDays={getRemainingDays}
          //   getTyp={getTyp}
          //   getComplianceStatus={getComplianceStatus}
        />
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
});
