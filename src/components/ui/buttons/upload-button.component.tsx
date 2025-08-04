import React from "react";
import { Button } from "./button.component";
import { launchImageLibrary, MediaType } from "react-native-image-picker";

type UploadButtonProps = {
  onUpload: (file: any) => void;
  children: React.ReactNode;
  mediaType?: MediaType;
};

export const UploadButton: React.FC<UploadButtonProps> = ({
  onUpload,
  children,
  mediaType = "mixed",
}) => {
  const handleUpload = () => {
    launchImageLibrary(
      {
        mediaType,
        quality: 0.8,
      },
      (response) => {
        if (response.assets && response.assets[0]) {
          onUpload(response.assets[0]);
        }
      }
    );
  };

  return (
    <Button type="primary" variant="outlined" onPress={handleUpload}>
      {children}
    </Button>
  );
};
