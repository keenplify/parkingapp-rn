import { Layout } from "@ui-kitten/components";
import { Formik } from "formik";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { forms } from "../styles/forms.style";
import * as yup from "yup";
import { addDoc, collection, doc, setDoc } from "@firebase/firestore";
import { ToastAndroid } from "react-native";
import { NewBookingForm } from "../components/new-booking-form.component";

const schema = yup.object().shape({
  date: yup.date().required(),
  duration: yup.number().min(1).required(),
  slot: yup.number().min(1).required(),
});

export function NewBookingScreen() {
  return (
    <ScrollView>
      <Layout style={forms.container}>
        <Formik
          initialValues={{
            date: new Date(),
            duration: "1",
            slot: "",
          }}
          onSubmit={async (values, actions) => {
            try {
              const newDoc = await addDoc(collection(firestore, "booking"), {
                ...values,
              });

              ToastAndroid.show("Successfully booked.", ToastAndroid.LONG);
            } catch (error) {
              console.log(error);
            }
            return;
          }}
          validationSchema={schema}
          children={(formik) => <NewBookingForm formik={formik} />}
        />
      </Layout>
    </ScrollView>
  );
}
