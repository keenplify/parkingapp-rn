import { Button, Icon, Layout, Text } from "@ui-kitten/components";
import React, { useContext, useEffect, useState } from "react";
import { useUser } from "../helpers/user.helper";
import { signOut } from "firebase/auth";
import { userMenu } from "../styles/user-menu.style";

export function UserMenuScreen({ navigation }) {
  const { user, auth } = useUser();

  const handleSignOut = () => {
    signOut(auth);
    navigation.replace("Splash");
  };

  return (
    <Layout style={userMenu.container}>
      <Text>Welcome, {user?.fullname}! What would you like to do?</Text>
      <Button
        style={userMenu.button}
        accessoryLeft={<Icon name="plus-outline" />}
        onPress={() => navigation.navigate("New Booking")}
      >
        New Booking
      </Button>
      <Button
        style={userMenu.button}
        accessoryLeft={<Icon name="eye-outline" />}
        onPress={() => navigation.navigate("My Bookings")}
      >
        View Booking
      </Button>
      <Button
        style={userMenu.button}
        accessoryLeft={<Icon name="close-outline" />}
        onPress={() => navigation.navigate("Cancel Booking")}
      >
        Cancel Booking
      </Button>
      <Button
        style={userMenu.button}
        onPress={handleSignOut}
        status="warning"
        accessoryLeft={<Icon name="log-out" />}
      >
        Logout
      </Button>
    </Layout>
  );
}
