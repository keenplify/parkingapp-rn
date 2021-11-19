import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Splash } from "../screens/splash.screen";
import { AuthenticationScreen } from "../screens/authentication.screen";
import { UserMenuScreen } from "../screens/user-menu.screen";
import { NewBookingScreen } from "../screens/new-booking.screen";

const Stack = createStackNavigator();

export const Root = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Authentication" component={AuthenticationScreen} />
      <Stack.Screen name="User Menu" component={UserMenuScreen} />
      <Stack.Screen name="New Booking" component={NewBookingScreen} />
    </Stack.Navigator>
  );
};