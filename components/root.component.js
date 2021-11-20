import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Splash } from "../screens/splash.screen";
import { AuthenticationScreen } from "../screens/authentication.screen";
import { UserMenuScreen } from "../screens/user-menu.screen";
import { NewBookingScreen } from "../screens/new-booking.screen";
import { MyBookingsScreen } from "../screens/my-bookings.screen";
import { CancelBookingScreen } from "../screens/cancel-booking.screen";

const Stack = createStackNavigator();

export const Root = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Authentication" component={AuthenticationScreen} />
      <Stack.Screen name="User Menu" component={UserMenuScreen} />
      <Stack.Screen name="New Booking" component={NewBookingScreen} />
      <Stack.Screen name="My Bookings" component={MyBookingsScreen} />
      <Stack.Screen name="Cancel Booking" component={CancelBookingScreen} />
    </Stack.Navigator>
  );
};
