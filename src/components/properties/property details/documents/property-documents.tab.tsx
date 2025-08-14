import React, { useMemo } from "react";
import { CardComponent } from "../../../ui/cards/card.component";
import { HostedFile } from "../../../../backend/casaikos-api";
import { StyleSheet, View } from "react-native";
import { ActionHeader } from "../../../ui/action-header.component";
import colors from "../../../../constants/colors";
import { NoItemsFound } from "../../../ui/noItemsFound";
import { FileUpload } from "../../../ui/upload-file.component";
import { FileItem } from "./file-item.component";
import { usePropertyDocMutation } from "../../../../api-query/hooks";
import { convertToRNFile } from "../../../../utils/files.utils";
import * as DocumentPicker from "expo-document-picker";

type IProps = {
  documents: HostedFile[];
  propertyId: string;
};

export const DocumentsComponent = ({ documents, propertyId }: IProps) => {
  const param = useMemo(() => {
    return { propertyId: propertyId ?? "" };
  }, [propertyId]);

  const { uploadPropertyFiles, isUploadPending } =
    usePropertyDocMutation(param);

  const handleFileChange = (files: DocumentPicker.DocumentPickerAsset[]) => {
    const rnFiles = convertToRNFile(files);
    uploadPropertyFiles(rnFiles);
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
              <FileItem key={index} file={file} propertyId={propertyId} />
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
