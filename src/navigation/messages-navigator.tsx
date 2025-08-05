import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ERoute } from "../utils";
import { ConversationsList } from "../screens/messages/conversation list/conversations-list.page";
import { Messages } from "../screens/messages/messages.page";

const MessagesStack = createNativeStackNavigator();

export const MessagesNavigator = () => {
  return (
    <MessagesStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={ERoute.CONVERSATIONS_LIST}
    >
      <MessagesStack.Screen
        name={ERoute.CONVERSATIONS_LIST}
        component={ConversationsList}
      />
      <MessagesStack.Screen name={ERoute.MESSAGES_PAGE} component={Messages} />
    </MessagesStack.Navigator>
  );
};
