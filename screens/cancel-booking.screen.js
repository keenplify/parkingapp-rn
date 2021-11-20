import { doc, deleteDoc } from "@firebase/firestore";
import { Button, Layout } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { ScrollView, ToastAndroid, View } from "react-native";
import { BookingCardComponent } from "../components/booking-card.component";
import { FetchMyBookings } from "../helpers/fetch-booking.helper";
import { useUser } from "../helpers/user.helper";

import { general } from "../styles/general.style";

export function CancelBookingScreen({ navigation }) {
  const { firestore, auth } = useUser();
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState();

  useEffect(() => {
    FetchMyBookings(firestore, setBookings, auth);
  }, [bookings]);

  const handlePress = (booking) => {
    setSelectedBooking(booking);
  };

  const handlePressCancel = async () => {
    try {
      await deleteDoc(doc(firestore, "booking", selectedBooking.id));

      ToastAndroid.show("Successfully cancelled booking.", ToastAndroid.SHORT);

      Fetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout style={general.container} level="4">
      <ScrollView style={general.scrollView}>
        <Layout level="4">
          {bookings.map((booking, key) => (
            <BookingCardComponent
              booking={booking}
              key={key}
              selectedBooking={selectedBooking}
              onPress={handlePress}
            />
          ))}
        </Layout>
      </ScrollView>
      <Layout level="2">
        <Button
          disabled={!selectedBooking}
          status="danger"
          onPress={handlePressCancel}
        >
          Cancel Booking
        </Button>
      </Layout>
    </Layout>
  );
}
