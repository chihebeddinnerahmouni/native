import React from "react";
import { CardComponent } from "../../../ui/cards/card.component";
import { HostedFile, Property } from "../../../../backend/casaikos-api";
import { StyleSheet, View } from "react-native";
import { ActionHeader } from "../../../ui/action-header.component";
import { Button } from "../../../ui/buttons/button.component";
import { PlusIcon } from "../../../../icons";
import colors from "../../../../constants/colors";
import { amenitiesList } from "../../../../utils";
import { NoItemsFound } from "../../../ui/noItemsFound";
import { useModal } from "../../../../contexts";
import { AmenitiesForm } from "../../../forms/property/amenities.form";
import { FileUpload } from "../../../ui/upload-file.component";
import { FileItem } from "./file-item.component";

type IProps = {
  documents: HostedFile[];
  propertyId: string;
};

export const DocumentsComponent = ({ documents, propertyId }: IProps) => {
  const { openModal, closeModal } = useModal();

  const onClickOpenForm = (property: Property) => {
    // openModal({
    //   title: "Update Amenities",
    //   component: (
    //     <AmenitiesForm property={property} onDismiss={() => closeModal()} />
    //   ),
    // });
  };

  return (
    <>
      <CardComponent>
        <ActionHeader
          title="Documents"
          styles={documentsStyle.actionsHeader}
          //   actions={
          //     <Button
          //       variant="contained"
          //       icon={<PlusIcon color={colors.bgColor} />}
          //       onPress={() => {
          //         // onClickOpenForm(property);
          //       }}
          //     >
          //       Add Document
          //     </Button>
          //   }
        />
        <FileUpload
          onUpload={() => {}}
          style={documentsStyle.uploadContainer}
        />
        <View style={documentsStyle.filesContainer}>
          {documents.length === 0 ? (
            <NoItemsFound />
          ) : (
            documents.map((file, index) => <FileItem key={index} file={file} />)
          )}
        </View>
      </CardComponent>
    </>
  );
};

const documentsStyle = StyleSheet.create({
  actionsHeader: {
    paddingBottom: 12,
    borderColor: colors.borderColor,
    borderBottomWidth: 1,
  },
  uploadContainer: {
    marginTop: 12,
  },
  filesContainer: {
    marginTop: 12,
    gap: 8,
  },
});
