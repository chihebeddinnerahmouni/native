import {
  ForgetPasswordDto,
  ResetPasswordDto,
  SignInDto,
  VerifyOtpDto,
} from "../../backend/casaikos-api";
import { AxiosInstance } from "../../utils";

export const forgetPasswordHandler = async (values: ForgetPasswordDto) => {
  const { data } = await AxiosInstance.auth.authControllerForgetPassword({
    email: values.email,
  });
  return data;
};

export const resetPasswordHandler = async (
  values: ResetPasswordDto,
  token: string
) => {
  const { data } = await AxiosInstance.auth.authControllerResetPassword(
    { token },
    { password: values.password }
  );
  return data;
};

export const loginHandler = async ({ values }: { values: SignInDto }) => {
  const { data } = await AxiosInstance.auth.authControllerSignIn({
    email: values.email,
    password: values.password,
  });
  return data;
};

export const sendOtpHandler = async (values: VerifyOtpDto) => {
  const { data } = await AxiosInstance.auth.authControllerVerifyOtp({
    email: values.email,
    otp: values.otp,
  });
  return data;
};

export const requestNewOtpHandler = async (email: string) => {
  const { data } = await AxiosInstance.auth.authControllerRequestOtp({
    email,
  });
  return data;
};
