import { UseMutateAsyncFunction, useMutation } from "@tanstack/react-query";
import {
  forgetPasswordHandler,
  loginHandler,
  requestNewOtpHandler,
  resetPasswordHandler,
  sendOtpHandler,
} from "../../api/auth.api";
import {
  ForgetPasswordDto,
  RefreshTokenResponse,
  ResetPasswordDto,
  SignInDto,
  SignInResponse,
  VerifyOtpDto,
} from "../../../backend/casaikos-api";
import { errorHandler } from "../../../utils/errors.utils";
import { showSuccessAlert } from "../../../components/ui/alerts/alerts.component";

type IResponse = {
  forgetPassword: UseMutateAsyncFunction<
    void,
    unknown,
    ForgetPasswordDto,
    unknown
  >;
  resetPassword: UseMutateAsyncFunction<
    void,
    unknown,
    { values: ResetPasswordDto; token: string },
    unknown
  >;
  login: UseMutateAsyncFunction<
    SignInResponse,
    unknown,
    { values: SignInDto },
    unknown
  >;
  verifyOtp: UseMutateAsyncFunction<
    RefreshTokenResponse,
    unknown,
    VerifyOtpDto,
    unknown
  >;
  requestNewOtp: UseMutateAsyncFunction<void, unknown, string, unknown>;
  isSuccess: boolean;
  error: Error | null;
  isLoading: boolean;
};

export const useAuthMutation = (): IResponse => {
  const forgetPasswordMutation = useMutation({
    mutationFn: forgetPasswordHandler,
    onSuccess: () => {
      showSuccessAlert(
        "Password Reset",
        "A password reset link has been sent to your email."
      );
    },
    onError: errorHandler,
  });

  const resetPasswordMutation = useMutation({
    mutationFn: ({
      values,
      token,
    }: {
      values: ResetPasswordDto;
      token: string;
    }) => resetPasswordHandler(values, token),
    onSuccess: () => {
      showSuccessAlert(
        "Your password has been successfully reset.",
        "You can now log in with your new password."
      );
    },
  });

  const loginMutation = useMutation({
    mutationFn: loginHandler,
  });

  const verifyOtpMutation = useMutation({
    mutationFn: sendOtpHandler,
    onError: errorHandler,
  });

  const requestNewOtpMutation = useMutation({
    mutationFn: requestNewOtpHandler,
    onSuccess: () => {
      showSuccessAlert("OTP Sent", "A new OTP has been sent to your email.");
    },
    onError: errorHandler,
  });

  return {
    forgetPassword: forgetPasswordMutation.mutateAsync,
    resetPassword: resetPasswordMutation.mutateAsync,
    verifyOtp: verifyOtpMutation.mutateAsync,
    login: loginMutation.mutateAsync,
    requestNewOtp: requestNewOtpMutation.mutateAsync,
    isSuccess:
      forgetPasswordMutation.isSuccess || resetPasswordMutation.isSuccess,
    error: (forgetPasswordMutation.error ||
      resetPasswordMutation.error ||
      loginMutation.error) as Error | null,
    isLoading:
      forgetPasswordMutation.isPending ||
      resetPasswordMutation.isPending ||
      loginMutation.isPending ||
      verifyOtpMutation.isPending,
  };
};
