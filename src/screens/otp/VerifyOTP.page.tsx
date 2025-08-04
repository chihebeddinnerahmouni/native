import React, { useState, useRef } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import {
  PageTitle,
  PageSubtitle,
} from "../../components/ui/texts/Texts.component";
import { Button } from "../../components/ui/buttons/button.component";
import { showErrorAlert } from "../../components/ui/alerts/alerts.component";
import { useAuth } from "../../contexts";
import { VerifyOtpStyles } from "./verifyOtp.style";
import { MainLayout } from "../../layout/main-layout.layout";
import { useAuthMutation } from "../../api-query/hooks";
import { AxiosInstanceErrorResponse } from "../../utils";
import { LeftArrowIcon } from "../../icons";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  VerifyOTP: {
    email: string;
  };
};

type VerifyOTPRouteProp = RouteProp<RootStackParamList, "VerifyOTP">;

export function VerifyOTPScreen() {
  const route = useRoute<VerifyOTPRouteProp>();
  const { email } = route.params || { email: "test@example.com" };
  const navigation = useNavigation();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const { verifyOtp, requestNewOtp } = useAuthMutation();
  const { login } = useAuth();

  const handleOTPChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

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
      const data = await verifyOtp({
        email,
        otp: otpCode,
      });
      login(data);
    } catch (error) {
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    try {
      await requestNewOtp(email);
      showErrorAlert("Success", "OTP sent successfully!");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (error) {
      const axiosError = error as AxiosInstanceErrorResponse;
      const errorMessage =
        axiosError.message || "Failed to resend OTP. Please try again.";
      showErrorAlert("Error", errorMessage);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <MainLayout>
      <View style={VerifyOtpStyles.container}>
        <TouchableOpacity
          style={VerifyOtpStyles.backButton}
          onPress={() => navigation.goBack()}
        >
          <LeftArrowIcon />
        </TouchableOpacity>
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
            loading={resendLoading}
            disabled={resendLoading}
          >
            Resend OTP
          </Button>
        </View>
      </View>
    </MainLayout>
  );
}
