import * as yup from "yup";

export const facilitySchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Facility name is required")
    .min(2, "Facility name must be at least 2 characters")
    .max(50, "Facility name must be less than 50 characters"),
});
