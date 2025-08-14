import { useMutation } from "@tanstack/react-query";
import {
  createTenant,
  deleteTenant,
  updateTenant,
} from "../../api/tenants.api";
import { CreateTenantDto, Tenant } from "../../../backend/casaikos-api";
import { errorHandler } from "../../../utils/errors.utils";
import { showSuccessAlert } from "../../../components/ui/alerts/alerts.component";

type SaveTenantVariables = {
  tenantData: CreateTenantDto;
  selectedTenant?: Tenant;
};

type UseTenantProps = {
  deleteTenant: (tenant: Tenant) => Promise<void>;
  saveTenant: (variables: SaveTenantVariables) => Promise<void>;
  isSaveLoading: boolean;
};

export const useTenantMutation = (): UseTenantProps => {
  const deleteMutation = useMutation({
    mutationFn: deleteTenant,
    onSuccess: () => {
      showSuccessAlert("Success", "Tenant removed successfully");
    },
    onError: errorHandler,
  });

  const saveTenantMutation = useMutation({
    mutationFn: async ({ selectedTenant, tenantData }: SaveTenantVariables) => {
      await (selectedTenant
        ? updateTenant(selectedTenant._id, tenantData)
        : createTenant(tenantData));
    },
    onSuccess: () => {
      showSuccessAlert("Success", "Tenant saved successfully");
    },
    onError: errorHandler,
  });

  return {
    deleteTenant: deleteMutation.mutateAsync,
    saveTenant: saveTenantMutation.mutateAsync,
    isSaveLoading: saveTenantMutation.isPending,
  };
};
