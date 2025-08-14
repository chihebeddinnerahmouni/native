import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthNavigator } from "./Auth.routes";
import { useAuth } from "../contexts";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MessagesNavigator } from "./messages.routes";
import { PropertiesNavigator } from "./Properties.routes";
import { EScreens, ETabs } from "../utils";
import colors from "../constants/colors";
import { OwnersNavigator } from "./owners.routes";
import { TenantsNavigator } from "./tenants.routes";

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
          // display: "none",
        },
      }}
      initialRouteName={EScreens.TENANTS}
    >
      <Tab.Screen
        name={EScreens.MESSAGES}
        component={MessagesNavigator}
        options={{
          tabBarLabel: "Messages",
          // icon
        }}
      />
      <Tab.Screen
        name={EScreens.PROPERTIES}
        component={PropertiesNavigator}
        options={{
          tabBarLabel: "Properties",
          // icon
        }}
      />
      <Tab.Screen
        name={EScreens.OWNERS}
        component={OwnersNavigator}
        options={{
          tabBarLabel: "Owners",
          // icon
        }}
      />
      <Tab.Screen
        name={EScreens.TENANTS}
        component={TenantsNavigator}
        options={{
          tabBarLabel: "Tenants",
          // icon
        }}
      />
    </Tab.Navigator>
  );
};
