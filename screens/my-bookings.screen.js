import { Layout } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { BookingCardComponent } from "../components/booking-card.component";
import { FetchMyBookings } from "../helpers/fetch-booking.helper";
import { useUser } from "../helpers/user.helper";
import { general } from "../styles/general.style";

export function MyBookingsScreen({ navigation }) {
  const { firestore, auth } = useUser();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    FetchMyBookings(firestore, setBookings, auth);
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
