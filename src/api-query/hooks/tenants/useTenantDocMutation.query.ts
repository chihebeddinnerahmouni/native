/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMutateAsyncFunction, useMutation } from "@tanstack/react-query";
import {
  deleteTenantDocument,
  renameTenantDocument,
} from "../../api/tenants.api";
import { RenameFileDto, Tenant } from "../../../backend/casaikos-api";
import { errorHandler } from "../../../utils/errors.utils";
import { RNFile, uploadFiles } from "../../../utils";
import { showSuccessAlert } from "../../../components/ui/alerts/alerts.component";

type IResponse = {
  deleteTenantDoc: UseMutateAsyncFunction<
    Tenant,
    unknown,
    { fileKey: string; tenantId: string },
    unknown
  >;
  renameTenantDoc: UseMutateAsyncFunction<
    Tenant,
    unknown,
    { fileKey: string; tenantId: string; newFileName: RenameFileDto },
    unknown
  >;
  isRenamePending: boolean;
  uploadTenantFiles: UseMutateAsyncFunction<
    any,
    unknown,
    { files: RNFile[]; tenantId: string },
    unknown
  >;
  isUploadPending: boolean;
};

export const useTenantDocMutation = (): IResponse => {
  const deleteDocumentMutation = useMutation({
    mutationFn: ({
      fileKey,
      tenantId,
    }: {
      fileKey: string;
      tenantId: string;
    }) => deleteTenantDocument(fileKey, tenantId),
    onSuccess: () => {
      showSuccessAlert("Success", "Document deleted successfully");
    },
    onError: errorHandler,
  });

  const renameDocumentMutation = useMutation({
    mutationFn: ({
      fileKey,
      tenantId,
      newFileName,
    }: {
      fileKey: string;
      tenantId: string;
      newFileName: RenameFileDto;
    }) => renameTenantDocument(fileKey, tenantId, newFileName),
    onSuccess: () => {
      showSuccessAlert("Success", "Tenant document renamed successfully");
    },
    onError: errorHandler,
  });

  const uploadDocumentMutation = useMutation({
    mutationFn: ({ files, tenantId }: { files: RNFile[]; tenantId: string }) =>
      uploadFiles(`/tenants/upload-multiple/${tenantId}`, files),
    onError: errorHandler,
  });

  return {
    deleteTenantDoc: deleteDocumentMutation.mutateAsync,
    renameTenantDoc: renameDocumentMutation.mutateAsync,
    isRenamePending: renameDocumentMutation.isPending,
    uploadTenantFiles: uploadDocumentMutation.mutateAsync,
    isUploadPending: uploadDocumentMutation.isPending,
  };
};
