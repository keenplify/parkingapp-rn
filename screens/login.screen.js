import {
  Input,
  Layout,
  Text,
  Button,
  Divider,
  Icon,
} from "@ui-kitten/components";
import { Formik } from "formik";
import React, { useContext, useState } from "react";
import * as yup from "yup";
import { capitalizeFirstLetter } from "../helpers/capitalize.helper";
import { forms } from "../styles/forms.style";
import { signInWithEmailAndPassword } from "firebase/auth";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import { FirebaseContext } from "../contexts/firebase.context";
import { Image } from "react-native";
import { general } from "../styles/general.style";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export function LoginScreen({ navigation }) {
  const { auth } = useContext(FirebaseContext);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const renderIcon = (props) => (
    <TouchableWithoutFeedback
      onPress={() => setSecureTextEntry(!secureTextEntry)}
    >
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  return (
    <Layout style={forms.container} level="3">
      <Image
        source={require("../assets/icon.png")}
        style={general.splashImage}
      />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async ({ email, password }, { setStatus, setErrors }) => {
          try {
            const result = await signInWithEmailAndPassword(
              auth,
              email,
              password
            );

            navigation.replace("User Menu");
          } catch (error) {
            const msg = error.message;
            console.log(msg);
            if (msg?.includes("user-not-found"))
              return setErrors({
                email: "User with specified email does not exist.",
              });
            else if (msg?.includes("wrong-password"))
              return setErrors({ password: "Wrong password" });
            else
              return setStatus({
                message: "Unable to login. Please try again.",
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
            <Divider style={forms.divider} />
            <Button
              onPress={handleSubmit}
              disabled={isSubmitting || !isValid}
              isSubmitting={isSubmitting}
            >
              Login
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
  );
}
