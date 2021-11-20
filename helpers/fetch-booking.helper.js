import { get, ref } from "firebase/database";

export const FetchMyBookings = async (database, setBookings, auth) => {
  const snapshot = await get(
    ref(database, "bookings/" + auth.currentUser.uid + "/")
  );

  return setBookings(snapshot.val());
};
