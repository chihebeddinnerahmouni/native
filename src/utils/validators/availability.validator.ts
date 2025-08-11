import * as yup from "yup";
import dayjs from "dayjs";
import { EDurationType } from "../../components/forms/property/availability.form";

const AvailabilitySchema = yup.object().shape({
  typeDuration: yup
    .string()
    .required("Type of duration is required")
    .oneOf(
      Object.values(EDurationType),
      'Type of duration must be either "single" or "multiple"'
    ),
  from: yup
    .string()
    .required("From date is required")
    .test(
      "from-to-valid",
      "From date must be before To date",
      function (value) {
        const toValue = this.parent.to;
        if (toValue && dayjs(value).isAfter(dayjs(toValue))) {
          return false;
        }
        return true;
      }
    ),
  to: yup
    .string()
    .optional()
    .when("typeDuration", (typeDurationValue, schema) => {
      return typeDurationValue.includes("multiple")
        ? schema.required("To date is required")
        : schema;
    })
    .when("from", (fromValue, schema) => {
      return fromValue
        ? schema.test(
            "to-from-valid",
            "To date must be after From date",
            function (value) {
              const fromValue = this.parent.from;
              if (value && dayjs(value).isBefore(dayjs(fromValue))) {
                return false;
              }
              return true;
            }
          )
        : schema;
    }),
  rate: yup.number().required("Rate is required"),
  propertyId: yup.string().required("Property ID is required"),
});

export { AvailabilitySchema };
