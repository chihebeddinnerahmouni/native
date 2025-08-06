import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthNavigator } from "./Auth-navigator";
import { MessagesNavigator } from "./messages-navigator";
import { EScreens } from "../utils";

const RootStack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={EScreens.AUTH}
    >
      <RootStack.Screen name={EScreens.AUTH} component={AuthNavigator} />
      <RootStack.Screen
        name={EScreens.MESSAGES}
        component={MessagesNavigator}
      />
    </RootStack.Navigator>
  );
};
