/* eslint-disable react-native/split-platform-components */
import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ActionSheetIOS,
  Platform,
  Alert,
} from "react-native";
import { HostedFile } from "../../../../backend/casaikos-api";
import { StyleSheet } from "react-native";
import colors from "../../../../constants/colors";
import { TextBody } from "../../../ui/texts/Texts.component";
import { DotsIcon } from "../../../../icons";

type IProps = {
  file: HostedFile;
  onUpdate?: (file: HostedFile) => void;
  onDelete?: (file: HostedFile) => void;
};

export const FileItem = ({ file, onUpdate, onDelete }: IProps) => {
  const showActionSheet = () => {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Cancel", "Update", "Delete"],
          destructiveButtonIndex: 2,
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            onUpdate?.(file);
          } else if (buttonIndex === 2) {
            onDelete?.(file);
          }
        }
      );
    } else {
      Alert.alert(
        "File Options",
        `What would you like to do with ${file.fileName}?`,
        [
          { text: "Cancel", style: "cancel" },
          { text: "Update", onPress: () => onUpdate?.(file) },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => onDelete?.(file),
          },
        ]
      );
    }
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
      <TouchableOpacity onPress={showActionSheet}>
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
});
