import * as yup from "yup";
import { addressSchema, bankSchema, passportSchema } from "./shared.validator";
import {
  EMAIL_ERROR_FORMAT,
  PHONE_ERROR_REGEX,
  PHONE_ERROR_REQUIRED,
  PHONE_REGEX,
} from "./shared-messages";
import { CreateOwnerDto } from "../../backend/casaikos-api";

export const ownerSchema: yup.ObjectSchema<CreateOwnerDto> = yup.object({
  agentId: yup.string().optional(),
  title: yup.string().optional(),
  firstName: yup.string().optional(),
  lastName: yup.string().optional(),
  email: yup.string().email(EMAIL_ERROR_FORMAT).optional(),
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
