import React from "react";
import { Text } from "./Text";
import { colors } from "../../../constants/colors";
import { Text as PreText } from "react-native";

export const PageTitle = (props: React.ComponentProps<typeof Text>) => (
  <Text weight="bold" color={colors.textColor} size={20} {...props} />
);

export const PageTitle2 = (props: React.ComponentProps<typeof Text>) => (
  <Text weight="medium" color={colors.textColor} size={16} {...props} />
);

export const PageSubtitle = (props: React.ComponentProps<typeof Text>) => (
  <Text size={16} color={colors.textColor2} {...props} />
);

export const TextBody = (props: React.ComponentProps<typeof Text>) => (
  // <Text {...props} />
  <PreText {...props} />
);

export const TextTitle = (props: React.ComponentProps<typeof Text>) => (
  <Text weight="medium" size={16} color={colors.textColor} {...props} />
);

export const TextLabel = (props: React.ComponentProps<typeof Text>) => (
  <Text weight="medium" size={14} {...props} />
);

export const TextButton = (props: React.ComponentProps<typeof Text>) => (
  <Text weight="medium" size={14} {...props} />
);

export default Text;
