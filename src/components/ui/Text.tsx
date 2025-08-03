import React from "react";
import { Text as RNText, StyleSheet, TextProps, TextStyle } from "react-native";
import { fonts } from "../../constants/fonts";

type FontWeight = "light" | "regular" | "medium" | "bold";

interface CustomTextProps extends TextProps {
  weight?: FontWeight;
  color?: string;
  size?: number;
  align?: TextStyle["textAlign"];
}

export const Text: React.FC<CustomTextProps> = ({
  children,
  style,
  weight = "regular",
  color,
  size,
  align,
  ...props
}) => {
  const fontWeights = {
    light: fonts.satoshiLight,
    regular: fonts.satoshiRegular,
    medium: fonts.satoshiMedium,
    bold: fonts.satoshiBold,
  };

  const fontFamily = fontWeights[weight] || fontWeights.regular;

  return (
    <RNText
      style={[
        styles.text,
        { fontFamily },
        color ? { color } : {},
        size ? { fontSize: size } : {},
        align ? { textAlign: align } : {},
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: "#000000",
  },
});
