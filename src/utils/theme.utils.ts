import { colors as predefinedColors } from "../constants/colors";

export type TUIType =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info";

export type TUIVariant = "contained" | "outlined" | "text";

export const getButtonStyles = (
  type: TUIType,
  variant: TUIVariant,
  disabled: boolean
) => {
  const colors = {
    primary: predefinedColors.primaryColor,
    secondary: "#E0E4EB",
    success: "#28a745",
    danger: "#dc3545",
    warning: "#ffc107",
    info: "#17a2b8",
  };

  const baseColor = colors[type];

  if (disabled) {
    return {
      backgroundColor: "#e9ecef",
      borderColor: "#e9ecef",
      textColor: "#6c757d",
    };
  }

  switch (variant) {
    case "contained":
      return {
        backgroundColor: baseColor,
        borderColor: baseColor,
        textColor: "#ffffff",
      };
    case "outlined":
      return {
        backgroundColor: "transparent",
        borderColor: baseColor,
        textColor: baseColor,
      };
    case "text":
      return {
        backgroundColor: "transparent",
        borderColor: "transparent",
        textColor: baseColor,
      };
    default:
      return {
        backgroundColor: baseColor,
        borderColor: baseColor,
        textColor: "#ffffff",
      };
  }
};
