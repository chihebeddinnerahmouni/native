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

  const handleTextChange = (text: string) => {
    if (register && register.onChange) {
      register.onChange({ target: { value: text, name: register.name } });
    }
    if (onChangeText) {
      onChangeText(text);
    }
  };

  const inputValue = value?.toString() || "";

  useEffect(() => {
    if (type === "phoneNumber" && register?.name) {
      setValue?.(register?.name, (value as string)?.replace(/[^+\d]/g, ""));
    }
  }, [value, register?.name, setValue, type]);

  return (
    <View style={[style, styles.container, error && styles.errorContainer]}>
      {label && (
        <TextLabel style={styles.label}>
          {label}
          {required && <TextLabel style={styles.required}>*</TextLabel>}
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
          value={inputValue}
          onChangeText={handleTextChange}
          placeholder={placeholder}
          placeholderTextColor="#999"
          editable={!disabled}
          secureTextEntry={type === "password" && !passwordTextVisible}
          onKeyPress={onKeyPress}
          maxLength={maxLength}
          {...(register ? { ref: register.ref, name: register.name } : {})}
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
    // width: "auto",
    // flex: 1,
  },
  errorContainer: {
    borderColor: colors.errorColor,
  },
  label: {
    marginBottom: 8,
  },
  required: {
    color: colors.errorColor,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 8,
    backgroundColor: colors.bgColor,
    minHeight: 48,
  },
  disabled: {
    backgroundColor: colors.emptyBgColor,
    opacity: 0.6,
  },
  startIcon: {
    paddingLeft: 12,
    paddingRight: 8,
  },
  currencyText: {
    fontSize: 14,
    color: colors.textColor,
    fontWeight: "500",
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.textColor,
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
    color: colors.errorColor,
    marginTop: 4,
  },
});
