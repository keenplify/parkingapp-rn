import "react-native-gesture-handler";
import "./helpers/pre.helper";
import React from "react";
import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import { Root } from "./components/root.component";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { SafeAreaView } from "react-native-safe-area-context";
import { myTheme } from "./eva.theme";
import { FirebaseContext } from "./contexts/firebase.context";
import { getAuth } from "firebase/auth";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { getFirestore } from "@firebase/firestore";
import { getDatabase } from "@firebase/database";

const auth = getAuth();
const firestore = getFirestore();
const database = getDatabase();

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <SafeAreaView style={{ flex: 1 }}>
        <ApplicationProvider {...eva} theme={myTheme}>
          <NavigationContainer>
            <FirebaseContext.Provider value={{ auth, firestore, database }}>
              <Root />
            </FirebaseContext.Provider>
          </NavigationContainer>
        </ApplicationProvider>
      </SafeAreaView>
    </>
  );
}
