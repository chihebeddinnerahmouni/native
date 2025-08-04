import * as yup from "yup";
import {
  EMAIL_ERROR_FORMAT,
  EMAIL_ERROR_REQUIRED,
  PASSWORD_ERROR_MAX_LENGTH,
  PASSWORD_ERROR_MIN_LENGTH,
  PASSWORD_ERROR_REQUIRED,
} from "./shared-messages";

export const AuthSchema = yup.object().shape({
  email: yup.string().email(EMAIL_ERROR_FORMAT).required(EMAIL_ERROR_REQUIRED),
  password: yup
    .string()
    .required(PASSWORD_ERROR_REQUIRED)
    .min(8, PASSWORD_ERROR_MIN_LENGTH)
    .max(20, PASSWORD_ERROR_MAX_LENGTH),
});

export const ForgetPasswordSchema = yup.object().shape({
  email: yup.string().email(EMAIL_ERROR_FORMAT).required(EMAIL_ERROR_REQUIRED),
});

export const ResetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required(PASSWORD_ERROR_REQUIRED)
    .min(8, PASSWORD_ERROR_MIN_LENGTH)
    .max(20, PASSWORD_ERROR_MAX_LENGTH),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});
