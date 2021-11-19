import { collection, getDocs } from "@firebase/firestore";
import { Layout, Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { BookingCardComponent } from "../components/booking-card.component";
import { useUser } from "../helpers/user.helper";

import { general } from "../styles/general.style";

export function MyBookingsScreen({ navigation }) {
  const { firestore, user } = useUser();
  const [bookings, setBookings] = useState([]);

  const Fetch = async () => {
    const _bookings = await getDocs(collection(firestore, "booking"));
    setBookings(_bookings.docs);
  };

  useEffect(() => {
    Fetch();
  }, [bookings]);

  return (
    <Layout style={general.container} level="4">
      <ScrollView>
        {bookings.map((booking, key) => (
          <BookingCardComponent booking={booking} key={key} />
        ))}
      </ScrollView>
    </Layout>
  );
}
