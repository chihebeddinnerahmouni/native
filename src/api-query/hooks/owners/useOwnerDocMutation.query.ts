/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMutateAsyncFunction, useMutation } from "@tanstack/react-query";
import { deleteOwnerDocument, renameOwnerDocument } from "../../api/owners.api";
import { Owner, RenameFileDto } from "../../../backend/casaikos-api";
import { errorHandler } from "../../../utils/errors.utils";
import { RNFile, uploadFiles } from "../../../utils/files.utils";
import { showSuccessAlert } from "../../../components/ui/alerts/alerts.component";

type IResponse = {
  deleteOwnerDoc: UseMutateAsyncFunction<
    Owner,
    unknown,
    { fileKey: string; ownerId: string },
    unknown
  >;
  renameOwnerDoc: UseMutateAsyncFunction<
    Owner,
    unknown,
    { fileKey: string; ownerId: string; newFileName: RenameFileDto },
    unknown
  >;
  isRenamePending: boolean;
  uploadOwnerFiles: UseMutateAsyncFunction<
    any,
    unknown,
    { files: RNFile[]; ownerId: string },
    unknown
  >;
  isUploadPending: boolean;
};

export const useOwnerDocMutation = (): IResponse => {
  const deleteDocumentMutation = useMutation({
    mutationFn: ({ fileKey, ownerId }: { fileKey: string; ownerId: string }) =>
      deleteOwnerDocument(fileKey, ownerId),
    onSuccess: () => {
      showSuccessAlert("Success", "Owner document deleted successfully");
    },
    onError: errorHandler,
  });

  const renameDocumentMutation = useMutation({
    mutationFn: ({
      fileKey,
      ownerId,
      newFileName,
    }: {
      fileKey: string;
      ownerId: string;
      newFileName: RenameFileDto;
    }) => renameOwnerDocument(fileKey, ownerId, newFileName),
    onSuccess: () => {
      showSuccessAlert("Success", "Owner document renamed successfully");
    },
    onError: errorHandler,
  });

  const uploadDocumentMutation = useMutation({
    mutationFn: ({ files, ownerId }: { files: RNFile[]; ownerId: string }) =>
      uploadFiles(`/owners/upload-multiple/${ownerId}`, files),
    onError: errorHandler,
  });

  return {
    deleteOwnerDoc: deleteDocumentMutation.mutateAsync,
    renameOwnerDoc: renameDocumentMutation.mutateAsync,
    isRenamePending: renameDocumentMutation.isPending,
    uploadOwnerFiles: uploadDocumentMutation.mutateAsync,
    isUploadPending: uploadDocumentMutation.isPending,
  };
};
