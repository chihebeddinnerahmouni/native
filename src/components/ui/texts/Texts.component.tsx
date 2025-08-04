import React from "react";
import { Text } from "./Text";
import { colors } from "../../../constants/colors";

export const PageTitle = (props: React.ComponentProps<typeof Text>) => (
  <Text weight="bold" color={colors.textColor} size={20} {...props} />
);

export const PageSubtitle = (props: React.ComponentProps<typeof Text>) => (
  <Text size={16} color={colors.textColor2} {...props} />
);

export const TextBody = (props: React.ComponentProps<typeof Text>) => (
  <Text size={16} {...props} />
);

export const TextLabel = (props: React.ComponentProps<typeof Text>) => (
  <Text weight="medium" size={16} {...props} />
);

export const Caption = (props: React.ComponentProps<typeof Text>) => (
  <Text weight="light" size={12} {...props} />
);

export const ButtonText = (props: React.ComponentProps<typeof Text>) => (
  <Text weight="medium" size={16} {...props} />
);

export default Text;
