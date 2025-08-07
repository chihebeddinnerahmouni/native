import * as yup from "yup";
import { URL } from "react-native-url-polyfill";

export const addressSchema = yup.object().shape({
  street: yup
    .string()
    .transform((a, b) => (!b ? undefined : a))
    .optional(),
  district: yup
    .string()
    .transform((a, b) => (!b ? undefined : a))
    .optional(),
  city: yup
    .string()
    .transform((a, b) => (!b ? undefined : a))
    .optional(),
  country: yup
    .string()
    .transform((a, b) => (!b ? undefined : a))
    .optional(),
  zip: yup
    .string()
    .transform((a, b) => (!b ? undefined : a))
    .optional(),
});

export const passportSchema = yup.object().shape({
  passportNumber: yup
    .string()
    .transform((a, b) => (!b ? undefined : a))
    .optional(),
  issueDate: yup
    .string()
    .transform((a, b) => (!b ? undefined : a))
    .optional(),
  expiryDate: yup
    .string()
    .transform((a, b) => (!b ? undefined : a))
    .optional(),
  nationality: yup
    .string()
    .transform((a, b) => (!b ? undefined : a))
    .optional(),
  dateOfBirth: yup
    .string()
    .transform((a, b) => (!b ? undefined : a))
    .optional(),
  placeOfBirth: yup
    .string()
    .transform((a, b) => (!b ? undefined : a))
    .optional(),
});

export const bankSchema = yup.object().shape({
  bankName: yup
    .string()
    .transform((a, b) => (!b ? undefined : a))
    .required("Bank name is required"),

  accountName: yup
    .string()
    .transform((a, b) => (!b ? undefined : a))
    .required("Account name is required"),

  accountNumber: yup
    .string()
    .transform((a, b) => (!b ? undefined : a))
    .required("Account number is required"),

  iban: yup
    .string()
    .transform((a, b) => (!b ? undefined : a))
    .required("IBAN is required"),

  swiftCode: yup
    .string()
    .transform((a, b) => (!b ? undefined : a))
    .required("SWIFT code is required"),

  branchCode: yup
    .string()
    .transform((a, b) => (!b ? undefined : a))
    .optional(),
});

export const isValidAirbnbProfileUrl = (
  value: string,
  segment: string
): boolean => {
  const input = value.trim();

  if (!input) return true;

  if (/^\d{8,}$/.test(input)) return true;

  try {
    const parsed = new URL(input);
    const escapedSegment = segment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return (
      parsed.hostname.includes("airbnb.com") &&
      new RegExp(`\\/${escapedSegment}\\/\\d{8,}`).test(input.split(/[?#]/)[0])
    );
  } catch {
    return false;
  }
};
