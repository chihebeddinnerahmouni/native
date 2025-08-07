import * as yup from "yup";
import { addressSchema, isValidAirbnbProfileUrl } from "./shared.validator";
import { EPropertyType, ETenantType } from "../../backend/casaikos-api";
const propertySchema = yup.object().shape({
  agentId: yup.string().required("Agent is required."),
  ownerId: yup.string().optional(),
  title: yup.string().required("Title is required."),
  description: yup.string().optional(),
  buildingName: yup.string().required("Building Name is required."),
  propertyType: yup
    .string()
    .required("Property type is required.")
    .oneOf(Object.values(EPropertyType), "Invalid Type."),
  bedrooms: yup
    .number()
    .transform((a, b) => (!b ? undefined : a))
    .min(1, "Must be at least 1")
    .required("Bedrooms is required."),
  propertySize: yup
    .number()
    .transform((a, b) => (!b ? undefined : a))
    .min(0, "Cannot be negative")
    .optional(),
  bathrooms: yup
    .number()
    .transform((a, b) => (!b ? undefined : a))
    .min(1, "Must be at least 1")
    .optional(),
  parkingSpaces: yup
    .number()
    .transform((a, b) => (!b ? undefined : a))
    .min(1, "Must be at least 1")
    .optional(),
  maxTenants: yup
    .number()
    .transform((a, b) => (!b ? undefined : a))
    .min(1, "Must be at least 1")
    .optional(),
  yearBuilt: yup
    .number()
    .transform((a, b) => (!b ? undefined : a))
    .max(new Date().getFullYear(), "Year cannot be in the future")
    .optional(),
  heatingType: yup.string().optional(),
  balconySize: yup
    .number()
    .transform((a, b) => (!b ? undefined : a))
    .min(0, "Cannot be negative")
    .optional(),
  tenantType: yup
    .string()
    .optional()
    .oneOf(Object.values(ETenantType), "Invalid Type."),
  address: addressSchema.optional(),

  isActive: yup
    .boolean()
    .transform((a, b) => (!b ? undefined : a))
    .required("Property status is required."),

  isYearly: yup
    .boolean()
    .transform((value) => {
      return value === undefined ? undefined : Boolean(value);
    })
    .required("Rent type is required."),

  priceYearly: yup
    .mixed()
    .transform((value, originalValue) => {
      if (originalValue === "" || originalValue === null) return undefined;
      return isNaN(Number(originalValue))
        ? originalValue
        : Number(originalValue);
    })
    .when("isYearly", {
      is: true,
      then: (schema) =>
        schema
          .typeError("Yearly price must be a number")
          .required("Yearly price is required"),
      otherwise: (schema) => schema.notRequired().transform(() => undefined),
    }) as yup.Schema<number | undefined>,

  airbnbId: yup
    .string()
    .optional()
    .test(
      "airbnb-url-or-id",
      'Must be either: A valid Airbnb profile URL containing "rooms/", or Direct profile ID (8+ digits)',
      (value) => isValidAirbnbProfileUrl(value || "", "rooms")
    ),
  bayutLink: yup.string().optional(),
  dubizzleLink: yup.string().optional(),
  propertyfinderLink: yup.string().optional(),

  isFurnished: yup
    .boolean()
    .transform((a, b) => (!b ? undefined : a))
    .when("isYearly", {
      is: true,
      then: (schema) => schema.required("furnished price is required."),
      otherwise: (schema) => schema.optional(),
    }),
  deposit: yup
    .number()
    .transform((a, b) => (!b ? undefined : a))
    .min(0, "Cannot be negative")
    .optional(),
});

export { propertySchema };
