/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { getToken } from "./token.utils";
import { RNFile, RNFormDataFile } from "./files.utils";
import { showErrorAlert } from "../components/ui/alerts/alerts.component";

const csrfToken: string | null = null;
const API_URL = process.env.EXPO_PUBLIC_API_URL;

const AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const uploadPropertyNotesHandler = async (
  propertyId: string,
  text: string,
  title?: string,
  files?: RNFile[] | null
) => {
  try {
    const token = await getToken();
    const formData = new (global as any).FormData();

    if (files && files.length > 0) {
      files.forEach((file) => {
        const fileObject: RNFormDataFile = {
          uri: file.uri,
          name: file.name,
          type: file.type,
        };
        formData.append("files", fileObject);
      });
    }
    if (title) {
      formData.append("title", title);
    }
    formData.append("text", text);

    const response = await AxiosInstance.post(
      `/properties/${propertyId}/note`,
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
    console.error("Error uploading note:", error);
    showErrorAlert("Error", "Failed to upload note. Please try again.");
  }
};
