import { regex } from "../regex.utils";

export const PHONE_REGEX = regex.phoneNumber;
export const PHONE_ERROR_REGEX =
  "Phone number must start with + followed by 9 to 15 digits";
export const PHONE_ERROR_REQUIRED = "Phone number is required.";

export const EMAIL_ERROR_FORMAT = "Invalid email format.";
export const EMAIL_ERROR_REQUIRED = "Email is required.";

export const PASSWORD_ERROR_REQUIRED = "Password is required.";
export const PASSWORD_ERROR_MIN_LENGTH =
  "Password must be at least 8 characters.";
export const PASSWORD_ERROR_MAX_LENGTH =
  "Password must be at most 20 characters.";

export const ADDRESS_ERROR_REQUIRED = "Address is required.";
