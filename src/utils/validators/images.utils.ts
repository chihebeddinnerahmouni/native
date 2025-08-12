import axios from "axios";
import { HostedFile } from "../../backend/casaikos-api";
import { noImagePlaceholder } from "../../constants/constant";

const csrfToken: string | null = null;
const API_URL = process.env.EXPO_PUBLIC_API_URL;

const AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// export const uploadPropertyImagesHandler = async (
//   propertyId: string,
//   files: File[]
// ) => {
//   try {
//     const token = getToken();
//     const formData = new FormData();

//     files.forEach((file) => {
//       formData.append(`files`, file);
//     });

//     const response = await AxiosInstance.post(
//       `/properties/${propertyId}/images`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//           "X-CSRF-TOKEN": csrfToken,
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     toast.error("Something went wrong");
//   }
// };

export const getImageUrl = (hostedFile?: HostedFile): string => {
  if (!hostedFile || !hostedFile.fileKey) {
    return String(noImagePlaceholder);
  }

  return `${API_URL}/files/${hostedFile.fileKey}`;
};
