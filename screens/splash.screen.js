import React, { useEffect, useContext } from "react";
import { FirebaseContext } from "../contexts/firebase.context";
import { Layout, Text } from "@ui-kitten/components";

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
    <Layout>
      <Text>Splash</Text>
    </Layout>
  );
}
