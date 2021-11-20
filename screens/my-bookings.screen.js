import { Layout, Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { BookingCardComponent } from "../components/booking-card.component";
import { FetchMyBookings } from "../helpers/fetch-booking.helper";
import { useUser } from "../helpers/user.helper";
import { general } from "../styles/general.style";

export function MyBookingsScreen({ navigation }) {
  const { auth, database } = useUser();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    FetchMyBookings(database, setBookings, auth);
  }, [bookings, database]);

  return (
    <Layout style={general.container} level="4">
      <ScrollView>
        {bookings &&
          Object.keys(bookings).map((key, i) => {
            return (
              <BookingCardComponent
                bookingKey={key}
                booking={bookings[key]}
                key={i}
              />
            );
          })}
      </ScrollView>
    </Layout>
  );
}
