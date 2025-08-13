import { TUIType } from "./theme.utils";

export const getTyp = (type: string | undefined) => {
  switch (type) {
    case "DEWA_BILL":
      return {
        icon: "/assets/img/compliances/dewa-bill.png",
        label: "DEWA Bill",
      };
    case "EJARI":
      return {
        icon: "/assets/img/compliances/ejari.png",
        label: "Ejari Certificate",
      };
    case "WIFI_SUBSCRIPTION":
      return {
        icon: "/assets/img/compliances/wifi.png",
        label: "WiFi Subscription",
      };
    case "AC_MAINTENANCE":
      return {
        icon: "/assets/img/compliances/ac.png",
        label: "AC Maintenance",
      };
    case "FIRE_SAFETY":
      return {
        icon: "/assets/img/compliances/fire.png",
        label: "Fire Safety Inspection ",
      };
    case "PEST_CONTROL":
      return {
        icon: "/assets/img/compliances/pest.png",
        label: "Pest Control",
      };
    case "TOURISM_PERMIT":
      return {
        icon: "/assets/img/compliances/tourism.png",
        label: "Tourism Permit (DTCM)",
      };
    case "INSURANCE":
      return {
        icon: "/assets/img/compliances/shield.png",
        label: "Insurance",
      };
    default:
      return {
        icon: "/assets/img/compliances/dewa-bill.png",
        label: "-",
      };
  }
};

export const getComplianceStatus = (
  status: string | undefined | null
): {
  label: string;
  className: string;
  emoji: string;
  badgeType: TUIType;
} => {
  switch (status) {
    case "passed":
      return {
        label: "Passed",
        emoji: "✅",
        className: "passed",
        badgeType: "success",
      };
    case "warning":
      return {
        label: "Warning",
        emoji: "⚠️",
        className: "warning",
        badgeType: "warning",
      };
    case "expired":
      return {
        label: "Expired",
        emoji: "❌",
        className: "expired",
        badgeType: "danger",
      };
    case "issues_found":
      return {
        label: "Issues Found",
        emoji: "❗",
        className: "issues-found",
        badgeType: "info",
      };
    case "not_assigned":
      return {
        label: "Not Assigned",
        className: "not-assigned",
        emoji: "🚫",
        badgeType: "secondary",
      };
    default:
      return {
        label: "Not Initialized",
        className: "not-initialized",
        emoji: "⏳",
        badgeType: "secondary",
      };
  }
};
