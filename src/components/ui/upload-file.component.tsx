import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ViewStyle,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { FileIcon } from "../../icons";
import colors from "../../constants/colors";

type FileUploadProps = {
  onUpload: (files: DocumentPicker.DocumentPickerAsset[]) => void;
  isLoading?: boolean;
  title?: string;
  onlyImages?: boolean;
  multiple?: boolean;
  style?: ViewStyle;
};

export const FileUpload = ({
  onUpload,
  isLoading = false,
  title = "Tap to select files",
  onlyImages = false,
  multiple = true,
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
          <FileIcon />
        )}
      </View>

      <View style={styles.description}>
        {!isLoading ? (
          <>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>
              Select {multiple ? "files" : "file"} from your device
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.title}>
              Uploading in progress, please wait...
            </Text>
          </>
        )}

        <Text style={styles.browseText}>
          {isSelecting ? "Selecting..." : "Browse Files"}
        </Text>
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
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.primaryBold,
    borderStyle: "dashed",
    borderRadius: 4,
    minHeight: 80,
  },
  containerDisabled: {
    opacity: 0.6,
  },
  iconContainer: {
    width: 48.487,
    height: 48.487,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.primaryBold,
    backgroundColor: colors.bgColor,
  },
  description: {
    flex: 1,
    gap: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textColor,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textColor2,
    fontWeight: "500",
  },
  browseText: {
    fontSize: 15,
    fontWeight: "400",
    color: colors.primaryColor,
    marginTop: 4,
  },
});
