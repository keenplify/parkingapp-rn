import React, { useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Fragment } from "react";
import dayjs from "dayjs";
import { Button, Card, Icon, Input, Layout, Text } from "@ui-kitten/components";
import { capitalizeFirstLetter } from "../helpers/capitalize.helper";
import { useState } from "react";
import { useUser } from "../helpers/user.helper";
import { forms } from "../styles/forms.style";
import { collection, getDocs } from "@firebase/firestore";

const SLOTS = 6;

export function NewBookingForm({ formik }) {
  const {
    values,
    errors,
    isSubmitting,
    isValid,
    handleChange,
    setFieldValue,
    handleBlur,
    handleSubmit,
  } = formik;
  const { firestore, auth } = useUser();
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const [disabledSlots, setDisabledSlots] = useState([]);

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const fetchBookings = async () => {
    try {
      // https://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
      const booking = await getDocs(collection(firestore, "booking"));

      const data = booking.docs.map((doc) => doc.data());
      let _disabledSlots = [];

      const currentMinDate = dayjs(values.date);
      const currentMaxDate = currentMinDate.add(
        Number.parseInt(values.duration),
        "hours"
      );

      data.forEach((data) => {
        const minDate = dayjs(data.date.seconds * 1000);
        const maxDate = minDate.add(Number.parseInt(data.duration), "hours");

        if (currentMinDate <= maxDate && maxDate <= currentMaxDate) {
          typeof _disabledSlots.find((v) => v == data.slot) === "undefined" &&
            _disabledSlots.push(data.slot);
        }
      });

      if (typeof _disabledSlots.find((v) => v == values.slot) !== "undefined") {
        setFieldValue("slot", "");
      }
      setDisabledSlots(_disabledSlots);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isValid) fetchBookings();
  }, [formik]);

  return (
    <Fragment>
      {show && (
        <DateTimePicker
          value={values.date}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setShow(Platform.OS === "ios");
            setFieldValue("date", currentDate);
          }}
          mode={mode}
        />
      )}
      <Layout style={forms.form}>
        <Layout style={forms.row}>
          <Text>{dayjs(values.date).format("MMMM D YYYY")}</Text>
          <Button onPress={showDatepicker} style={forms.actionButton}>
            Set Date
          </Button>
        </Layout>
        <Layout style={forms.row}>
          <Text>{dayjs(values.date).format("hh:mm A")}</Text>
          <Button onPress={showTimepicker} style={forms.actionButton}>
            Set Time
          </Button>
        </Layout>
        <Layout style={forms.rowBottom}>
          <Input
            label={(evaProps) => <Text {...evaProps}>Duration in hours</Text>}
            caption={capitalizeFirstLetter(errors.duration)}
            status={errors.duration ? "warning" : undefined}
            onChangeText={handleChange("duration")}
            onBlur={handleBlur("duration")}
            value={values.duration}
            style={forms.control}
            accessoryLeft={
              <Button
                size="small"
                accessoryLeft={<Icon name="minus" />}
                onPress={() => {
                  if (Number.parseInt(values.duration) <= 1) return;
                  setFieldValue(
                    "duration",
                    (Number.parseInt(values.duration) - 1).toString()
                  );
                }}
                status="danger"
                style={forms.control}
              />
            }
            accessoryRight={
              <Button
                size="small"
                accessoryLeft={<Icon name="plus" />}
                onPress={() =>
                  setFieldValue(
                    "duration",
                    (Number.parseInt(values.duration) + 1).toString()
                  )
                }
                status="success"
              />
            }
          />
        </Layout>
        <Layout style={forms.containerTwoColumn}>
          {Array.from(Array(SLOTS).keys()).map((v, key) => {
            const slot = v + 1;
            const isTaken =
              typeof disabledSlots.find((v) => v == slot) !== "undefined";
            const isSelected = slot == values.slot;
            return (
              <Card
                key={key}
                onPress={() => {
                  !isTaken && setFieldValue("slot", slot.toString());
                }}
                status={
                  isSelected
                    ? "success"
                    : disabledSlots.find((v) => v == slot)
                    ? "danger"
                    : "basic"
                }
                style={forms.card}
                disabled={isTaken}
              >
                <Text>Slot #{slot}</Text>
                <Text category="c1">{isTaken && "(Unavailable)"}</Text>
              </Card>
            );
          })}
        </Layout>
        <Button
          onPress={handleSubmit}
          disabled={isSubmitting || !isValid}
          isSubmitting={isSubmitting}
          status="success"
        >
          Add Booking
        </Button>
      </Layout>
    </Fragment>
  );
}
