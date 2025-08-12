/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { HostedFile } from "../../backend/casaikos-api";
import { noImagePlaceholder } from "../../constants/constant";
import { getToken } from "../token.utils";
import { RNFile, RNFormDataFile } from "../files.utils";
import { showErrorAlert } from "../../components/ui/alerts/alerts.component";

const csrfToken: string | null = null;
const API_URL = process.env.EXPO_PUBLIC_API_URL;

const AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const uploadPropertyImagesHandler = async (
  propertyId: string,
  files: RNFile[]
) => {
  try {
    const token = await getToken();
    const formData = new (global as any).FormData();

    files.forEach((file) => {
      const fileObject: RNFormDataFile = {
        uri: file.uri,
        name: file.name,
        type: file.type,
      };
      formData.append("files", fileObject);
    });

    const response = await AxiosInstance.post(
      `/properties/${propertyId}/images`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
          "X-CSRF-TOKEN": csrfToken,
        },
      }
    );

    return response.data;
  } catch (error) {
    showErrorAlert("Error", "Failed to upload images. Please try again.");
  }
};

export const getImageUrl = (hostedFile?: HostedFile): string => {
  if (!hostedFile || !hostedFile.fileKey) {
    return String(noImagePlaceholder);
  }

  return `${API_URL}/files/${hostedFile.fileKey}`;
};
