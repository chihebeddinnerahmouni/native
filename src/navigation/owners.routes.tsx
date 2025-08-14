import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ERoute } from "../utils";
import { OwnersListPage } from "../screens/owners/owner list/owners-list.page";
import { OwnerDetailsPage } from "../screens/owners/owner details/owner-details.page";

const OwnersStack = createNativeStackNavigator();

export const OwnersNavigator = () => {
  return (
    <OwnersStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={ERoute.OWNERS_DETAILS}
    >
      <OwnersStack.Screen
        name={ERoute.OWNERS_LIST}
        component={OwnersListPage}
      />
      <OwnersStack.Screen
        name={ERoute.OWNERS_DETAILS}
        component={OwnerDetailsPage}
      />
    </OwnersStack.Navigator>
  );
};
