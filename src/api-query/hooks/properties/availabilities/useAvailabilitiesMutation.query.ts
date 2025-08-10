import { UseMutateAsyncFunction, useMutation } from "@tanstack/react-query";
import { errorHandler } from "../../../../utils/errors.utils";
import {
  createAvailabilityHandler,
  deleteAvailabilityByIdHandler,
  deleteAvailabilityByRangeDateHandler,
} from "../../../api/availabilities.api";
import {
  AddAvailabilityDto,
  Availability,
} from "../../../../backend/casaikos-api";
import { showSuccessAlert } from "../../../../components/ui/alerts/alerts.component";

type IResponse = {
  createAvailabilities: UseMutateAsyncFunction<
    void,
    unknown,
    AddAvailabilityDto,
    unknown
  >;
  isCreateLoading: boolean;
  deleteAvailabilityById: UseMutateAsyncFunction<
    Availability,
    unknown,
    string,
    unknown
  >;
  deleteAvailabilityByRangeDate: UseMutateAsyncFunction<
    void,
    unknown,
    { propertyId: string; from: string; to?: string },
    unknown
  >;
};

export const useAvailabilitiesMutation = (): IResponse => {
  const createMutation = useMutation({
    mutationFn: createAvailabilityHandler,
    onSuccess: () => {
      showSuccessAlert("Success", "Property availability created successfully");
    },
    onError: errorHandler,
  });

  const deleteByIdMutation = useMutation({
    mutationFn: deleteAvailabilityByIdHandler,
    onSuccess: () => {
      showSuccessAlert("Success", "Property availability deleted successfully");
    },
    onError: errorHandler,
  });

  const deleteByRangeMutation = useMutation({
    mutationFn: deleteAvailabilityByRangeDateHandler,
    onSuccess: () => {
      showSuccessAlert(
        "Success",
        "Property availability range deleted successfully"
      );
    },
    onError: errorHandler,
  });

  return {
    createAvailabilities: createMutation.mutateAsync,
    isCreateLoading: createMutation.isPending,
    deleteAvailabilityById: deleteByIdMutation.mutateAsync,
    deleteAvailabilityByRangeDate: deleteByRangeMutation.mutateAsync,
  };
};
