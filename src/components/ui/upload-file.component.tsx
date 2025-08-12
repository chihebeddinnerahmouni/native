import React, { useState } from "react";
import {
  View,
  //   Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ViewStyle,
  Image,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import colors from "../../constants/colors";
import { TextBody } from "./texts/Texts.component";

type FileUploadProps = {
  onUpload: (files: DocumentPicker.DocumentPickerAsset[]) => void;
  isLoading?: boolean;
  onlyImages?: boolean;
  multiple?: boolean;
  title?: string;
  subTitle?: string;
  style?: ViewStyle;
};

export const FileUpload = ({
  onUpload,
  isLoading = false,
  onlyImages = false,
  multiple = true,
  title = multiple ? "Upload Files" : "Upload File",
  subTitle = "PDF and Word files no larger than 10MB*",
  style,
}: FileUploadProps) => {
  const [isSelecting, setIsSelecting] = useState(false);

  const handleFileSelection = async () => {
    if (isLoading || isSelecting) return;

    try {
      setIsSelecting(true);

      const result = await DocumentPicker.getDocumentAsync({
        type: onlyImages ? "image/*" : "*/*",
        multiple,
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        onUpload(result.assets);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to select files. Please try again.");
      console.error("File selection error:", error);
    } finally {
      setIsSelecting(false);
    }
  };

  const isButtonDisabled = isLoading || isSelecting;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isButtonDisabled && styles.containerDisabled,
        style,
      ]}
      onPress={handleFileSelection}
      disabled={isButtonDisabled}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        {isSelecting ? (
          <ActivityIndicator size="small" color="#007AFF" />
        ) : (
          <Image
            source={require("../../../assets/images/upload-file.png")}
            style={styles.icon}
          />
        )}
      </View>

      <View style={styles.description}>
        {!isLoading ? (
          <>
            <TextBody style={styles.title}>{title}</TextBody>
            <TextBody style={styles.subtitle}>{subTitle}</TextBody>
          </>
        ) : (
          <>
            <TextBody style={styles.title}>
              Uploading in progress, please wait...
            </TextBody>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 16,
    backgroundColor: colors.emptyBgColor,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 12,
    minHeight: 80,
  },
  containerDisabled: {
    opacity: 0.6,
  },
  iconContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: "100%",
    height: "100%",
  },
  description: {
    flex: 1,
    gap: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textColor,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textColor2,
    fontWeight: "400",
  },
});
