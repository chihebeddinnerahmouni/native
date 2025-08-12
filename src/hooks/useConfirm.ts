import { Alert } from "react-native";

export interface ConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  destructive?: boolean;
}

export const useConfirm = () => {
  const showConfirmation = ({
    title,
    message,
    confirmText = "Delete",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    destructive = true,
  }: ConfirmOptions) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: cancelText,
          style: "cancel",
          onPress: onCancel,
        },
        {
          text: confirmText,
          style: destructive ? "destructive" : "default",
          onPress: onConfirm,
        },
      ],
      { cancelable: true }
    );
  };

  return { showConfirmation };
};
