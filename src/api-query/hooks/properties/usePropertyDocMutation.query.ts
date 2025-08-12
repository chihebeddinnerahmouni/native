import { UseMutateAsyncFunction, useMutation } from "@tanstack/react-query";
import {
  deletePropertyDocument,
  deletePropertyImageHandler,
  renamePropertyDocument,
  updateMainImageHandler,
} from "../../api/properties.api";
import {
  HostedFile,
  Property,
  RenameFileDto,
} from "../../../backend/casaikos-api";
import { errorHandler } from "../../../utils/errors.utils";
import { RNFile, uploadFiles } from "../../../utils/files.utils";
import { showSuccessAlert } from "../../../components/ui/alerts/alerts.component";
import { uploadPropertyImagesHandler } from "../../../utils/validators/images.utils";
// import { uploadPropertyImagesHandler } from "../../../utils/images.utils";

type UpdateMainImageArgs = {
  propertyId: string;
  imagesUrls: HostedFile[];
};

type IResponse = {
  deletePropertyDoc: UseMutateAsyncFunction<Property, unknown, string, unknown>;
  deletePropertyImages: (url: string) => void;
  renamePropertyDoc: UseMutateAsyncFunction<
    Property,
    unknown,
    { fileKey: string; newFileName: RenameFileDto },
    unknown
  >;
  uploadPropertyFiles: (files: RNFile[]) => Promise<void>;
  uploadPropertyImages: (files: RNFile[]) => Promise<void>;
  updateMainImage: (args: UpdateMainImageArgs) => Promise<void>;
  isRenamePending: boolean;
  isUploadPending: boolean;
};

type IProps = {
  propertyId: string;
};

export const usePropertyDocMutation = (options?: IProps): IResponse => {
  const { propertyId = "" } = options || {};

  const deleteDocumentMutation = useMutation({
    mutationFn: (fileKey: string) =>
      deletePropertyDocument(fileKey, propertyId),
    onSuccess: () => {
      showSuccessAlert("Success", "Document deleted successfully");
    },
    onError: errorHandler,
  });

  const deleteImagesMutation = useMutation({
    mutationFn: (fileKey: string) =>
      deletePropertyImageHandler(propertyId, fileKey),
    onSuccess: () => {
      showSuccessAlert("Success", "Property image deleted successfully");
    },
    onError: errorHandler,
  });

  const renameDocumentMutation = useMutation({
    mutationFn: ({
      fileKey,
      newFileName,
    }: {
      fileKey: string;
      newFileName: RenameFileDto;
    }) => renamePropertyDocument(fileKey, propertyId, newFileName),
    onSuccess: () => {
      showSuccessAlert("Success", "Property document renamed successfully");
    },
    onError: errorHandler,
  });

  const uploadDocumentMutation = useMutation({
    mutationFn: (files: RNFile[]) =>
      uploadFiles(`/properties/upload-multiple/${propertyId}`, files),
    onError: errorHandler,
  });

  const uploadImagesMutation = useMutation({
    mutationFn: (files: RNFile[]) =>
      uploadPropertyImagesHandler(propertyId, files),
    onSuccess: () => {
      showSuccessAlert("Success", "Images uploaded successfully");
    },
    onError: errorHandler,
  });

  const updateMainImageMutation = useMutation({
    mutationFn: ({ propertyId, imagesUrls }: UpdateMainImageArgs) => {
      return updateMainImageHandler(propertyId, imagesUrls);
    },
    onSuccess: () => {
      showSuccessAlert("Success", "Images order updated successfully");
    },
    onError: errorHandler,
  });

  return {
    deletePropertyDoc: deleteDocumentMutation.mutateAsync,
    deletePropertyImages: deleteImagesMutation.mutateAsync,
    renamePropertyDoc: renameDocumentMutation.mutateAsync,
    uploadPropertyFiles: uploadDocumentMutation.mutateAsync,
    uploadPropertyImages: uploadImagesMutation.mutateAsync,
    updateMainImage: updateMainImageMutation.mutateAsync,
    isRenamePending: renameDocumentMutation.isPending,
    isUploadPending: uploadDocumentMutation.isPending,
  };
};
