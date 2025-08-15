import React from "react";
import { CardComponent } from "../../ui/cards";
import { HostedFile } from "../../../backend/casaikos-api";
import { View } from "react-native";
import { ActionHeader } from "../../ui/action-header.component";
import { NoItemsFound } from "../../ui/noItemsFound";
import { FileUpload } from "../../ui/upload-file.component";
import { FileCard } from "../../ui/cards/file.card";
import { convertToRNFile } from "../../../utils/files.utils";
import * as DocumentPicker from "expo-document-picker";
import { useModal } from "../../../contexts";
import { RenameDocumentForm } from "../../forms/documents-rename.form";
import { useConfirm } from "../../../hooks";
import { RenameDocumentParams } from "../../../types/rename-document-function.types";
import { documentsStyle } from "../../../styles";
import { useTenantDocMutation } from "../../../api-query/hooks";

type IProps = {
  documents: HostedFile[];
  tenantId: string;
};

export const TenantDocumentsTab = ({ documents, tenantId }: IProps) => {
  const { openModal, closeModal } = useModal();
  const { showConfirmation } = useConfirm();

  const {
    deleteTenantDoc,
    renameTenantDoc,
    isRenamePending,
    uploadTenantFiles,
    isUploadPending,
  } = useTenantDocMutation();

  const handleFileChange = (files: DocumentPicker.DocumentPickerAsset[]) => {
    const rnFiles = convertToRNFile(files);
    uploadTenantFiles({ files: rnFiles, tenantId });
  };

  const onClickRename = ({
    fileKey,
    newFileName,
    onSuccess,
  }: RenameDocumentParams) => {
    renameTenantDoc({
      fileKey,
      newFileName: { newFileName: newFileName },
      tenantId,
    }).then(() => {
      onSuccess();
    });
  };

  const onClickEdit = (document: HostedFile) => {
    openModal({
      title: "Rename document",
      component: (
        <RenameDocumentForm
          onDismiss={closeModal}
          file={document}
          renameDocument={onClickRename}
          isLoading={isRenamePending}
        />
      ),
    });
  };

  const handleDelete = (file: HostedFile) => {
    showConfirmation({
      title: "Delete File",
      message: `Are you sure you want to delete "${file.fileName}"?\nThis action cannot be undone.`,
      onConfirm: () =>
        deleteTenantDoc({
          fileKey: file.fileKey,
          tenantId,
        }),
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
