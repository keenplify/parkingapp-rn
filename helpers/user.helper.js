import React, { useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { FirebaseContext } from "../contexts/firebase.context";

export function useUser() {
  const { auth, firestore } = useContext(FirebaseContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (auth?.currentUser) {
      getDoc(doc(firestore, "users", auth.currentUser.uid)).then((res) =>
        setUser(res.data())
      );
    }
  }, [auth, firestore]);

  return { user, auth, firestore };
}
