import React, { ReactNode, useEffect, useMemo, useState } from "react";
import {
  View,
  // Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from "react-native";
import {
  FieldError,
  UseFormRegisterReturn,
  UseFormSetValue,
} from "react-hook-form";
import { EyeIcon, EyeOffIcon, LoopIcon } from "../../../../icons";
import { colors } from "../../../../constants/colors";
import { TextLabel } from "../../texts/Texts.component";

type FieldTextProps = {
  label?: string;
  type?:
    | "text"
    | "number"
    | "search"
    | "date"
    | "time"
    | "phoneNumber"
    | "email"
    | "password"
    | "currency";
  placeholder?: string;
  value?: string | number;
  onChangeText?: (text: string) => void;
  required?: boolean;
  register?: UseFormRegisterReturn<string>;
  style?: object;
  min?: number | string;
  max?: number | string;
  disabled?: boolean;
  error?: FieldError;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue?: UseFormSetValue<Record<string, any>>;
  onKeyPress?: TextInputProps["onKeyPress"];
  maxLength?: number;
  startIcon?: ReactNode;
  secureTextEntry?: boolean;
};

export const FieldText = ({
  label,
  type = "text",
  placeholder = "",
  required,
  onChangeText,
  value,
  register,
  style,
  //   max,
  //   min,
  disabled,
  error,
  setValue,
  onKeyPress,
  maxLength,
  startIcon,
  secureTextEntry,
}: FieldTextProps) => {
  const [passwordTextVisible, setPasswordTextVisible] = useState(false);

  const customType = useMemo(() => {
    return type === "phoneNumber"
      ? "default"
      : type === "currency"
        ? "numeric"
        : type === "search"
          ? "default"
          : type === "password" && passwordTextVisible
            ? "default"
            : type === "password"
              ? "default"
              : type === "email"
                ? "email-address"
                : type === "number"
                  ? "numeric"
                  : "default";
  }, [type, passwordTextVisible]);

  const customIcon = useMemo(() => {
    if (type === "search") {
      return <LoopIcon />;
    }

    if (type === "currency") {
      return <TextLabel style={styles.currencyText}>AED</TextLabel>;
    }

    return startIcon;
  }, [startIcon, type]);

  useEffect(() => {
    if (type === "phoneNumber" && register?.name) {
      setValue?.(register?.name, (value as string)?.replace(/[^+\d]/g, ""));
    }
  }, [value, register?.name, setValue, type]);

  return (
    <View style={[styles.container, style, error && styles.errorContainer]}>
      {label && (
        <TextLabel style={styles.label}>
          {label} {required && <TextLabel style={styles.required}>*</TextLabel>}
        </TextLabel>
      )}

      <View style={[styles.inputContainer, disabled && styles.disabled]}>
        {customIcon && <View style={styles.startIcon}>{customIcon}</View>}
        <TextInput
          style={[
            styles.input,
            customIcon ? styles.inputWithIcon : undefined,
            type === "password" ? styles.inputWithPasswordIcon : undefined,
          ]}
          keyboardType={customType as TextInputProps["keyboardType"]}
          value={value?.toString()}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#999"
          editable={!disabled}
          secureTextEntry={type === "password" && !passwordTextVisible}
          onKeyPress={onKeyPress}
          maxLength={maxLength}
          {...register}
        />
        {type === "password" && (
          <TouchableOpacity
            style={styles.passwordIcon}
            onPress={() => setPasswordTextVisible(!passwordTextVisible)}
          >
            {passwordTextVisible ? <EyeIcon /> : <EyeOffIcon />}
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <TextLabel style={styles.errorText}>{error?.message}</TextLabel>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  errorContainer: {
    borderColor: colors.errorColor || "#FF6B6B",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textColor || "#333",
    marginBottom: 8,
  },
  required: {
    color: colors.errorColor || "#FF6B6B",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.borderColor || "#DDD",
    borderRadius: 8,
    backgroundColor: colors.bgColor || "#FFF",
    minHeight: 48,
  },
  disabled: {
    backgroundColor: "#F5F5F5",
    opacity: 0.6,
  },
  startIcon: {
    paddingLeft: 12,
    paddingRight: 8,
  },
  currencyText: {
    fontSize: 14,
    color: colors.textColor || "#333",
    fontWeight: "500",
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.textColor || "#333",
    minHeight: 48,
  },
  inputWithIcon: {
    paddingLeft: 4,
  },
  inputWithPasswordIcon: {
    paddingRight: 4,
  },
  passwordIcon: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  errorText: {
    fontSize: 12,
    color: colors.errorColor || "#FF6B6B",
    marginTop: 4,
  },
});
