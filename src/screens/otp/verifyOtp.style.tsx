import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

export const VerifyOtpStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  container: {
    flex: 1,
    padding: 24,
    // justifyContent: "center",
  },
  subtitle: {
    // marginBottom: 40,
    textAlign: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  otpInput: {
    width: 45,
    height: 55,
    borderWidth: 2,
    borderColor: colors.borderColor,
    borderRadius: 8,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: colors.textColor,
    backgroundColor: colors.bgColor,
  },
  otpInputFilled: {
    borderColor: colors.primaryColor,
    backgroundColor: colors.bgColor,
  },
  buttonContainer: {
    gap: 16,
  },
  resendButton: {
    marginTop: 8,
  },
});
