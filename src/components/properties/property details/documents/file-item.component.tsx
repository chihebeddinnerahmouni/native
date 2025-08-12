import React, { useMemo } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { HostedFile } from "../../../../backend/casaikos-api";
import { StyleSheet } from "react-native";
import colors from "../../../../constants/colors";
import { TextBody } from "../../../ui/texts/Texts.component";
import { DotsIcon } from "../../../../icons";
import { useActionSheet, useConfirm } from "../../../../hooks";
import { usePropertyDocMutation } from "../../../../api-query/hooks";
import { useModal } from "../../../../contexts";
import { RenameDocumentForm } from "../../../forms/property/documents-rename.form";

type IProps = {
  file: HostedFile;
  propertyId: string;
};

export const FileItem = ({ file, propertyId }: IProps) => {
  const param = useMemo(() => {
    return { propertyId: propertyId ?? "" };
  }, [propertyId]);
  const { showActionSheet } = useActionSheet();
  const { showConfirmation } = useConfirm();
  const { openModal, closeModal } = useModal();
  const { deletePropertyDoc } = usePropertyDocMutation(param);

  const handleDelete = () => {
    showConfirmation({
      title: "Delete File",
      message: `Are you sure you want to delete "${file.fileName}"?\nThis action cannot be undone.`,
      onConfirm: () => deletePropertyDoc(file.fileKey),
    });
  };

  const handleDotsPress = () => {
    showActionSheet({
      title: "File Options",
      message: `What would you like to do with ${file.fileName}?`,
      options: [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => {},
        },
        {
          text: "Rename",
          style: "default",
          onPress: () => {
            onClickEdit(file);
          },
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: handleDelete,
        },
      ],
    });
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

  return (
    <View style={styles.fileItem}>
      <View style={styles.leftContainer}>
        <Image source={require("../../../../../assets/images/folder.png")} />
        <View style={styles.fileDetails}>
          <TextBody style={styles.name}>{file.fileName}</TextBody>
          <TextBody style={styles.size}>pdf - 1.3 MB*</TextBody>
        </View>
      </View>
      <TouchableOpacity style={styles.dotsButton} onPress={handleDotsPress}>
        <DotsIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fileItem: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.bgColor,
    borderColor: colors.borderColor,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  fileDetails: {
    justifyContent: "center",
    gap: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.textColor,
  },
  size: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.textColor2,
  },
  dotsButton: {
    padding: 8,
  },
});
