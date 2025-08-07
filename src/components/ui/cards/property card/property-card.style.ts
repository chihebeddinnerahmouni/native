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
  propertyLocation: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
  },
  locationText: {
    fontSize: 14,
    color: colors.textColor2,
    marginLeft: 4,
    flex: 1,
  },
  propertyInfosContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 24,
  },
  propertyInfoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    fontSize: 14,
    color: colors.textColor2,
    marginLeft: 4,
  },
});
