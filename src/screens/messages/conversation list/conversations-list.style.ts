import { StyleSheet } from "react-native";
import colors from "../../../constants/colors";

export const ConversationListStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: { marginBottom: 12 },
  messagesList: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  noItems: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noItemsText: {
    fontSize: 16,
    color: colors.textColor2,
  },
});
