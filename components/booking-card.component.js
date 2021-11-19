import React from "react";
import dayjs from "dayjs";
import { Card, Layout, Text } from "@ui-kitten/components";
import { general } from "../styles/general.style";
import { PRICEPERHOUR } from "../helpers/constants.helper";

export function BookingCardComponent({ booking, onPress, selectedBooking }) {
  const data = booking.data();
  const date = dayjs(data.date.seconds * 1000);

  return (
    <Card
      style={general.card}
      status={
        selectedBooking
          ? booking.id == selectedBooking.id
            ? "danger"
            : undefined
          : undefined
      }
      onPress={() => onPress && onPress(booking)}
    >
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
        <Text>{data.duration}</Text>
      </Layout>
      <Layout style={general.normalFlex}>
        <Text style={general.labelText}>Slot:</Text>
        <Text>{data.slot}</Text>
      </Layout>
      <Layout style={general.normalFlex}>
        <Text style={general.labelText}>Price:</Text>
        <Text>₱{Number.parseInt(data.duration) * PRICEPERHOUR}</Text>
      </Layout>
    </Card>
  );
}
