import { StyleSheet } from "react-native";
import colors from "../../../constants/colors";

export const ConversationItemStyle = StyleSheet.create({
  messageItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginVertical: 4,
  },
  activeMessageItem: {
    backgroundColor: colors.primaryLight,
    borderRightWidth: 3,
    borderRightColor: colors.primaryColor,
  },
  notActiveMessageItem: {
    backgroundColor: colors.bgColor,
    borderRightWidth: 3,
    borderRightColor: "transparent",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 12,
  },
  profileContent: {
    flex: 1,
    marginLeft: 8,
  },
  tenantName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textColor,
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textColor2,
  },
  statusSection: {
    alignItems: "flex-end",
    justifyContent: "center",
    minWidth: 60,
  },
  timestamp: {
    fontSize: 12,
    color: colors.textColor2,
    marginBottom: 4,
  },
  unreadContainer: {
    minHeight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  unreadBadge: {
    backgroundColor: colors.primaryLight,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: "center",
  },
  unreadText: {
    fontSize: 11,
    fontWeight: "500",
    color: colors.primaryColor,
  },
  noUnreadText: {
    fontSize: 12,
    color: colors.textColor2,
  },
});
