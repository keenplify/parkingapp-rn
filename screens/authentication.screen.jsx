import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import { LoginScreen } from "./login.screen";
import { RegisterScreen } from "./register.screen";

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="Login" />
    <BottomNavigationTab title="Register" />
  </BottomNavigation>
);

export function AuthenticationScreen() {
  return (
    <Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Screen name="Login" component={LoginScreen} />
      <Screen name="Register" component={RegisterScreen} />
    </Navigator>
  );
}
