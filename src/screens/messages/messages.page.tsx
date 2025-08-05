import React from "react";
import { View } from "react-native";
import { TextLabel } from "../../components/ui/texts/Texts.component";
import { AuthLayout } from "../../layout/auth.layout";

export const Messages = () => {
  return (
    <AuthLayout>
      <View>
        <TextLabel>Messages Page</TextLabel>
      </View>
    </AuthLayout>
  );
};
