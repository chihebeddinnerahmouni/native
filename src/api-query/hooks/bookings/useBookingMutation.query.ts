import { UseMutateAsyncFunction, useMutation } from "@tanstack/react-query";
import {
  archiveBookingToggleHandler,
  confirmBookingPayment,
  createBooking,
  deleteBooking,
  extendBookingHandler,
  updateBookingStatus,
} from "../../api/bookings.api";
import { errorHandler } from "../../../utils/errors.utils";
import {
  Booking,
  ConfirmBookingPaymentDto,
  CreateBookingDto,
  EBookingStatus,
  ExtendBookingDto,
  ViewPropertyDto,
} from "../../../backend/casaikos-api";
import { showSuccessAlert } from "../../../components/ui/alerts/alerts.component";

type UpdateStatusBookingProps = {
  id: string;
  newStatus: EBookingStatus;
  requestDto: ViewPropertyDto;
};

type IResponse = {
  isLoading: boolean;
  confirmBookingPayment: UseMutateAsyncFunction<
    Booking,
    unknown,
    { requestDto: ConfirmBookingPaymentDto; bookingId: string },
    unknown
  >;
  createBooking: UseMutateAsyncFunction<
    Booking,
    unknown,
    CreateBookingDto,
    unknown
  >;
  deleteBooking: (bookingId: string) => Promise<void>;
  updateBooking: (requestDto: UpdateStatusBookingProps) => Promise<void>;
  extendBooking: UseMutateAsyncFunction<
    void,
    unknown,
    { bookingId: string; extendBookingDto: ExtendBookingDto },
    unknown
  >;
  archiveBooking: UseMutateAsyncFunction<
    void,
    unknown,
    { bookingId: string; archive: boolean },
    unknown
  >;
};

export const useBookingMutation = (): IResponse => {
  const confirmBookingPaymentMutation = useMutation({
    mutationFn: ({
      requestDto,
      bookingId,
    }: {
      requestDto: ConfirmBookingPaymentDto;
      bookingId: string;
    }) => {
      return confirmBookingPayment(bookingId, requestDto);
    },
    onSuccess: () => {
      showSuccessAlert("Success", "Payments saved successfully");
    },
    onError: errorHandler,
  });

  const createMutation = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      showSuccessAlert("Success", "Booking created successfully");
    },
    onError: errorHandler,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      showSuccessAlert("Success", "Booking removed successfully");
    },
    onError: errorHandler,
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      requestDto,
      newStatus,
    }: UpdateStatusBookingProps) => {
      await updateBookingStatus(id, requestDto, newStatus);
    },
    onSuccess: () => {
      showSuccessAlert("Success", "Booking saved successfully");
    },
    onError: errorHandler,
  });

  const extendMutation = useMutation({
    mutationFn: async ({
      bookingId,
      extendBookingDto,
    }: {
      bookingId: string;
      extendBookingDto: ExtendBookingDto;
    }) => {
      await extendBookingHandler(bookingId, extendBookingDto);
    },
    onSuccess: () => {
      showSuccessAlert("Success", "Booking extended successfully");
    },
    onError: errorHandler,
  });

  const archiveMutation = useMutation({
    mutationFn: async ({
      bookingId,
      archive,
    }: {
      bookingId: string;
      archive: boolean;
    }) => {
      await archiveBookingToggleHandler(bookingId, archive);
    },
    onSuccess: () => {
      showSuccessAlert("Success", "Booking updated successfully");
    },
    onError: errorHandler,
  });

  return {
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      extendMutation.isPending,
    confirmBookingPayment: confirmBookingPaymentMutation.mutateAsync,
    createBooking: createMutation.mutateAsync,
    deleteBooking: deleteMutation.mutateAsync,
    updateBooking: updateMutation.mutateAsync,
    extendBooking: extendMutation.mutateAsync,
    archiveBooking: archiveMutation.mutateAsync,
  };
};
