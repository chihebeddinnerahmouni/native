/* eslint-disable @typescript-eslint/no-explicit-any */
export enum EScreens {
  MESSAGES = "Messages",
  PROPERTIES = "Properties",
  OWNERS = "Owners",
  TENANTS = "Tenants",
  // SETTINGS = "Settings",
  // Add more main sections as you build them
}

export enum ETabs {
  MAIN = "MainTabs",
  AUTH = "Auth",
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
  OWNERS_LIST = "owners-list",
  OWNERS_DETAILS = "owners-details",
  TENANTS_LIST = "tenants-list",
  TENANTS_DETAILS = "tenants-details",
}

export const NavigateAfterLogin = (navigation: any) => {
  navigation.navigate(ETabs.MAIN, { screen: EScreens.MESSAGES });
};
