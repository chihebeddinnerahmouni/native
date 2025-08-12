import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthNavigator } from "./Auth-navigator";
import { useAuth } from "../contexts";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MessagesNavigator } from "./messages-navigator";
import { PropertiesNavigator } from "./Properties-navigator";
import { EScreens, ETabs } from "../utils";
import colors from "../constants/colors";

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const RootNavigator = () => {
  const { isUserAuthenticated } = useAuth();

  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isUserAuthenticated ? ETabs.MAIN : ETabs.AUTH}
    >
      {isUserAuthenticated ? (
        <>
          <RootStack.Screen name={ETabs.MAIN} component={MainTabNavigator} />
        </>
      ) : (
        <>
          <RootStack.Screen name={ETabs.AUTH} component={AuthNavigator} />
        </>
      )}
    </RootStack.Navigator>
    // <RootStack.Navigator
    //   screenOptions={{ headerShown: false }}
    //   initialRouteName={ETabs.AUTH}
    // >
    //   <RootStack.Screen name={ETabs.MAIN} component={MainTabNavigator} />
    //   <RootStack.Screen name={ETabs.AUTH} component={AuthNavigator} />
    // </RootStack.Navigator>
  );
};

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primaryColor,
        tabBarInactiveTintColor: colors.textColor2,
        tabBarStyle: {
          backgroundColor: colors.bgColor,
          borderTopColor: colors.borderColor,
          display: "none",
        },
      }}
      initialRouteName={EScreens.PROPERTIES}
    >
      <Tab.Screen
        name={EScreens.MESSAGES}
        component={MessagesNavigator}
        options={{
          tabBarLabel: "Messages",
          // Add icon here if you have one
        }}
      />
      <Tab.Screen
        name={EScreens.PROPERTIES}
        component={PropertiesNavigator}
        options={{
          tabBarLabel: "Properties",
          // Add icon here if you have one
        }}
      />
    </Tab.Navigator>
  );
};
