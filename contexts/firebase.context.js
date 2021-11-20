import { createContext } from "react";

export const FirebaseContext = createContext({
  auth: null,
  firestore: null,
  database: null,
});
