import { initializeApp } from "firebase/app";
import { LogBox } from "react-native";

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

const firebase = {
  projectId: "parkingapp-f73f1",
};

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBch3iXgGihoyCe5BgV4mXmFmm-Cv7JKiQ",
  authDomain: `${firebase.projectId}.firebaseapp.com`,
  databaseURL: `https://parkingapp-f73f1-default-rtdb.asia-southeast1.firebasedatabase.app/`,
  projectId: firebase.projectId,
  storageBucket: "project-id.appspot.com",
  messagingSenderId: "sender-id",
  appId: "1:327035789169:android:cdc20dc22845e7d84360d0",
  measurementId: "G-measurement-id",
};

initializeApp(firebaseConfig);
LogBox.ignoreLogs([
  "AsyncStorage",
  "Setting a timer",
  "Can't perform a React state update on an unmounted component.",
]);
