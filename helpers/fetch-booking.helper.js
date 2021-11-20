import { collection, getDocs, query, where } from "@firebase/firestore";

export const FetchMyBookings = async (firestore, setBookings, auth) => {
  const _bookings = await getDocs(
    query(
      collection(firestore, "booking"),
      where("userId", "==", auth.currentUser.uid)
    )
  );

  setBookings(_bookings.docs);
};
