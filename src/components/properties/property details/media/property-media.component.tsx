import React from "react";
import { CardComponent } from "../../../ui/cards/card.component";
import { Property } from "../../../../backend/casaikos-api";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { ActionHeader } from "../../../ui/action-header.component";
import colors from "../../../../constants/colors";
import { NoItemsFound } from "../../../ui/noItemsFound";
import { getImageUrl } from "../../../../utils/validators/images.utils";
import { XIcon } from "../../../../icons";
import { FileUpload } from "../../../ui/upload-file.component";
import * as DocumentPicker from "expo-document-picker";
import { usePropertyDocMutation } from "../../../../api-query/hooks";
import { convertToRNFile } from "../../../../utils/files.utils";

type IProps = {
  property: Property;
};

export const MediaComponent = ({ property }: IProps) => {
  const { uploadPropertyImages, isUploadPending } = usePropertyDocMutation({
    propertyId: property._id,
  });

  const handleFileChange = async (
    files: DocumentPicker.DocumentPickerAsset[]
  ) => {
    const rnFiles = convertToRNFile(files);
    uploadPropertyImages(rnFiles);
  };
  return (
    <>
      <CardComponent>
        <ActionHeader
          title="Additional photos and videos of your properties"
          styles={mediaStyle.actionsHeader}
        />
        <FileUpload onUpload={handleFileChange} isLoading={isUploadPending} />
        <View style={mediaStyle.mediaList}>
          {property.images.length === 0 ? (
            <NoItemsFound />
          ) : (
            property.images.map((mediaItem, index) => (
              <View key={index} style={mediaStyle.imageContainer}>
                <Image
                  source={{ uri: getImageUrl(mediaItem) }}
                  style={mediaStyle.mediaImage}
                />
                <TouchableOpacity
                  style={mediaStyle.deleteButton}
                  onPress={() => {
                    // Handle media options here
                  }}
                  activeOpacity={0.7}
                >
                  <XIcon color={colors.bgColor} />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </CardComponent>
    </>
  );
};

const mediaStyle = StyleSheet.create({
  actionsHeader: {
    paddingBottom: 12,
    borderColor: colors.borderColor,
    borderBottomWidth: 1,
  },
  mediaList: {
    marginTop: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  imageContainer: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 8,
    overflow: "hidden",
    objectFit: "cover",
    position: "relative",
  },
  mediaImage: {
    width: "100%",
    height: "100%",
  },
  deleteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 21,
    height: 21,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.errorColor,
    borderRadius: 20,
    borderColor: colors.bgColor,
    borderWidth: 1,
  },
});
