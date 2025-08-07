import { StyleSheet } from "react-native";
import colors from "../../../constants/colors";

export const MessagesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  profileNameContainer: {
    marginLeft: 5,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.textColor,
  },
  profileStatus: {
    fontSize: 12,
    fontWeight: "600",
  },
  connected: {
    color: "#34c759",
  },
  leadContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: colors.emptyBgColor2,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  leadDetails: {
    flex: 1,
  },
  leadInfos: {
    flex: 1,
  },
  leadName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textColor,
    marginBottom: 4,
  },
  leadDescription: {
    fontSize: 12,
    color: colors.textColor2,
  },
  leadButton: {
    marginLeft: 12,
  },
  buttonText: {
    marginLeft: 8,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noMessages: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noMessagesText: {
    fontSize: 16,
    color: colors.textColor2,
  },
  inputArea: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.bgColor,
    borderTopWidth: 1,
    borderTopColor: colors.borderColor,
    gap: 8, // Add gap between elements
  },
  attachButton: {
    padding: 8,
  },
  sendButton: {
    padding: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  noConversation: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  noConversationTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  noConversationSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
