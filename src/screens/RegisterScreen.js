import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Dimensions,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Modal,
} from "react-native";
import * as Haptics from "expo-haptics";
import * as Yup from "yup";
import { Block, Text } from "galio-framework";
import {
  Form,
  FormButton,
  FormField,
  Checkbox,
  Button,
} from "../../components";
import useStatusBar from "../../hooks/useStatusBar";
import { nowTheme } from "../../constants";
import { Context as AuthContext } from "../context/AuthContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Please enter a valid name")
    .min(2, "Name must have at least 2 characters")
    .max(20, "Name must have less than 20 characters")
    .label("Full name"),
  email: Yup.string()
    .required("Please enter a registered email")
    .email()
    .label("Email"),
  confirmEmail: Yup.string()
    .required("Please enter a registered email")
    .email()
    .oneOf([Yup.ref("email"), null], "Email must match")
    .label("Confirm Email"),
  password: Yup.string()
    .required()
    .min(6, "Password must have at least 6 characters")
    .label("Password"),
});

const { width, height } = Dimensions.get("screen");
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const RegistrationScreen = ({ navigation }) => {
  useStatusBar("dark-content");
  const { state, AuthSignUp, clearErrorMessage } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");

  function handlePasswordVisibility() {
    setRightIcon(rightIcon === "eye" ? "eye-off" : "eye");
    setPasswordVisibility(!passwordVisibility);
  }

  return (
    <DismissKeyboard>
      <KeyboardAwareScrollView>
        <Block flex>
          <Modal
            transparent={true}
            animationType={"none"}
            visible={state.errorMessage ? true : false}
          >
            <Block style={styles.modalBackground}>
              <Block style={styles.modal}>
                <Text h6>Error</Text>
                <Text size={16}>{state.errorMessage}</Text>
                <Button
                  round
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    clearErrorMessage();
                    setLoading(false);
                  }}
                  title="Close"
                />
              </Block>
            </Block>
          </Modal>
          <Block flex style={styles.inputContainer}>
            <Block center>
              <Text h4 style={styles.title}>
                Create your account
              </Text>
            </Block>
            <Form
              initialValues={{
                name: "",
                email: "",
                confirmEmail: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                setLoading(true);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                const response = await AuthSignUp(values);
                setLoading(false);
                response && navigation.navigate("Offer");
              }}
            >
              <FormField
                placeholder="Full name"
                leftIcon="account"
                name="name"
                autoCapitalize="none"
                keyboardType="default"
                textContentType="none"
                autoFocus={true}
                returnKeyType="next"
              />
              <FormField
                placeholder="Email"
                leftIcon="email"
                name="email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                returnKeyType="next"
              />
              <FormField
                placeholder="Confirm email"
                leftIcon="email"
                name="confirmEmail"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                returnKeyType="next"
              />
              <FormField
                placeholder="Password"
                leftIcon="lock"
                name="password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={passwordVisibility}
                textContentType="password"
                rightIcon={rightIcon}
                handlePasswordVisibility={handlePasswordVisibility}
                returnKeyType="done"
              />
              <Block style={styles.checkboxContainer}>
                <Checkbox
                  checkboxStyle={{
                    color: nowTheme.COLORS.PRIMARY,
                  }}
                  textStyle={{
                    color: nowTheme.COLORS.DEFAULT,
                    fontFamily: "montserrat-regular",
                  }}
                  isChecked
                  label="I accept the Terms of Service and Privacy Policy."
                />
                <Checkbox
                  checkboxStyle={{
                    color: nowTheme.COLORS.PRIMARY,
                  }}
                  color={nowTheme.COLORS.PRIMARY}
                  textStyle={{
                    color: nowTheme.COLORS.DEFAULT,
                    fontFamily: "montserrat-regular",
                  }}
                  isChecked
                  label="I'd like to receive updates via email about Corkify."
                />
              </Block>

              <Block center>
                <FormButton
                  title={
                    loading ? (
                      <ActivityIndicator color={nowTheme.COLORS.WHITE} />
                    ) : (
                      "Get started"
                    )
                  }
                />
              </Block>
            </Form>
            <Block center row>
              <Text
                style={[styles.footerText, { color: nowTheme.COLORS.MUTED }]}
              >
                Already have an account?{" "}
              </Text>
              <Pressable
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  navigation.navigate("Login");
                }}
              >
                <Text style={styles.footerText}>Sign in</Text>
              </Pressable>
            </Block>
          </Block>
        </Block>
      </KeyboardAwareScrollView>
    </DismissKeyboard>
  );
};
const styles = StyleSheet.create({
  title: {
    color: nowTheme.COLORS.SECONDARY,
    marginBottom: 50,
  },
  inputContainer: {
    height: height,
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
  checkboxContainer: {
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  footerText: {
    color: nowTheme.COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 10,
  },
});
export default RegistrationScreen;
