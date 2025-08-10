// import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
// import { toast } from 'react-toastify';
// import { AddTargetDto, Target } from '../../../../backend/casaikos-api';
// import { errorHandler } from '../../../../utils/errors.utils';
// import {
//   createTargetHandler,
//   deleteTargetHandler,
//   updateTargetHandler,
// } from '../../../api/targets.api';

// type IResponse = {
//   createTarget: UseMutateAsyncFunction<void, unknown, AddTargetDto, unknown>;
//   updateTarget: (variables: {
//     targetId: string;
//     CreateTargetDto: AddTargetDto;
//   }) => Promise<Target>;
//   isLoading: boolean;
//   deleteTarget: UseMutateAsyncFunction<Target, unknown, string, unknown>;
// };

// export const useTargetsMutation = (): IResponse => {
//   const createTargetMutation = useMutation({
//     mutationFn: createTargetHandler,
//     onSuccess: () => {
//       toast.success('Target created successfully');
//     },
//     onError: errorHandler,
//   });

//   const updateTargetMutation = useMutation({
//     mutationFn: ({
//       targetId,
//       CreateTargetDto,
//     }: {
//       targetId: string;
//       CreateTargetDto: AddTargetDto;
//     }) => {
//       return updateTargetHandler(targetId, CreateTargetDto);
//     },
//     onSuccess: () => {
//       toast.success('Target updated successfully');
//     },
//     onError: errorHandler,
//   });

//   const deleteTargetMutation = useMutation({
//     mutationFn: deleteTargetHandler,
//     onSuccess: () => {
//       toast.success('Target deleted successfully');
//     },
//     onError: errorHandler,
//   });
//   return {
//     createTarget: createTargetMutation.mutateAsync,
//     updateTarget: updateTargetMutation.mutateAsync,
//     isLoading: createTargetMutation.isPending || updateTargetMutation.isPending,
//     deleteTarget: deleteTargetMutation.mutateAsync,
//   };
// };
