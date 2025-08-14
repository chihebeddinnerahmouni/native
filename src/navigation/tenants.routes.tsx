import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ERoute } from "../utils";
import { TenantsListPage } from "../screens/tenants/tenants list/tenants-list.page";

const TenantsStack = createNativeStackNavigator();

export const TenantsNavigator = () => {
  return (
    <TenantsStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={ERoute.TENANTS_LIST}
    >
      <TenantsStack.Screen
        name={ERoute.TENANTS_LIST}
        component={TenantsListPage}
      />
      {/* <TenantsStack.Screen
        name={ERoute.TENANTS_DETAILS}
        component={OwnerDetailsPage}
      /> */}
    </TenantsStack.Navigator>
  );
};
