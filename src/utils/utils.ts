/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormSetError, UseFormSetFocus } from "react-hook-form";
import { AxiosInstanceErrorResponse } from "./axios.utils";
import { URL } from "react-native-url-polyfill";

export const handleFormsServerErrors = (
  error: AxiosInstanceErrorResponse,
  setError: UseFormSetError<any>,
  setFocus: UseFormSetFocus<any>
) => {
  if (error.status === 400) {
    const serverErrors = error.message as unknown as Record<string, string>;
    Object.keys(serverErrors).forEach((fieldName) => {
      setError(
        fieldName === "whatsappId" ? "phoneNumber" : (fieldName as any),
        {
          type: "validate",
          message: serverErrors[fieldName],
        }
      );
      setFocus(fieldName as any);
    });
  }
};

// export function downloadBase64File(
//   base64String: string,
//   fileName: string,
//   mimeType: string
// ) {
//   const buffer = convertBase64FileToBuffer(base64String);

//   // Create a Blob from the buffer
//   const blob = new Blob([buffer], { type: mimeType });
//   const url = URL.createObjectURL(blob);

//   // Create an anchor element and trigger the download
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = fileName;
//   document.body.appendChild(a); // Append to the document
//   a.click(); // Trigger the download
//   document.body.removeChild(a); // Clean up
//   URL.revokeObjectURL(url); // Release the URL object
// }

// export const convertBase64FileToBuffer = (base64String: string): Buffer => {
//   // Gmail API uses URL-safe base64, so replace `-` with `+` and `_` with `/`
//   const base64Data = base64String.replace(/-/g, "+").replace(/_/g, "/");

//   return Buffer.from(base64Data, "base64");
// };

// export const convertBase64FileToBlob = (base64String: string): Buffer => {
//   // Gmail API uses URL-safe base64, so replace `-` with `+` and `_` with `/`
//   const base64Data = base64String.replace(/-/g, "+").replace(/_/g, "/");

//   return Buffer.from(base64Data, "base64");
// };

// export const blobToFile = (blob: Blob, fileName: string): File => {
//   const file = new File([blob], fileName, {
//     type: blob.type,
//     lastModified: new Date().getTime(),
//   });
//   return file;
// };

// export function base64ToFile(
//   base64: string,
//   fileName: string,
//   contentType = ""
// ) {
//   const blob = convertBase64FileToBlob(base64);
//   return new File([blob], fileName, {
//     type: contentType,
//     lastModified: new Date().getTime(),
//   });
// }

// export const getVarColor = (cssVarName = "--primary-color"): string => {
//   try {
//     if (typeof window === "undefined") return "#2664EB";

//     const color = getComputedStyle(document.documentElement)
//       .getPropertyValue(cssVarName)
//       .trim();

//     return color || "#2664EB";
//   } catch (error) {
//     return "#2664EB";
//   }
// };

export const capitalizeText = (text: string): string => {
  if (!text) return "";
  return text
    .toLocaleLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const extractAirBnbId = (
  url: string,
  segment: string
): string | undefined => {
  if (!url.trim()) return undefined;

  try {
    const parsedUrl = new URL(url);

    if (!parsedUrl.hostname.includes("airbnb.com")) {
      return undefined;
    }
  } catch (e) {
    return undefined;
  }

  const cleanedUrl = url.split(/[?#]/)[0];
  const escapedSegment = segment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`/${escapedSegment}/(\\d{8,})`);
  const match = cleanedUrl.match(regex);

  return match?.[1];
};
