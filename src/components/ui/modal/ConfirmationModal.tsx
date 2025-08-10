import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import colors from "../../../constants/colors";

interface ConfirmationModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
  loadingText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loadingText = "Processing...",
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await onConfirm();
      onCancel(); // Close modal after successful confirmation
    } catch (error) {
      console.error("Error in confirmation action:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (!isLoading) {
      onCancel();
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                styles.cancelButton,
                isLoading && styles.disabledButton,
              ]}
              onPress={handleCancel}
              disabled={isLoading}
            >
              <Text
                style={[
                  styles.buttonText,
                  styles.cancelButtonText,
                  isLoading && styles.disabledText,
                ]}
              >
                {cancelText}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.confirmButton,
                isLoading && styles.loadingButton,
              ]}
              onPress={handleConfirm}
              disabled={isLoading}
            >
              <View style={styles.confirmContent}>
                {isLoading && (
                  <ActivityIndicator
                    size="small"
                    color="white"
                    style={styles.spinner}
                  />
                )}
                <Text style={[styles.buttonText, styles.confirmButtonText]}>
                  {isLoading ? loadingText : confirmText}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 24,
    minWidth: 300,
    maxWidth: "90%",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textColor || "#000",
    marginBottom: 12,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: colors.textColor || "#666",
    marginBottom: 24,
    textAlign: "center",
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
  },
  cancelButton: {
    backgroundColor: colors.emptyBgColor || "#f0f0f0",
    borderWidth: 1,
    borderColor: colors.borderColor || "#ddd",
  },
  confirmButton: {
    backgroundColor: "#ff3b30",
  },
  loadingButton: {
    backgroundColor: "#ff6b60",
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButtonText: {
    color: colors.textColor || "#000",
  },
  confirmButtonText: {
    color: "white",
  },
  disabledText: {
    opacity: 0.7,
  },
  confirmContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    marginRight: 8,
  },
});

export default ConfirmationModal;
