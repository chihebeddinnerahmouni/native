import { StyleSheet } from "react-native";
import colors from "../../../../constants/colors";

export const propertyCardStyles = StyleSheet.create({
  propertyCard: {
    backgroundColor: colors.bgColor,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderColor,
    padding: 8,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  statusBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 1,
  },
  optionsButton: {
    position: "absolute",
    top: 12,
    left: 12,
    zIndex: 1,
    backgroundColor: colors.bgColor,
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  propertyImage: {
    width: "100%",
    height: 170,
    borderRadius: 8,
    marginBottom: 8,
  },
  propertyContent: {
    gap: 8,
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.textColor,
  },
});
