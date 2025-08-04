import React from "react";
import { View } from "react-native";
import { TextLabel } from "../../components/ui/texts/Texts.component";
import { MainLayout } from "../../layout/main-layout.layout";

export const ConversationsList = () => {
  return (
    <MainLayout>
      <View>
        <TextLabel>Conversations List Page</TextLabel>
      </View>
    </MainLayout>
  );
};
