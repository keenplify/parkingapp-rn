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
import { login } from "../styles/login.style";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../contexts/auth.context";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export function LoginScreen() {
  const auth = useContext(AuthContext);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const renderIcon = (props) => (
    <TouchableWithoutFeedback
      onPress={() => setSecureTextEntry(!secureTextEntry)}
    >
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  return (
    <Layout style={login.container} level="2">
      <Formik
        initialValues={{
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
          <Layout style={login.form} level="1">
            <Input
              label={(evaProps) => <Text {...evaProps}>Email</Text>}
              caption={capitalizeFirstLetter(errors.email)}
              status={errors.email ? "warning" : undefined}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
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
            />
            <Divider style={login.divider} />
            <Button
              onPress={handleSubmit}
              disabled={isSubmitting || !isValid}
              isSubmitting={isSubmitting}
            >
              Login
            </Button>
            {status && (
              <Text status="danger" category="c1" style={login.status}>
                {status.message}
              </Text>
            )}
          </Layout>
        )}
      </Formik>
    </Layout>
  );
}
