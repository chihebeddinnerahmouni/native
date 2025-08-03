import AsyncStorage from "@react-native-async-storage/async-storage";

export enum EToken {
  ACCESS_TOKEN = "accessToken",
}

export const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(EToken.ACCESS_TOKEN);
  } catch (error) {
    return null;
  }
};

export const setToken = async (token: string): Promise<void> => {
  await AsyncStorage.setItem(EToken.ACCESS_TOKEN, token);
};

export const removeToken = async (): Promise<void> => {
  await AsyncStorage.removeItem(EToken.ACCESS_TOKEN);
};
