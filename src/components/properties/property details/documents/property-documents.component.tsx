import React, { useMemo } from "react";
import { CardComponent } from "../../../ui/cards/card.component";
import { HostedFile, Property } from "../../../../backend/casaikos-api";
import { StyleSheet, View } from "react-native";
import { ActionHeader } from "../../../ui/action-header.component";
import colors from "../../../../constants/colors";
import { NoItemsFound } from "../../../ui/noItemsFound";
import { useModal } from "../../../../contexts";
import { FileUpload } from "../../../ui/upload-file.component";
import { FileItem } from "./file-item.component";
import { usePropertyDocMutation } from "../../../../api-query/hooks";

type IProps = {
  documents: HostedFile[];
  propertyId: string;
};

export const DocumentsComponent = ({ documents, propertyId }: IProps) => {
  const param = useMemo(() => {
    return { propertyId: propertyId ?? "" };
  }, [propertyId]);
  const { openModal, closeModal } = useModal();
  const {
    deletePropertyDoc,
    uploadPropertyFiles,
    isUploadPending,
    renamePropertyDoc,
    isRenamePending,
  } = usePropertyDocMutation(param);

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
        <ActionHeader title="Documents" styles={documentsStyle.actionsHeader} />
        <FileUpload
          onUpload={() => {}}
          style={documentsStyle.uploadContainer}
        />
        <View style={documentsStyle.filesContainer}>
          {documents.length === 0 ? (
            <NoItemsFound />
          ) : (
            documents.map((file, index) => (
              <FileItem
                key={index}
                file={file}
                onUpdate={(file) => {
                  console.log("Update file:", file.fileName);
                  // You can add update logic here using renamePropertyDoc
                }}
                onDelete={(file) => {
                  console.log("Delete file:", file.fileName);
                  deletePropertyDoc(file.fileKey);
                }}
              />
            ))
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
