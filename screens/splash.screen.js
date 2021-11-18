import React, { useEffect } from "react";
import { Layout, Text } from "@ui-kitten/components";

export function Splash({ navigation }) {
  useEffect(() => {
    navigation.replace("Authentication");
  }, []);

  return (
    <Layout>
      <Text>Splash</Text>
    </Layout>
  );
}
