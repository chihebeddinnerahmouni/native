// import { UseMutateAsyncFunction, useMutation } from "@tanstack/react-query";
// import { toast } from "react-toastify";
// import { errorHandler } from "../../../../utils/errors.utils";
// import {
//   createAvailabilityHandler,
//   deleteAvailabilityByIdHandler,
//   deleteAvailabilityByRangeDateHandler,
// } from "../../../api/availabilities.api";
// import {
//   AddAvailabilityDto,
//   Availability,
// } from "../../../../backend/casaikos-api";

// type IResponse = {
//   createAvailabilities: UseMutateAsyncFunction<
//     void,
//     unknown,
//     AddAvailabilityDto,
//     unknown
//   >;
//   isCreateLoading: boolean;
//   deleteAvailabilityById: UseMutateAsyncFunction<
//     Availability,
//     unknown,
//     string,
//     unknown
//   >;
//   deleteAvailabilityByRangeDate: UseMutateAsyncFunction<
//     void,
//     unknown,
//     { propertyId: string; from: string; to?: string },
//     unknown
//   >;
// };

// export const useAvailabilitiesMutation = (): IResponse => {
//   const createMutation = useMutation({
//     mutationFn: createAvailabilityHandler,
//     onSuccess: () => {
//       toast.success("Property availability created successfully");
//     },
//     onError: errorHandler,
//   });

//   const deleteByIdMutation = useMutation({
//     mutationFn: deleteAvailabilityByIdHandler,
//     onSuccess: () => {
//       toast.success("Property availability deleted successfully");
//     },
//     onError: errorHandler,
//   });

//   const deleteByRangeMutation = useMutation({
//     mutationFn: deleteAvailabilityByRangeDateHandler,
//     onSuccess: () => {
//       toast.success("Property availability deleted successfully");
//     },
//     onError: errorHandler,
//   });

//   return {
//     createAvailabilities: createMutation.mutateAsync,
//     isCreateLoading: createMutation.isPending,
//     deleteAvailabilityById: deleteByIdMutation.mutateAsync,
//     deleteAvailabilityByRangeDate: deleteByRangeMutation.mutateAsync,
//   };
// };
