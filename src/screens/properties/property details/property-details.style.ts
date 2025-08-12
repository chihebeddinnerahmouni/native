import { StyleSheet } from "react-native";

export const propertyDetailsStyle = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 16,
  },
  imageContainer: {
    width: "100%",
    height: 207,
    overflow: "hidden",
    objectFit: "cover",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  section: {
    flexDirection: "column",
    gap: 12,
  },
  borderBottom: {
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
