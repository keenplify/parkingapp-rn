import React from "react";
import dayjs from "dayjs";
import { Card, Layout, Text } from "@ui-kitten/components";
import { general } from "../styles/general.style";
import { PRICEPERHOUR } from "../helpers/constants.helper";

export function BookingCardComponent({
  booking,
  bookingKey,
  onPress,
  selectedBookingKey,
}) {
  const date = dayjs(booking.date);

  return (
    <Card
      style={general.card}
      status={
        selectedBookingKey
          ? bookingKey == selectedBookingKey
            ? "danger"
            : undefined
          : undefined
      }
      onPress={() => onPress && onPress(bookingKey)}
    >
      <Layout style={general.normalFlex}>
        <Text style={general.labelText}>Booking Key:</Text>
        <Text>{bookingKey}</Text>
      </Layout>
      <Layout style={general.normalFlex}>
        <Text style={general.labelText}>Date:</Text>
        <Text>{date.format("MMMM DD YYYY")}</Text>
      </Layout>
      <Layout style={general.normalFlex}>
        <Text style={general.labelText}>Time:</Text>
        <Text>{date.format("hh:mm A")}</Text>
      </Layout>
      <Layout style={general.normalFlex}>
        <Text style={general.labelText}>Duration (in Hours):</Text>
        <Text>{booking.duration}</Text>
      </Layout>
      <Layout style={general.normalFlex}>
        <Text style={general.labelText}>Slot:</Text>
        <Text>{booking.slot}</Text>
      </Layout>
      <Layout style={general.normalFlex}>
        <Text style={general.labelText}>Price:</Text>
        <Text>₱{Number.parseInt(booking.duration) * PRICEPERHOUR}</Text>
      </Layout>
    </Card>
  );
}
