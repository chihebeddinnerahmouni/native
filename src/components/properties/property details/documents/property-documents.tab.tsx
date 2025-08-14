import React from "react";
import { CardComponent } from "../../../ui/cards/card.component";
import { HostedFile } from "../../../../backend/casaikos-api";
import { StyleSheet, View } from "react-native";
import { ActionHeader } from "../../../ui/action-header.component";
import colors from "../../../../constants/colors";
import { NoItemsFound } from "../../../ui/noItemsFound";
import { FileUpload } from "../../../ui/upload-file.component";
import { FileCard } from "../../../ui/cards/file.card";
import { usePropertyDocMutation } from "../../../../api-query/hooks";
import { convertToRNFile } from "../../../../utils/files.utils";
import * as DocumentPicker from "expo-document-picker";
import { useModal } from "../../../../contexts";
import { RenameDocumentForm } from "../../../forms/property/documents-rename.form";
import { useConfirm } from "../../../../hooks";

type IProps = {
  documents: HostedFile[];
  propertyId: string;
};

export const DocumentsComponent = ({ documents, propertyId }: IProps) => {
  const { openModal, closeModal } = useModal();
  const { showConfirmation } = useConfirm();

  const { uploadPropertyFiles, isUploadPending, deletePropertyDoc } =
    usePropertyDocMutation({
      propertyId: propertyId ?? "",
    });

  const handleFileChange = (files: DocumentPicker.DocumentPickerAsset[]) => {
    const rnFiles = convertToRNFile(files);
    uploadPropertyFiles(rnFiles);
  };

  const onClickEdit = (document: HostedFile) => {
    openModal({
      title: "Rename document",
      component: (
        <RenameDocumentForm
          propertyId={propertyId}
          onDismiss={closeModal}
          document={document}
        />
      ),
    });
  };

  const handleDelete = (file: HostedFile) => {
    showConfirmation({
      title: "Delete File",
      message: `Are you sure you want to delete "${file.fileName}"?\nThis action cannot be undone.`,
      onConfirm: () => deletePropertyDoc(file.fileKey),
    });
  };

  return (
    <>
      <CardComponent>
        <ActionHeader title="Documents" styles={documentsStyle.actionsHeader} />
        <FileUpload
          onUpload={handleFileChange}
          style={documentsStyle.uploadContainer}
          isLoading={isUploadPending}
        />
        <View style={documentsStyle.filesContainer}>
          {documents.length === 0 ? (
            <NoItemsFound />
          ) : (
            documents.map((file, index) => (
              <FileCard
                key={index}
                file={file}
                onClickEdit={onClickEdit}
                handleDelete={handleDelete}
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
