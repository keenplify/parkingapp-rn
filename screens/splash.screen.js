import React, { useEffect, useContext } from "react";
import { FirebaseContext } from "../contexts/firebase.context";
import { Layout, Text } from "@ui-kitten/components";
import { Image } from "react-native";
import { general } from "../styles/general.style";

export function Splash({ navigation }) {
  const { auth } = useContext(FirebaseContext);
  useEffect(() => {
    if (!auth) return;

    if (!auth.currentUser) {
      navigation.replace("Authentication");
    } else {
      navigation.replace("User Menu");
    }
  }, [auth]);

  return (
    <Layout style={general.centerFlex}>
      <Image
        source={require("../assets/icon.png")}
        style={general.splashImage}
      />
      <Text>Parking App</Text>
    </Layout>
  );
}
