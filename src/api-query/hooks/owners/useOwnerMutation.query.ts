import { useMutation } from "@tanstack/react-query";
import { createOwner, deleteOwner, updateOwner } from "../../api/owners.api";
import { CreateOwnerDto, Owner } from "../../../backend/casaikos-api";
import { errorHandler } from "../../../utils/errors.utils";
import { showSuccessAlert } from "../../../components/ui/alerts/alerts.component";

type SaveOwnerVariables = {
  ownerData: CreateOwnerDto;
  selectedOwner?: Owner;
};

type UseOwnerProps = {
  deleteOwner: (owner: Owner) => Promise<void>;
  saveOwner: (variables: SaveOwnerVariables) => Promise<void>;
  isSaveLoading: boolean;
};

export const useOwnerMutation = (): UseOwnerProps => {
  const deleteMutation = useMutation({
    mutationFn: deleteOwner,
    onSuccess: () => {
      showSuccessAlert("Success", "Owner removed successfully");
    },
    onError: errorHandler,
  });

  const saveOwnerMutation = useMutation({
    mutationFn: async ({ selectedOwner, ownerData }: SaveOwnerVariables) => {
      await (selectedOwner
        ? updateOwner(selectedOwner._id, ownerData)
        : createOwner(ownerData));
    },
    onSuccess: () => {
      showSuccessAlert("Success", "Owner saved successfully");
    },
    onError: errorHandler,
  });

  return {
    deleteOwner: deleteMutation.mutateAsync,
    saveOwner: saveOwnerMutation.mutateAsync,
    isSaveLoading: saveOwnerMutation.isPending,
  };
};
