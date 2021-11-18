import { Layout } from "@ui-kitten/components";
import { Formik } from "formik";
import React from "react";
import * as yup from "yup";
import { register } from "../styles/register.style";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  phone: yup.string().required(),
  username: yup.string().required(),
  fullname: yup.string().required(),
});

export function RegisterScreen() {
  return (
    <Layout style={register.container} level="2">
      <Formik
        initialValues={{
          username: "",
          fullname: "",
          phone: "",
          email: "",
          password: "",
        }}
        onSubmit={async ({ email, password }, { setStatus }) => {
          try {
            const result = await signInWithEmailAndPassword(
              auth,
              email,
              password
            );
          } catch (error) {
            const msg = error.message;
            if (msg?.includes("user-not-found"))
              return setStatus({ message: "User not found!" });
          }
        }}
        validationSchema={schema}
      ></Formik>
    </Layout>
  );
}
