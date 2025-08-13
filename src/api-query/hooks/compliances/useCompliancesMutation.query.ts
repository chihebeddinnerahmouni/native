import { UseMutateAsyncFunction, useMutation } from "@tanstack/react-query";
import { errorHandler } from "../../../utils/errors.utils";
import { updateComplianceHandler } from "../../api/compliances.api";
import { ComplianceDto, Property } from "../../../backend/casaikos-api";
import { showSuccessAlert } from "../../../components/ui/alerts/alerts.component";

type IResponse = {
  updateCompliance: UseMutateAsyncFunction<
    Property,
    unknown,
    { propertyId: string; values: ComplianceDto },
    unknown
  >;
  isLoading: boolean;
};

export const useCompliancesMutation = (): IResponse => {
  const updateComplianceMutation = useMutation({
    mutationFn: updateComplianceHandler,
    onSuccess: () => {
      showSuccessAlert("Success", "Compliance updated successfully");
    },
    onError: errorHandler,
  });

  return {
    updateCompliance: updateComplianceMutation.mutateAsync,
    isLoading: updateComplianceMutation.isPending,
  };
};
