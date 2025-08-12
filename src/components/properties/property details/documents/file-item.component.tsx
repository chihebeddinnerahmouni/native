import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { HostedFile } from "../../../../backend/casaikos-api";
import { StyleSheet } from "react-native";
import colors from "../../../../constants/colors";
import { TextBody } from "../../../ui/texts/Texts.component";
import { DotsIcon } from "../../../../icons";

type IProps = {
  file: HostedFile;
};

export const FileItem = ({ file }: IProps) => {
  return (
    <View style={styles.fileItem}>
      <View style={styles.leftContainer}>
        <Image source={require("../../../../../assets/images/folder.png")} />
        <View style={styles.fileDetails}>
          <TextBody style={styles.name}>{file.fileName}</TextBody>
          <TextBody style={styles.size}>pdf - 1.3 MB*</TextBody>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          // Handle file download or view
        }}
      >
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
