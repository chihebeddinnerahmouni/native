import { StyleSheet } from "react-native";
import colors from "../../../constants/colors";

export const messageItemStyles = StyleSheet.create({
  messageItemContainer: {
    marginBottom: 16,
    flexDirection: "row",
  },
  messageItem: {
    flexDirection: "row",
  },
  messageContentContainer: {
    flexDirection: "row",
  },
  messageContentContainerReply: { flexDirection: "row-reverse" },
  messageContentContainerSent: { flexDirection: "row" },
  sentMessage: {
    justifyContent: "flex-end",
  },
  replyMessage: {
    justifyContent: "flex-start",
  },
  messageContent: {
    marginHorizontal: 8,
    maxWidth: "70%",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  messageContentText: {
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flex: 1,
  },
  messageContentIsReply: {
    backgroundColor: colors.bgColor,
  },
  messageContentIsSent: {
    backgroundColor: colors.primaryColor,
  },
  messageTextSent: {
    fontSize: 14,
    color: colors.bgColor,
  },
  messageTextReply: {
    fontSize: 14,
    color: colors.textColor,
  },
  messageTime: {
    fontSize: 10,
    color: colors.textColor2,
    marginTop: 4,
  },
  messageTimeReply: {
    alignSelf: "flex-start",
  },
  messageTimeSent: {
    alignSelf: "flex-end",
  },
  aiIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
  },
  aiText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  fileMessage: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e3f2fd",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 8,
    maxWidth: "70%",
  },
  fileName: {
    marginLeft: 8,
    fontSize: 14,
    color: "#007bff",
  },
  leadItem: {
    alignItems: "center",
    paddingVertical: 8,
    marginVertical: 4,
  },
  leadItemText: {
    fontSize: 12,
    color: colors.textColor2,
    fontStyle: "italic",
  },
});
