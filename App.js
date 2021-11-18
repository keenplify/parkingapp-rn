import "react-native-gesture-handler";
import "./helpers/pre.helper";
import React from "react";
import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import { Root } from "./components/root.component";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { SafeAreaView } from "react-native-safe-area-context";
import { myTheme } from "./eva.theme";
import { AuthContext } from "./contexts/auth.context";
import { getAuth } from "firebase/auth";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

const auth = getAuth();

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <SafeAreaView style={{ flex: 1 }}>
        <ApplicationProvider {...eva} theme={myTheme}>
          <NavigationContainer>
            <AuthContext.Provider value={auth}>
              <Root />
            </AuthContext.Provider>
          </NavigationContainer>
        </ApplicationProvider>
      </SafeAreaView>
    </>
  );
}
