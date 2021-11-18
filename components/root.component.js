import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Splash } from "../screens/splash.screen";
import { AuthenticationScreen } from "../screens/authentication.screen";

const Stack = createStackNavigator();

export const Root = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Authentication" component={AuthenticationScreen} />
    </Stack.Navigator>
  );
};
