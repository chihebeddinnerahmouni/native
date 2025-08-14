import { StyleSheet } from "react-native";
import colors from "../../../constants/colors";

export const ownerDetailsStyle = StyleSheet.create({
  container: {
    gap: 8,
  },
  section: {
    flexDirection: "column",
    gap: 8,
  },
  nameMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "500",
  },
  tabsContainer: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: colors.borderColor,
  },
  borderBottom: {
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
