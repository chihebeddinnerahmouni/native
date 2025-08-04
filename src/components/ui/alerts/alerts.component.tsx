import Toast from "react-native-toast-message";

export const showErrorAlert = (title: string, message: string) => {
  Toast.show({
    type: "error",
    text1: title,
    text2: message,
  });
};
