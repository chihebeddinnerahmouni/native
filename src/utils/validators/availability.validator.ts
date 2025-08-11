import * as yup from "yup";

const AvailabilitySchema = yup.object().shape({
  typeDuration: yup.string().required("Type of duration is required"),
  from: yup.string().required("From date is required"),
  to: yup.string().optional(),
  rate: yup.number().required("Rate is required"),
  propertyId: yup.string().required("Property ID is required"),
});

export { AvailabilitySchema };
