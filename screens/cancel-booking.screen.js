import React, { useEffect, useState } from "react";
import { ScrollView, ToastAndroid, View } from "react-native";
import { BookingCardComponent } from "../components/booking-card.component";
import { FetchMyBookings } from "../helpers/fetch-booking.helper";
import { useUser } from "../helpers/user.helper";
import { remove, ref } from "@firebase/database";
import { Button, Layout } from "@ui-kitten/components";
import { general } from "../styles/general.style";

export function CancelBookingScreen({ navigation }) {
  const { database, auth } = useUser();
  const [bookings, setBookings] = useState([]);
  const [selectedBookingKey, setSelectedBookingKey] = useState();

  useEffect(() => {
    FetchMyBookings(database, setBookings, auth);
  }, [bookings]);

  const handlePress = (key) => {
    setSelectedBookingKey(key);
  };

  const handlePressCancel = async () => {
    try {
      await remove(
        ref(
          database,
          "bookings/" + auth.currentUser.uid + "/" + selectedBookingKey
        )
      );

      ToastAndroid.show("Successfully cancelled booking.", ToastAndroid.SHORT);

      FetchMyBookings(database, setBookings, auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout style={general.container} level="4">
      <ScrollView style={general.scrollView}>
        <Layout level="4">
          {bookings &&
            Object.keys(bookings).map((key, i) => {
              return (
                <BookingCardComponent
                  bookingKey={key}
                  booking={bookings[key]}
                  key={i}
                  onPress={handlePress}
                  selectedBookingKey={selectedBookingKey}
                />
              );
            })}
        </Layout>
      </ScrollView>
      <Layout level="2">
        <Button
          disabled={!selectedBookingKey}
          status="danger"
          onPress={handlePressCancel}
        >
          Cancel Booking
        </Button>
      </Layout>
    </Layout>
  );
}
