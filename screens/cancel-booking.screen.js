import {
  collection,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
} from "@firebase/firestore";
import { Button, Layout } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { ScrollView, ToastAndroid, View } from "react-native";
import { BookingCardComponent } from "../components/booking-card.component";
import { useUser } from "../helpers/user.helper";
import { useRefetchOnFocus } from "../helpers/useRefetchOnFocus.helper";

import { general } from "../styles/general.style";

export function CancelBookingScreen({ navigation }) {
  const { firestore } = useUser();
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState();

  const Fetch = async () => {
    const _bookings = await getDocs(collection(firestore, "booking"));
    setBookings(_bookings.docs);
  };

  useEffect(() => {
    Fetch();
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
