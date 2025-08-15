import { StyleSheet } from "react-native";
import colors from "../../../constants/colors";

export const bookingsListStyles = StyleSheet.create({
  tabContainer: {
    marginTop: 16,
    flexDirection: "row",
    padding: 5,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 8,
  },
  tab: {
    flex: 1,
    color: colors.textColor,
    textAlign: "center",
    paddingVertical: 10,
    borderRadius: 8,
    fontWeight: "500",
    fontSize: 14,
  },
  activeTab: {
    color: colors.bgColor,
    backgroundColor: colors.primaryColor,
  },
  bookingsSection: {
    marginTop: 16,
  },
  statusListContainer: {
    gap: 8,
  },
  statusItem: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  activeStatusItem: {
    backgroundColor: colors.primaryColor,
    borderColor: colors.primaryColor,
  },
  statusText: {
    color: colors.textColor,
    fontSize: 14,
  },
  activeStatusText: {
    color: colors.bgColor,
    borderColor: "transparent",
  },
  bookingsContainer: {
    marginTop: 16,
  },
});
