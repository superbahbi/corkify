import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import * as Yup from "yup";
import { Block, Text } from "galio-framework";
import {
  loginWithEmail,
  getUserData,
  getToken,
  firebaseLogin,
  firebaseGetUser,
  firebaseGetToken,
} from "../api/firebase";
import {
  Form,
  FormButton,
  FormField,
  Button,
  Checkbox,
} from "../../components";
import useStatusBar from "../../hooks/useStatusBar";
import { nowTheme } from "../../constants";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as UserContext } from "../context/UserContext";
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter a registered email")
    .email()
    .label("Email"),
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

const LoginScreen = ({ navigation }) => {
  useStatusBar("dark-content");
  const {
    state: authState,
    AuthLogIn,
    clearErrorMessage,
  } = useContext(AuthContext);
  const {
    state: userState,
    addUserData,
    getStripeCard,
    getStripeSessionID,
  } = useContext(UserContext);
  const [isLoading, setLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isChecked, setChecked] = useState(false);
  function handlePasswordVisibility() {
    setRightIcon(rightIcon === "eye" ? "eye-off" : "eye");
    setPasswordVisibility(!passwordVisibility);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      try {
        const email = await AsyncStorage.getItem("@loggedin:email");
        const password = await AsyncStorage.getItem("@loggedin:pass");
        const remember = await AsyncStorage.getItem("@loggedin:remember");
        setUser({ email: email, password: password });
        setChecked(JSON.parse(remember));
      } catch (error) {
        console.log(error);
      }
    });
    return unsubscribe;
  }, [navigation]);

  async function handleOnLogin(values, { resetForm }) {
    const { email, password } = values;
    if (isChecked) {
      const { email, password } = values;
      try {
        await AsyncStorage.setItem("@loggedin:email", email);
        await AsyncStorage.setItem("@loggedin:pass", password);
        await AsyncStorage.setItem("@loggedin:remember", JSON.stringify(true));
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await AsyncStorage.setItem("@loggedin:email", "");
        await AsyncStorage.setItem("@loggedin:pass", "");
        await AsyncStorage.setItem("@loggedin:remember", JSON.stringify(false));
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    let auth, user;
    try {
      // Logging in with email and password
      auth = await loginWithEmail(email, password);
      const { accessToken, expirationTime, refreshToken } =
        auth.user.toJSON().stsTokenManager;

      // Saving auth data to context
      await AuthLogIn(
        { resetForm },
        auth.user.uid,
        accessToken,
        expirationTime,
        refreshToken
      );
      // Getting logged in user data
      user = await getUserData(auth.user.uid);
      // Saving user data to context
      addUserData(user);
      // Getting all credit card data
      getStripeCard(user.stripe_id, accessToken);
      // Getting saving credit card data session ID
      getStripeSessionID(accessToken, {
        customer_id: user.stripe_id,
      });
    } catch (error) {
      console.log("error" + error);
      return;
    } finally {
      console.log("Successfully logged in");
      setLoading(false);
      auth && user && navigation.navigate("Offer");
      // auth && user && navigation.goBack();
    }
  }
  return (
    <DismissKeyboard>
      <Block flex>
        <Modal
          transparent={true}
          animationType={"none"}
          visible={authState.errorMessage ? true : false}
        >
          <Block style={styles.modalBackground}>
            <Block style={styles.modal}>
              <Text h6>Error</Text>
              <Text size={16}>{authState.errorMessage}</Text>
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
              Welcome back!
            </Text>
          </Block>
          <Block></Block>
          <Form
            initialValues={{
              email: user.email ? user.email : "",
              password: user.password ? user.password : "",
            }}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) =>
              handleOnLogin(values, { resetForm })
            }
          >
            <FormField
              placeholder="Email"
              leftIcon="email"
              name="email"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoFocus={true}
              returnKeyType="next"
            />
            <FormField
              placeholder="Password"
              name="password"
              leftIcon="lock"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={passwordVisibility}
              textContentType="password"
              rightIcon={rightIcon}
              handlePasswordVisibility={handlePasswordVisibility}
              returnKeyType="done"
            />

            <Block row>
              <Checkbox
                checkboxStyle={{
                  color: nowTheme.COLORS.PRIMARY,
                }}
                color={nowTheme.COLORS.PRIMARY}
                textStyle={{
                  color: nowTheme.COLORS.DEFAULT,
                  fontFamily: "montserrat-regular",
                }}
                label="Remember me"
                isChecked={isChecked}
                onPress={() => {
                  setChecked(!isChecked);
                }}
              />

              <Pressable
                style={{ position: "absolute", right: 0 }}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  navigation.navigate("ForgotPassword");
                }}
              >
                <Text style={styles.footerText}>Forgot password?</Text>
              </Pressable>
            </Block>

            <Block center>
              <FormButton
                title={
                  isLoading ? (
                    <ActivityIndicator color={nowTheme.COLORS.WHITE} />
                  ) : (
                    "Submit"
                  )
                }
              />
            </Block>

            <Block center row>
              <Text
                style={[styles.footerText, { color: nowTheme.COLORS.MUTED }]}
              >
                Don't have an account?{" "}
              </Text>
              <Pressable
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  navigation.navigate("Signup");
                }}
              >
                <Text style={styles.footerText}>Sign up now</Text>
              </Pressable>
            </Block>
          </Form>
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
});
export default LoginScreen;
