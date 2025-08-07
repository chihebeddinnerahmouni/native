/* eslint-disable @typescript-eslint/no-explicit-any */
export enum EScreens {
  // Authentication
  AUTH = "Auth",

  // Main App Sections
  MESSAGES = "Messages",
  // PROPERTIES = "Properties",
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
}

export const NavigateAfterLogin = (navigation: any) => {
  navigation.navigate(EScreens.MESSAGES);
};
