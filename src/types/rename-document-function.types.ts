/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormSetError, UseFormSetFocus } from "react-hook-form";

export type RenameDocumentParams = {
  fileKey: string;
  newFileName: string;
  onSuccess: () => void;
  setError: UseFormSetError<any>;
  setFocus: UseFormSetFocus<{ newName: string }>;
};

// from chiheb: this is a type for the rename document function, it is used in the tenant, owner, booking and property documents components
