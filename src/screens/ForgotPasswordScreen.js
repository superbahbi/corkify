import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as Yup from "yup";
import { Block, Text } from "galio-framework";
import { Snackbar } from "react-native-paper";
import { Form, FormButton, FormField } from "../../components";
import { nowTheme } from "../../constants";
import { passwordReset } from "../api/firebase";
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter a registered email")
    .email()
    .label("Email"),
});

const { width } = Dimensions.get("screen");
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const ForgotPasswordScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const onDismissSnackBar = () => setVisible(false);
  return (
    <DismissKeyboard>
      <Block flex>
        <Block flex style={styles.inputContainer}>
          <Block center>
            <Text h4 style={styles.title}>
              Forgot password
            </Text>
          </Block>
          <Form
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              setVisible(!visible);
              passwordReset(values.email)
              resetForm({});
            }}
          >
            <FormField
              placeholder="Email"
              name="email"
              leftIcon="email"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoFocus={true}
            />
            <Block center>
              <FormButton title="Send link" />
            </Block>
          </Form>
        </Block>
        <Block>
          <Snackbar
            style={{
              backgroundColor: nowTheme.COLORS.PRIMARY,
              color: nowTheme.COLORS.WHITE,
            }}
            theme={{ colors: { accent: nowTheme.COLORS.WHITE } }}
            visible={visible}
            onDismiss={onDismissSnackBar}
            action={{
              label: "Close",
              onPress: () => {
                setVisible(!visible);
              },
            }}
          >
            Email sent!
          </Snackbar>
        </Block>
      </Block>
    </DismissKeyboard>
  );
};
const styles = StyleSheet.create({
  title: {
    color: nowTheme.COLORS.SECONDARY,
    marginBottom: 50,
  },
  inputContainer: {
    paddingTop: 120,
    paddingHorizontal: 50,
    backgroundColor: nowTheme.COLORS.WHITE,
  },
  header: {
    fontSize: 30,
    fontWeight: "500",
    color: nowTheme.COLORS.DEFAULT,
  },
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000040",
  },
  modal: {
    backgroundColor: nowTheme.COLORS.BORDER_COLOR,
    height: 200,
    width: width - 40,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: nowTheme.COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 10,
  },
});
export default ForgotPasswordScreen;
