import {
  Button,
  Divider,
  Icon,
  Input,
  Layout,
  Text,
} from "@ui-kitten/components";
import { Formik } from "formik";
import React, { useContext, useState } from "react";
import * as yup from "yup";
import { forms } from "../styles/forms.style";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FirebaseContext } from "../contexts/firebase.context";
import { capitalizeFirstLetter } from "../helpers/capitalize.helper";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import { ScrollView } from "react-native";
import { ref, set } from "firebase/database";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  phone: yup.string().required(),
  username: yup.string().required(),
  fullname: yup.string().required(),
});

export function RegisterScreen({ navigation }) {
  const { auth, firestore, database } = useContext(FirebaseContext);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const renderIcon = (props) => (
    <TouchableWithoutFeedback
      onPress={() => setSecureTextEntry(!secureTextEntry)}
    >
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );
  return (
    <Layout style={forms.main} level="3">
      <ScrollView>
        <Layout style={forms.container} level="3">
          <Formik
            initialValues={{
              username: "",
              fullname: "",
              phone: "",
              email: "",
              password: "",
            }}
            onSubmit={async (values, { setStatus, setErrors }) => {
              try {
                console.log("submitting...");
                const result = await createUserWithEmailAndPassword(
                  auth,
                  values.email,
                  values.password
                );

                const { password, email, ...stripped } = values;

                set(ref(database, "users/" + result.user.uid), {
                  ...stripped,
                });

                navigation.navigate("Login");
              } catch (error) {
                const msg = error.message;
                console.log(msg);
                if (msg?.includes("user-not-found"))
                  return setStatus({ message: "User not found!" });
                else if (msg?.includes("weak-password"))
                  return setErrors({
                    message: "Password should be at least 6 characters.",
                  });
                else if (msg?.includes("email-already-in-use"))
                  return setErrors({
                    email: "The email you provided is already in use.",
                  });
                else
                  return setStatus({
                    message: "Unable to register. Please try again.",
                  });
              }
            }}
            validationSchema={schema}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              isSubmitting,
              errors,
              values,
              isValid,
              status,
            }) => (
              <Layout style={forms.form} level="1">
                <Input
                  label={(evaProps) => <Text {...evaProps}>Username</Text>}
                  caption={capitalizeFirstLetter(errors.username)}
                  status={errors.username ? "warning" : undefined}
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                  style={forms.control}
                />
                <Input
                  label={(evaProps) => <Text {...evaProps}>Email</Text>}
                  caption={capitalizeFirstLetter(errors.email)}
                  status={errors.email ? "warning" : undefined}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  style={forms.control}
                />
                <Input
                  label={(evaProps) => <Text {...evaProps}>Password</Text>}
                  caption={capitalizeFirstLetter(errors.password)}
                  status={errors.password ? "warning" : undefined}
                  secureTextEntry={secureTextEntry}
                  accessoryRight={renderIcon}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  style={forms.control}
                />
                <Input
                  label={(evaProps) => <Text {...evaProps}>Full Name</Text>}
                  caption={capitalizeFirstLetter(errors.fullname)}
                  status={errors.fullname ? "warning" : undefined}
                  onChangeText={handleChange("fullname")}
                  onBlur={handleBlur("fullname")}
                  value={values.fullname}
                  style={forms.control}
                />
                <Input
                  label={(evaProps) => <Text {...evaProps}>Phone Number</Text>}
                  caption={capitalizeFirstLetter(errors.phone)}
                  status={errors.phone ? "warning" : undefined}
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                  style={forms.control}
                />
                <Divider style={forms.divider} />
                <Button
                  onPress={handleSubmit}
                  disabled={isSubmitting || !isValid}
                  isSubmitting={isSubmitting}
                >
                  Register
                </Button>
                {status && (
                  <Text status="danger" category="c1" style={forms.status}>
                    {status.message}
                  </Text>
                )}
              </Layout>
            )}
          </Formik>
        </Layout>
      </ScrollView>
    </Layout>
  );
}
