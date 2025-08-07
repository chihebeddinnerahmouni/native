import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from "react-native";
import { getButtonStyles, TUIType, TUIVariant } from "../../../utils";
import { TextButton } from "../texts/Texts.component";

type ButtonProps = {
  type?: TUIType;
  variant?: TUIVariant;
  onPress?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
  onPress = () => {},
  children,
  type = "primary",
  variant = "contained",
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}) => {
  const buttonStyles = getButtonStyles(type, variant, disabled);

  const containerStyle = StyleSheet.create({
    button: {
      ...styles.button,
      backgroundColor: buttonStyles.backgroundColor,
      borderColor: buttonStyles.borderColor,
      width: "auto",
      opacity: disabled ? 0.6 : 1,
      ...style,
    },
  });

  const textStyleCombined = StyleSheet.create({
    buttonText: {
      ...styles.buttonText,
      color: buttonStyles.textColor,
      ...textStyle,
    },
  });

  return (
    <TouchableOpacity
      style={containerStyle.button}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={disabled ? 1 : 0.7}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={buttonStyles.textColor}
          style={styles.loader}
        />
      ) : icon ? (
        <View style={styles.buttonContent}>
          {icon}
          {typeof children === "string" ? (
            <TextButton style={textStyleCombined.buttonText}>
              {children}
            </TextButton>
          ) : (
            children
          )}
        </View>
      ) : typeof children === "string" ? (
        <TextButton style={textStyleCombined.buttonText}>{children}</TextButton>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 44,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    minWidth: 80,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  loader: {
    marginRight: 8,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
