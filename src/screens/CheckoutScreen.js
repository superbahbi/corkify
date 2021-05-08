import React, { useState, useEffect, useContext } from "react";
import * as Yup from "yup";
import { ScrollView, StyleSheet, Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// Galio components
import { Block, Text, theme } from "galio-framework";

// Now UI themed components
import { nowTheme } from "../../constants";
import {
  Checkbox,
  Form,
  FormButton,
  FormField,
  FormErrorMessage,
} from "../../components";

const { width } = Dimensions.get("screen");

// import { Context as OfferContext } from "../context/store";

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

// const paymentIntent = (dispatch) => async(token, totalPrice) =>{
const CheckoutScreen = (props) => {
  const [loginError, setLoginError] = useState("");
  const [billing, setBilling] = useState(false);
  // const [clientSecret, setClientSecret] = useState(null)
  // const { state, payRequest, getSessionID } = useContext(OfferContext);

  // const _onChange = () => {
  //   setBilling(!billing);
  // };

  // const handleOnSubmit = (values) => {
  //   payRequest(values, state.clientSecret);
  // };

  useEffect(() => {
    // if (state.user.id) {
    //   console.log("getSessionID");
    //   // getSessionID(
    //   //   state.token,
    //   //   state.totalPrice,
    //   //   state.offer.year,
    //   //   state.offer.title
    //   // );
    // } else {
    //   console.log("Please login");
    //   // console.log(state)
    // }
  }, [state.count]);

  console.log(state.sessionID);
  // useEffect(() => {
  //   // Create PaymentIntent as soon as the page loads

  // }, []);
  return (
    <Block flex>
      <KeyboardAwareScrollView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          <Block
            flex
            style={{ paddingHorizontal: theme.SIZES.BASE, paddingTop: 10 }}
          >
            <Block flex style={styles.container}>
              <Form
                initialValues={{
                  email: "",
                  name: "",
                  streetAddressLine1: "",
                  streetAddressLine2: "",
                  addressState: "",
                  addressCity: "",
                  postalCode: "",
                  addressState: "",
                  creditCardNumber: "",
                  expMonth: "",
                  expYear: "",
                  cvc: "",
                  cardName: "",
                  billingName: "",
                  billingStreetAddressLine1: "",
                  billingStreetAddressLine2: "",
                  billingAddressCity: "",
                  billingPostalCode: "",
                  billingPostalState: "",
                }}
                // validationSchema={validationSchema}
                onSubmit={(values) => handleOnSubmit(values)}
              >
                <Text style={styles.heading}>Shipping information</Text>
                <Text style={styles.subHeading}>Email</Text>
                <FormField
                  group
                  start
                  end
                  name="email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  returnKeyType="next"
                />
                <Text style={styles.subHeading}>Shipping address</Text>
                <FormField
                  group
                  start
                  name="name"
                  placeholder="Name"
                  keyboardType="default"
                  textContentType="name"
                  returnKeyType="next"
                />
                <FormField
                  group
                  name="streetAddressLine1"
                  placeholder="Address line 1"
                  keyboardType="default"
                  textContentType="streetAddressLine1"
                  returnKeyType="next"
                />
                <FormField
                  group
                  name="streetAddressLine2"
                  placeholder="Address line 2"
                  keyboardType="default"
                  textContentType="streetAddressLine2"
                  returnKeyType="next"
                />

                <Block row width={149}>
                  <FormField
                    group
                    half
                    name="addressCity"
                    placeholder="City"
                    keyboardType="default"
                    textContentType="addressCity"
                    returnKeyType="next"
                  />
                  <FormField
                    group
                    name="postalCode"
                    placeholder="ZIP"
                    keyboardType="default"
                    textContentType="postalCode"
                    returnKeyType="next"
                  />
                </Block>

                <FormField
                  group
                  end
                  name="addressState"
                  placeholder="State"
                  keyboardType="default"
                  textContentType="addressState"
                  returnKeyType="next"
                />
                <Text style={styles.heading}>Payment details</Text>
                <Text style={styles.subHeading}>Card information</Text>
                <FormField
                  group
                  start
                  name="creditCardNumber"
                  placeholder="1234 1234 1234"
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="creditCardNumber"
                  returnKeyType="next"
                />
                <Block row width={99.3}>
                  <FormField
                    group
                    half
                    name="expMonth"
                    placeholder="Month"
                    keyboardType="default"
                    // textContentType="addressCity"
                    returnKeyType="next"
                  />
                  <FormField
                    group
                    half
                    name="expYear"
                    placeholder="Year"
                    keyboardType="default"
                    // textContentType="postalCode"
                    returnKeyType="next"
                  />
                  <FormField
                    group
                    name="cvc"
                    placeholder="CVC"
                    keyboardType="default"
                    // textContentType="postalCode"
                    returnKeyType="next"
                  />
                </Block>
                <FormField
                  group
                  end
                  name="cardName"
                  placeholder="Name on Card"
                  keyboardType="default"
                  textContentType="name"
                  returnKeyType="go"
                />
                <Checkbox
                  name="billingCheckBox"
                  _onChange={_onChange}
                  checkboxStyle={{
                    color: nowTheme.COLORS.PRIMARY,
                  }}
                  color={nowTheme.COLORS.PRIMARY}
                  textStyle={{
                    color: nowTheme.COLORS.DEFAULT,
                    fontFamily: "montserrat-regular",
                  }}
                  label="Billing address is same as shipping"
                />
                {billing ? (
                  <>
                    <Text style={styles.subHeading}>Billing address</Text>
                    <FormField
                      group
                      start
                      name="billingName"
                      placeholder="Name"
                      keyboardType="default"
                      textContentType="name"
                    />
                    <FormField
                      group
                      name="billingStreetAddressLine1"
                      placeholder="Address line 1"
                      keyboardType="default"
                      textContentType="streetAddressLine1"
                    />
                    <FormField
                      group
                      name="billingStreetAddressLine2"
                      placeholder="Address line 2"
                      keyboardType="default"
                      textContentType="streetAddressLine2"
                    />

                    <Block row width={149}>
                      <FormField
                        group
                        half
                        name="billingAddressCity"
                        placeholder="City"
                        keyboardType="default"
                        textContentType="addressCity"
                      />
                      <FormField
                        group
                        name="billingPostalCode"
                        placeholder="ZIP"
                        keyboardType="default"
                        textContentType="postalCode"
                      />
                    </Block>

                    <FormField
                      group
                      end
                      name="billingAddressState"
                      placeholder="State"
                      keyboardType="default"
                      textContentType="addressState"
                    />
                  </>
                ) : null}
                <Block center>
                  <FormButton center title={"Pay " + state.totalPrice} />
                </Block>

                {<FormErrorMessage error={loginError} visible={true} />}
              </Form>
            </Block>
          </Block>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Block>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  heading: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 10,
    paddingLeft: 5,
  },
  subHeading: {
    fontSize: 14,
    fontWeight: "300",
    color: nowTheme.COLORS.TEXT,
    paddingLeft: 5,
  },
  container: {
    paddingHorizontal: 30,
  },
});
