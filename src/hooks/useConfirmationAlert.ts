import { Alert } from "react-native";

interface ConfirmationAlertConfig {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export const useConfirmationAlert = () => {
  const showConfirmationAlert = ({
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
  }: ConfirmationAlertConfig) => {
    Alert.alert(title, message, [
      {
        text: cancelText,
        style: "cancel",
        onPress: onCancel,
      },
      {
        text: confirmText,
        style: "destructive",
        onPress: onConfirm,
      },
    ]);
  };

  return {
    showConfirmationAlert,
  };
};
