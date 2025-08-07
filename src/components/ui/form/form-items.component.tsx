import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

export const FormContainer = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) => {
  return (
    <View style={[formStyles.formContainer, style]}>
      <KeyboardAvoidingView
        style={formStyles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={formStyles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
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
      <View style={formStyles.halfWidth}>{rightChildren}</View>
      <View style={formStyles.halfWidth}>{leftChildren}</View>
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
});
