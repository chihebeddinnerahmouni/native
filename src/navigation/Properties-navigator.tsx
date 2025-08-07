import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ERoute } from "../utils";
import { PropertiesListPage } from "../screens/properties/properties list/properties-list.page";

const PropertiesStack = createNativeStackNavigator();

export const PropertiesNavigator = () => {
  return (
    <PropertiesStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={ERoute.PROPERTIES_LIST}
    >
      <PropertiesStack.Screen
        name={ERoute.PROPERTIES_LIST}
        component={PropertiesListPage}
      />
    </PropertiesStack.Navigator>
  );
};
