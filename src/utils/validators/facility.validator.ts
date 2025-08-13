import * as yup from "yup";

export const facilitySchema = yup.object().shape({
  text: yup
    .string()
    .trim()
    .required("Facility text is required")
    .min(2, "Facility text must be at least 2 characters")
    .max(50, "Facility text must be less than 50 characters"),
});
