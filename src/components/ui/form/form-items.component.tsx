import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { Button } from "../buttons/button.component";
import { useModal } from "../../../contexts";

export const FormContainer = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) => {
  return (
    <KeyboardAvoidingView
      style={[formStyles.keyboardAvoidingView, style]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <ScrollView
        style={formStyles.scrollView}
        contentContainerStyle={formStyles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
      >
        <View style={formStyles.formContainer}>{children}</View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const FormRow = ({
  rightChildren,
  leftChildren,
  style,
}: {
  rightChildren: React.ReactNode;
  leftChildren: React.ReactNode;
  style?: ViewStyle;
}) => {
  return (
    <View style={[formStyles.row, style]}>
      <View style={formStyles.halfWidth}>{leftChildren}</View>
      <View style={formStyles.halfWidth}>{rightChildren}</View>
    </View>
  );
};

export const FormActions = ({
  onPress,
  isLoading,
  style,
  cancelText = "Cancel",
  submitText = "Submit",
  onCancelPress,
}: {
  onPress: () => void;
  style?: ViewStyle;
  isLoading: boolean;
  cancelText?: string;
  submitText?: string;
  onCancelPress?: () => void;
}) => {
  const { closeModal } = useModal();

  const onCancel = () => {
    if (onCancelPress) {
      onCancelPress();
    } else {
      closeModal();
    }
  };
  return (
    <View style={[formStyles.formActions, style]}>
      <Button
        variant="outlined"
        onPress={onCancel}
        style={formStyles.cancelButton}
      >
        {cancelText}
      </Button>
      <Button
        onPress={onPress}
        disabled={isLoading}
        loading={isLoading}
        style={formStyles.submitButton}
      >
        {submitText}
      </Button>
    </View>
  );
};

const formStyles = StyleSheet.create({
  formContainer: {
    flexDirection: "column",
    gap: 32,
    padding: 12,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  formActions: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    paddingTop: 24,
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    backgroundColor: "white",
  },
  cancelButton: {
    flex: 1,
  },
  submitButton: {
    flex: 1,
  },
});
