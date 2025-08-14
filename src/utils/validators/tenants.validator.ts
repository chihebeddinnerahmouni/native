import * as yup from "yup";
import { regex } from "../regex.utils";
import { addressSchema, bankSchema, passportSchema } from "./shared.validator";
import {
  EMAIL_ERROR_FORMAT,
  PHONE_ERROR_REGEX,
  PHONE_ERROR_REQUIRED,
  PHONE_REGEX,
} from "./shared-messages";
import { CreateTenantDto } from "../../backend/casaikos-api";

export const tenantSchema: yup.ObjectSchema<CreateTenantDto> = yup.object({
  agentId: yup.string().optional(),
  title: yup.string().optional(),
  firstName: yup.string().optional(),
  lastName: yup.string().optional(),
  email: yup.string().optional().email(EMAIL_ERROR_FORMAT),
  phoneNumber: yup
    .string()
    .matches(PHONE_REGEX, PHONE_ERROR_REGEX)
    .required(PHONE_ERROR_REQUIRED),
  birthDate: yup.string().optional(),
  nationality: yup.string().optional(),
  userId: yup.string().optional(),
  address: addressSchema.optional(),
  passport: passportSchema.optional(),
  bank: bankSchema.optional(),
});

export const trustSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .matches(regex.name, "Name is not valid"),

  description: yup
    .string()
    .transform((value, originalValue) => (!originalValue ? undefined : value))
    .matches(regex.name, "Description name is not valid"),
});
