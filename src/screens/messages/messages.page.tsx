import React from "react";
import { View } from "react-native";
import { TextLabel } from "../../components/ui/texts/Texts.component";
import { MainLayout } from "../../layout/main-layout.layout";

export const Messages = () => {
  return (
    <MainLayout>
      <View>
        <TextLabel>Messages Page</TextLabel>
      </View>
    </MainLayout>
  );
};
