import { EBookingStatus } from "../backend/casaikos-api";
import { TUIType } from "./theme.utils";

const statusToType: Record<EBookingStatus, TUIType> = {
  [EBookingStatus.INITIAL]: "info",
  [EBookingStatus.VIEWING]: "info",
  [EBookingStatus.TENANT_REJECTED_BEFORE_BOOKING]: "danger",
  [EBookingStatus.AGENT_DECLINED_BEFORE_BOOKING]: "danger",
  [EBookingStatus.PENDING_PAYMENT]: "warning",
  [EBookingStatus.BOOKED]: "success",
  [EBookingStatus.TENANT_CANCELED_AFTER_BOOKING]: "danger",
  [EBookingStatus.AGENT_CANCELED_AFTER_BOOKING]: "danger",
  [EBookingStatus.CHECK_IN]: "success",
  [EBookingStatus.AGENT_STOPPED_DURING_RENT]: "danger",
  [EBookingStatus.TENANT_STOPPED_DURING_RENT]: "danger",
  [EBookingStatus.CHECK_OUT]: "success",
  [EBookingStatus.REFUND]: "info",
  [EBookingStatus.DONE]: "success",
};

export const preBookingStatus: EBookingStatus[] = [
  EBookingStatus.INITIAL,
  EBookingStatus.VIEWING,
  EBookingStatus.TENANT_REJECTED_BEFORE_BOOKING,
  EBookingStatus.AGENT_DECLINED_BEFORE_BOOKING,
  EBookingStatus.PENDING_PAYMENT,
  EBookingStatus.BOOKED,
];

export const postBookingStatus: EBookingStatus[] = [
  EBookingStatus.BOOKED,
  EBookingStatus.TENANT_CANCELED_AFTER_BOOKING,
  EBookingStatus.AGENT_CANCELED_AFTER_BOOKING,
  EBookingStatus.CHECK_IN,
  EBookingStatus.AGENT_STOPPED_DURING_RENT,
  EBookingStatus.TENANT_STOPPED_DURING_RENT,
  EBookingStatus.CHECK_OUT,
  EBookingStatus.REFUND,
  EBookingStatus.DONE,
];

export const allowedToArchive: EBookingStatus[] = [
  EBookingStatus.INITIAL,
  EBookingStatus.VIEWING,
  EBookingStatus.TENANT_REJECTED_BEFORE_BOOKING,
  EBookingStatus.AGENT_DECLINED_BEFORE_BOOKING,
  EBookingStatus.PENDING_PAYMENT,
];

export const bookingStatusList = [
  {
    label: "Booked",
    value: EBookingStatus.BOOKED,
    isDraggableTo: true,
  },
  {
    label: "Tenant Canceled",
    value: EBookingStatus.TENANT_CANCELED_AFTER_BOOKING,
    isDraggableTo: true,
  },
  {
    label: "Checked-In",
    value: EBookingStatus.CHECK_IN,
    isDraggableTo: true,
  },
  {
    label: "Tenant Stopped",
    value: EBookingStatus.TENANT_STOPPED_DURING_RENT,
    isDraggableTo: true,
  },
  {
    label: "Agent Stopped",
    value: EBookingStatus.AGENT_STOPPED_DURING_RENT,
    isDraggableTo: true,
  },
  {
    label: "Checked-Out",
    value: EBookingStatus.CHECK_OUT,
    isDraggableTo: true,
  },
  {
    label: "Refunded",
    value: EBookingStatus.REFUND,
    isDraggableTo: true,
  },
  {
    label: "Done",
    value: EBookingStatus.DONE,
    isDraggableTo: true,
  },
];

export const preBookingStatusList = [
  {
    label: "Initial",
    value: EBookingStatus.INITIAL,
    isDraggableTo: false,
  },
  {
    label: "Viewing",
    value: EBookingStatus.VIEWING,
    isDraggableTo: true,
  },
  {
    label: "Tenant Rejected",
    value: EBookingStatus.TENANT_REJECTED_BEFORE_BOOKING,
    isDraggableTo: true,
  },
  {
    label: "Agent Declined",
    value: EBookingStatus.AGENT_DECLINED_BEFORE_BOOKING,
    isDraggableTo: true,
  },
  {
    label: "Pending",
    value: EBookingStatus.PENDING_PAYMENT,
    isDraggableTo: true,
  },
  {
    label: "Booked",
    value: EBookingStatus.BOOKED,
    isDraggableTo: true,
  },
];

export const archivedPreBookingStatusList = preBookingStatusList.map(
  (status) => ({
    ...status,
    isDraggableTo: false,
  })
);

export const archivedBookingStatusList = bookingStatusList.map((status) => ({
  ...status,
  isDraggableTo: false,
}));

export const getBadgeType = (status: EBookingStatus | undefined): TUIType => {
  return status ? statusToType[status] : "info";
};
