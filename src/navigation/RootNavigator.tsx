import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthNavigator } from "./Auth-navigator";
import { MessagesNavigator } from "./messages-navigator";
import { EScreens } from "../utils";
import { useAuth } from "../contexts";

const RootStack = createNativeStackNavigator();

export const RootNavigator = () => {
  const { isUserAuthenticated } = useAuth();

  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isUserAuthenticated ? EScreens.MESSAGES : EScreens.AUTH}
    >
      {!isUserAuthenticated ? (
        <>
          <RootStack.Screen
            name={EScreens.MESSAGES}
            component={MessagesNavigator}
          />
        </>
      ) : (
        <>
          <RootStack.Screen name={EScreens.AUTH} component={AuthNavigator} />
        </>
      )}
    </RootStack.Navigator>
  );
};
