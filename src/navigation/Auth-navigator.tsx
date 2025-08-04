import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ERoute } from "../utils";
import { LoginScreen } from "../screens/auth/login/LogIn.page";
import { VerifyOTPScreen } from "../screens/auth/otp/VerifyOTP.page";

const AuthStack = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={ERoute.LOGIN}
    >
      <AuthStack.Screen name={ERoute.LOGIN} component={LoginScreen} />
      <AuthStack.Screen name={ERoute.VERIFY_OTP} component={VerifyOTPScreen} />
    </AuthStack.Navigator>
  );
};
