/* eslint-disable @typescript-eslint/no-explicit-any */
export enum EScreens {
  MESSAGES = "Messages",
  AUTH = "Auth",
}

export enum ERoute {
  LOGIN = "login",
  VERIFY_OTP = "verify-otp",
  FORGOT_PASSWORD = "forgot-password",
  RESET_PASSWORD = "reset-password",
  CONVERSATIONS_LIST = "conversations-list",
  MESSAGES_PAGE = "messages-page",
}

export const NavigateAfterLogin = (navigation: any) => {
  navigation.navigate(EScreens.MESSAGES);
};
