/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { getToken } from "./token.utils";
import { showSuccessAlert } from "../components/ui/alerts/alerts.component";
import errorHandler from "./errors.utils";
import * as DocumentPicker from "expo-document-picker";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
let csrfToken: string | null = null;

const AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export interface RNFile {
  uri: string;
  name: string;
  type: string;
  size?: number;
}

interface RNFormDataFile {
  uri: string;
  name: string;
  type: string;
}

export const sendWhatsappRequest = async (
  tenantId: string,
  message: string,
  file?: RNFile | null
) => {
  const token = await getToken();

  const formData = new (global as any).FormData();
  formData.append("tenantId", tenantId);
  formData.append("message", message);

  if (file) {
    const fileObject: RNFormDataFile = {
      uri: file.uri,
      name: file.name,
      type: file.type,
    };
    formData.append("file", fileObject as any);
  }

  const response = await AxiosInstance.post(
    `/whatsapp/send-message`,
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
};

export const uploadFiles = async (endPoint: string, files: RNFile[]) => {
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

    const response = await AxiosInstance.post(`${endPoint}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
        "X-CSRF-TOKEN": csrfToken,
      },
    });

    showSuccessAlert("Success", "Files uploaded successfully");
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

export const convertToRNFile = (
  files: DocumentPicker.DocumentPickerAsset[]
): RNFile[] => {
  return files.map((file) => ({
    uri: file.uri,
    name: file.name,
    type: file.mimeType || "application/octet-stream",
    size: file.size,
  }));
};
