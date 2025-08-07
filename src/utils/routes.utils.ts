/* eslint-disable @typescript-eslint/no-explicit-any */
export enum EScreens {
  AUTH = "Auth",
  MESSAGES = "Messages",
  PROPERTIES = "Properties",
  // OWNERS = "Owners",
  // SETTINGS = "Settings",
  // Add more main sections as you build them
}

export enum ERoute {
  LOGIN = "login",
  VERIFY_OTP = "verify-otp",
  FORGOT_PASSWORD = "forgot-password",
  RESET_PASSWORD = "reset-password",
  CONVERSATIONS_LIST = "conversations-list",
  MESSAGES_PAGE = "messages-page",
  MESSAGES_DETAILS = "messages-details",
  PROPERTIES_LIST = "properties-list",
  PROPERTIES_DETAILS = "properties-details",
}

export const NavigateAfterLogin = (navigation: any) => {
  navigation.navigate(EScreens.MESSAGES);
};
