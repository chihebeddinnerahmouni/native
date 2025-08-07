import React from "react";
import { View, Text, TextInput, StyleSheet, ViewStyle } from "react-native";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import colors from "../../../../constants/colors";

type TextareaProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  required?: boolean;
  register?: UseFormRegisterReturn;
  numberOfLines?: number;
  disabled?: boolean;
  error?: FieldError;
  maxLength?: number;
  style?: ViewStyle;
};

export const Textarea = ({
  label,
  placeholder = "",
  required,
  onChangeText,
  value,
  register,
  disabled,
  numberOfLines = 4,
  error,
  maxLength,
  style,
  ...props
}: TextareaProps) => {
  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      <TextInput
        {...props}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        editable={!disabled}
        multiline={true}
        numberOfLines={numberOfLines}
        textAlignVertical="top"
        maxLength={maxLength}
        style={[
          styles.textInput,
          error && styles.textInputError,
          disabled && styles.textInputDisabled,
        ]}
        placeholderTextColor="#999"
        {...register}
      />

      {error && <Text style={styles.errorText}>{error?.message}</Text>}

      {maxLength && (
        <Text style={styles.characterCount}>
          {value?.length || 0}/{maxLength}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textColor2,
    marginBottom: 8,
  },
  required: {
    color: colors.errorColor,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: colors.bgColor,
    fontSize: 16,
    color: colors.textColor,
    minHeight: 100,
  },
  textInputError: {
    borderColor: colors.errorColor,
  },
  textInputDisabled: {
    backgroundColor: "#f5f5f5",
    borderColor: "#e0e0e0",
    color: colors.textColor2,
  },
  errorText: {
    fontSize: 12,
    color: colors.errorColor,
    marginTop: 4,
  },
  characterCount: {
    fontSize: 12,
    color: colors.textColor2,
    textAlign: "right",
    marginTop: 4,
  },
});
