import React from "react";
import { CardComponent } from "../../../ui/cards/card.component";
import { HostedFile } from "../../../../backend/casaikos-api";
import { StyleSheet, View } from "react-native";
import { ActionHeader } from "../../../ui/action-header.component";
import colors from "../../../../constants/colors";
import { NoItemsFound } from "../../../ui/noItemsFound";
import { FileUpload } from "../../../ui/upload-file.component";
import { FileItem } from "./file-item.component";

type IProps = {
  documents: HostedFile[];
  propertyId: string;
};

export const DocumentsComponent = ({ documents, propertyId }: IProps) => {
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
