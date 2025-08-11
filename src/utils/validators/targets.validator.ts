import * as yup from "yup";

export const TargetSchema = yup.object().shape({
  typeDuration: yup.string().required("Type of duration is required"),
  fromMonthNumber: yup.number().required("From month is required"),
  fromYearNumber: yup.number().required("From year is required"),
  toMonthNumber: yup.number().optional(),
  toYearNumber: yup.number().optional(),
  propertyId: yup.string().required("Property ID is required"),
  value: yup.number().required("Value is required"),
  weeklyDiscount: yup.number().optional(),
  monthlyDiscount: yup.number().optional(),
});
