import {
  ConfirmBookingPaymentDto,
  CreateBookingDto,
  EBookingStatus,
  ExtendBookingDto,
  FetchBookingsDto,
  RenameFileDto,
  ViewPropertyDto,
} from "../../backend/casaikos-api";
import { AxiosInstance } from "../../utils";

// Fetch all bookings
export const getBookings = async (options: FetchBookingsDto) => {
  const response =
    await AxiosInstance.bookings.bookingsControllerFindAll(options);
  return response.data;
};

export const getBookingById = async (id: string) => {
  const response =
    await AxiosInstance.bookings.bookingsControllerGetBookingById(id);
  return response.data;
};

export const getReservations = async () => {
  const { data } =
    await AxiosInstance.bookings.bookingsControllerGetDashboardData();
  return data;
};

export const createBooking = async (bookingData: CreateBookingDto) => {
  const response =
    await AxiosInstance.bookings.bookingsControllerCreate(bookingData);
  return response.data;
};

export const updateBookingStatus = async (
  id: string,
  bookingData: ViewPropertyDto,
  newStatus: EBookingStatus
) => {
  let request;

  switch (newStatus) {
    case EBookingStatus.VIEWING:
      request = AxiosInstance.bookingStatus.bookingStatusControllerViewProperty;
      break;
    case EBookingStatus.TENANT_REJECTED_BEFORE_BOOKING:
      request =
        AxiosInstance.bookingStatus.bookingStatusControllerTenantRejectBooking;
      break;
    case EBookingStatus.AGENT_DECLINED_BEFORE_BOOKING:
      request =
        AxiosInstance.bookingStatus.bookingStatusControllerAgentDeclinedBooking;
      break;
    case EBookingStatus.BOOKED:
      request = AxiosInstance.bookingStatus.bookingStatusControllerBookProperty;
      break;
    case EBookingStatus.PENDING_PAYMENT:
      request = AxiosInstance.bookingStatus.bookingStatusControllerAwaitPayment;
      break;
    case EBookingStatus.TENANT_CANCELED_AFTER_BOOKING:
      request =
        AxiosInstance.bookingStatus.bookingStatusControllerTenantCancelBooking;
      break;
    case EBookingStatus.AGENT_CANCELED_AFTER_BOOKING:
      request =
        AxiosInstance.bookingStatus.bookingStatusControllerAgentCancelBooking;
      break;
    case EBookingStatus.CHECK_IN:
      request =
        AxiosInstance.bookingStatus.bookingStatusControllerCheckInBooking;
      break;
    case EBookingStatus.CHECK_OUT:
      request =
        AxiosInstance.bookingStatus.bookingStatusControllerCheckOutBooking;
      break;
    case EBookingStatus.REFUND:
      request =
        AxiosInstance.bookingStatus.bookingStatusControllerRefundBooking;
      break;

    default:
      throw new Error(`Unsupported booking status: ${newStatus}`);
  }

  const response = await request(id, bookingData);
  return response.data;
};

export const viewBooking = async (id: string, bookingData: ViewPropertyDto) => {
  const response =
    await AxiosInstance.bookingStatus.bookingStatusControllerViewProperty(
      id,
      bookingData
    );
  return response.data;
};

export const deleteBooking = async (bookingId: string) => {
  await AxiosInstance.bookings.bookingsControllerDeleteBooking(bookingId);
};

export const confirmBookingPayment = async (
  id: string,
  requestDto: ConfirmBookingPaymentDto
) => {
  const response =
    await AxiosInstance.bookingPayment.bookingPaymentsControllerConfirmBookingPayments(
      id,
      requestDto
    );
  return response.data;
};

export const getTenantBookings = async (tenantId: string) => {
  const response = await AxiosInstance.bookings.bookingsControllerFindAll({
    filter: {
      tenantIds: [tenantId],
    },
  });
  return response.data.items;
};

export const renameBookingDocument = async (
  fileKey: string,
  bookingId: string,
  newFileName: RenameFileDto
) => {
  const response =
    await AxiosInstance.bookings.bookingsControllerRenameBookingFile(
      fileKey,
      bookingId,
      newFileName
    );
  return response.data;
};

export const deleteBookingDocument = async (
  fileKey: string,
  bookingId: string
) => {
  const response =
    await AxiosInstance.bookings.bookingsControllerDeleteBookingFile(
      fileKey,
      bookingId
    );
  return response.data;
};

export const extendBookingHandler = async (
  bookingId: string,
  extendBookingDto: ExtendBookingDto
) => {
  const response = await AxiosInstance.bookings.bookingsControllerExtendBooking(
    bookingId,
    extendBookingDto
  );
  return response.data;
};

export const getActiveBookingHandler = async (tenantId: string) => {
  const response =
    await AxiosInstance.bookings.bookingsControllerGetLastActiveBookingOfTenant(
      tenantId
    );
  return response.data;
};

export const archiveBookingToggleHandler = async (
  bookingId: string,
  archive: boolean
) => {
  const response =
    await AxiosInstance.bookingStatus.bookingStatusControllerArchiveBooking(
      bookingId,
      { archive }
    );
  return response.data;
};
