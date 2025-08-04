import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

export const VerifyOtpStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 32,
  },
  backButton: {
    marginBottom: 16,
  },
  subtitle: {
    marginTop: 12,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
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
    marginTop: 24,
  },
  resendButton: {
    marginTop: 8,
  },
});
