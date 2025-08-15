import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ERoute } from "../utils";
import { BookingsListPage } from "../screens/bookings/bookings-list.page";

const BookingsStack = createNativeStackNavigator();

export const BookingsNavigator = () => {
  return (
    <BookingsStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={ERoute.BOOKINGS_LIST}
    >
      <BookingsStack.Screen
        name={ERoute.BOOKINGS_LIST}
        component={BookingsListPage}
      />
    </BookingsStack.Navigator>
  );
};
