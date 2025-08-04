import React, { useState, useRef } from "react";
import { View, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, RouteProp } from "@react-navigation/native";
import {
  PageTitle,
  PageSubtitle,
} from "../../components/ui/texts/Texts.component";
import { Button } from "../../components/ui/buttons/button.component";
import { showErrorAlert } from "../../components/ui/alerts/alerts.component";
import { useAuth } from "../../contexts";
import { VerifyOtpStyles } from "./verifyOtp.style";

type RootStackParamList = {
  VerifyOTP: {
    email: string;
  };
};

type VerifyOTPRouteProp = RouteProp<RootStackParamList, "VerifyOTP">;

export function VerifyOTPScreen() {
  const route = useRoute<VerifyOTPRouteProp>();
  const { email } = route.params;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // const { verifyOTP: verifyOTPMut } = useAuthMutation();
  const { login } = useAuth();

  const handleOTPChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      showErrorAlert("Error", "Please enter all 6 digits");
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement actual OTP verification API call
      // const data = await verifyOTPMut({
      //   email,
      //   otp: otpCode,
      // });

      // For now, just simulate success
      const mockData = { accessToken: "mock-token", user: { name: "User" } };
      login(mockData);
      // Navigation will be handled by auth context
    } catch (error) {
      showErrorAlert("Error", "Invalid OTP. Please try again.");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      // Implement resend OTP logic here
      showErrorAlert("Success", "OTP sent successfully!");
    } catch (error) {
      showErrorAlert("Error", "Failed to resend OTP. Please try again.");
    }
  };

  return (
    <SafeAreaView style={VerifyOtpStyles.safeArea}>
      <View style={VerifyOtpStyles.container}>
        <PageTitle>Verify Your Email</PageTitle>
        <PageSubtitle style={VerifyOtpStyles.subtitle}>
          We&apos;ve sent a 6-digit code to {email}. Enter it below to continue.
        </PageSubtitle>

        <View style={VerifyOtpStyles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              style={[
                VerifyOtpStyles.otpInput,
                digit ? VerifyOtpStyles.otpInputFilled : null,
              ]}
              value={digit}
              onChangeText={(value) => handleOTPChange(value, index)}
              onKeyPress={({ nativeEvent }) =>
                handleKeyPress(nativeEvent.key, index)
              }
              keyboardType="numeric"
              maxLength={1}
              selectTextOnFocus
              autoFocus={index === 0}
            />
          ))}
        </View>

        <View style={VerifyOtpStyles.buttonContainer}>
          <Button
            onPress={handleVerifyOTP}
            loading={loading}
            disabled={loading}
          >
            Verify OTP
          </Button>

          <Button
            variant="text"
            onPress={handleResendOTP}
            style={VerifyOtpStyles.resendButton}
          >
            Resend OTP
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
