import * as yup from "yup";
import { EBookingStatus, EPaymentMethod } from "../../backend/casaikos-api";

export const BookingSchema = yup.object().shape({
  from: yup
    .string()
    .required("Start date (from) is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use YYYY-MM-DD"),

  to: yup
    .string()
    .required("End date (to) is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use YYYY-MM-DD")
    .test(
      "is-after-start",
      "End date must be after start date",
      function (value) {
        return new Date(value) > new Date(this.parent.from);
      }
    ),

  enquiryId: yup
    .string()
    .transform((a, b) => (!b ? undefined : a))
    .optional(),

  propertyId: yup
    .string()
    .required("Property ID is required")
    .matches(/^[a-fA-F0-9]{24}$/, "Invalid MongoDB ObjectId"),

  tenantId: yup
    .string()
    .required("Tenant ID is required")
    .matches(/^[a-fA-F0-9]{24}$/, "Invalid MongoDB ObjectId"),

  parentBookingId: yup
    .string()
    .transform((a, b) => (!b ? undefined : a))
    .optional(),
});

export const BookingStatusSchema = yup.object().shape({
  note: yup
    .string()
    .transform((a, b) => (!b ? undefined : a))
    .required(),
  newStatus: yup
    .string()
    .required("New status is required")
    .oneOf(Object.values(EBookingStatus), "Invalid booking status"),
});

export const ConfirmBookingPaymentSchema = yup.object().shape({
  method: yup
    .string()
    .required("Method is required.")
    .oneOf(Object.values(EPaymentMethod), "Invalid Method."),

  paymentIds: yup
    .array()
    .of(yup.string().required("Payment ID is required"))
    .required("Payment IDs are required"), // Ensure the array itself is required
});
