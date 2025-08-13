import * as yup from "yup";
import { EComplianceStatus, EComplianceType } from "../../backend/casaikos-api";
export const complianceStatus = Object.keys(EComplianceStatus);

export const complianceTypes = Object.keys(EComplianceType);

export const complianceSchema = yup.object().shape({
  type: yup
    .string()
    .oneOf(complianceTypes, "Invalid compliance type")
    .required("Compliance type is required"),

  // status: yup
  //   .string()
  //   .oneOf(complianceStatus, 'Invalid compliance type')
  //   .required('Compliance type is required'),

  startDate: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use YYYY-MM-DD")
    .required("Start date is required"),

  warningDaysBeforeExpiry: yup
    .number()
    .typeError("Warning days before expiry must be a positive number")
    .positive("Warning days must be a positive number")
    .integer("Warning days must be an integer")
    .required("Warning days before expiry is required"),

  endDate: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use YYYY-MM-DD")
    .required("End date is required")
    .test(
      "is-after-start-date",
      "End date must be after start date",
      function (endDate) {
        const { startDate } = this.parent;
        if (!startDate || !endDate) return true;
        return new Date(endDate) > new Date(startDate);
      }
    ),

  airbnbProfile: yup.string().optional(),
});
