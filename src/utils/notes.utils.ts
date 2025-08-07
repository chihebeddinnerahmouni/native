import axios from "axios";
import { getToken } from "./token.utils";
import { toast } from "react-toastify";

const csrfToken: string | null = null;
const API_URL = process.env.REACT_APP_API_URL;

const AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const uploadPropertyNotesHandler = async () =>
  // propertyId: string,
  // text: string,
  // title?: string,
  // files?: File[] | null
  {
    // try {
    //   const token = getToken();
    //   const formData = new FormData();
    //   if (files && files.length > 0) {
    //     files.forEach((file) => {
    //       formData.append(`files`, file);
    //     });
    //   }
    //   formData.append("text", text);
    //   if (title) {
    //     formData.append("title", title);
    //   }
    //   const response = await AxiosInstance.post(
    //     `/properties/${propertyId}/note`,
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //         Authorization: `Bearer ${token}`,
    //         "X-CSRF-TOKEN": csrfToken,
    //       },
    //     }
    //   );
    //   return response.data;
    // } catch (error) {
    //   toast.error("Something went wrong");
    // }
  };
