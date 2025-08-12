import { Alert } from "react-native";
import { useState } from "react";

interface ConfirmationAlertConfig {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
  useCustomModal?: boolean;
  loadingText?: string;
}

interface ModalState {
  visible: boolean;
  config: ConfirmationAlertConfig | null;
}

export const useConfirmationAlert = () => {
  const [modalState, setModalState] = useState<ModalState>({
    visible: false,
    config: null,
  });

  const showConfirmationAlert = (config: ConfirmationAlertConfig) => {
    if (config.useCustomModal) {
      setModalState({
        visible: true,
        config,
      });
    } else {
      Alert.alert(config.title, config.message, [
        {
          text: config.cancelText || "Cancel",
          style: "cancel",
          onPress: config.onCancel,
        },
        {
          text: config.confirmText || "Remove",
          style: "destructive",
          onPress: async () => {
            try {
              await config.onConfirm();
            } catch (error) {
              console.error("Error in confirmation action:", error);
            }
          },
        },
      ]);
    }
  };

  const hideModal = () => {
    setModalState({
      visible: false,
      config: null,
    });
  };

  return {
    showConfirmationAlert,
    modalState,
    hideModal,
  };
};
