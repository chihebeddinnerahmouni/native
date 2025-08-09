import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ERoute } from "../utils";
import { PropertiesListPage } from "../screens/properties/properties list/properties-list.page";
import { PropertyDetailsPage } from "../screens/properties/property details/property-details.page";

const PropertiesStack = createNativeStackNavigator();

export const PropertiesNavigator = () => {
  return (
    <PropertiesStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={ERoute.PROPERTIES_DETAILS}
    >
      <PropertiesStack.Screen
        name={ERoute.PROPERTIES_LIST}
        component={PropertiesListPage}
      />
      <PropertiesStack.Screen
        name={ERoute.PROPERTIES_DETAILS}
        component={PropertyDetailsPage}
      />
    </PropertiesStack.Navigator>
  );
};
