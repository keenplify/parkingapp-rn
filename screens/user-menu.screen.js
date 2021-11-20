import { Button, Icon, Layout, Text } from "@ui-kitten/components";
import React, { useContext, useEffect, useState } from "react";
import { useUser } from "../helpers/user.helper";
import { signOut } from "firebase/auth";
import { userMenu } from "../styles/user-menu.style";
import { Image, ScrollView } from "react-native";
import { general } from "../styles/general.style";

export function UserMenuScreen({ navigation }) {
  const { user, auth } = useUser();
  const [userData, setUserData] = useState(user?.val());

  useEffect(() => {
    const data = user?.val();
    setUserData(data);
  }, [user]);

  const handleSignOut = () => {
    signOut(auth);
    navigation.replace("Splash");
  };

  return (
    <Layout style={userMenu.container}>
      <ScrollView>
        <Layout style={general.centerFlex}>
          <Image
            source={require("../assets/icon.png")}
            style={general.menuLogo}
          />
        </Layout>
        <Layout style={general.centerFlex}>
          <Text>
            Welcome,{" "}
            <Text style={{ fontWeight: "bold" }}>{userData?.fullname}</Text>!
          </Text>
          <Text>What would you like to do?</Text>
        </Layout>
        <Button
          style={userMenu.button}
          accessoryLeft={<Icon name="plus-outline" />}
          onPress={() => navigation.navigate("New Booking")}
          status="success"
        >
          New Booking
        </Button>
        <Button
          style={userMenu.button}
          accessoryLeft={<Icon name="eye-outline" />}
          onPress={() => navigation.navigate("My Bookings")}
        >
          View Bookings
        </Button>
        <Button
          style={userMenu.button}
          accessoryLeft={<Icon name="close-outline" />}
          onPress={() => navigation.navigate("Cancel Booking")}
          status="danger"
        >
          Cancel Bookings
        </Button>
        <Button
          style={userMenu.button}
          onPress={handleSignOut}
          status="warning"
          accessoryLeft={<Icon name="log-out" />}
        >
          Logout
        </Button>
      </ScrollView>
    </Layout>
  );
}
