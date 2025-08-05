import axios from "axios";
import { getToken } from "./token.utils";

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formData = new (global as any).FormData();
  formData.append("tenantId", tenantId);
  formData.append("message", message);

  if (file) {
    const fileObject: RNFormDataFile = {
      uri: file.uri,
      name: file.name,
      type: file.type,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
