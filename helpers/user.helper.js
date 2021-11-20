import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../contexts/firebase.context";
import { onValue, ref } from "firebase/database";

export function useUser() {
  const { auth, firestore, database } = useContext(FirebaseContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (auth?.currentUser) {
      onValue(ref(database, "users/" + auth.currentUser.uid), (snapshot) => {
        setUser(snapshot);
      });
    }
  }, [auth, database]);

  return { user, auth, firestore, database };
}
