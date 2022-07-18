import React, { useContext, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import StripeCheckout from "react-native-stripe-checkout-webview";
// import { Context as OfferContext } from "../context/store";
const OrderConfirmationScreen = () => {
  // const { state, getSessionID } = useContext(OfferContext);
  // useEffect(()=>{
  //     getSessionID(state.token)
  // },[])
  return (
    <View style={styles.flex}>
      <Text>Order Confirmation</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  flex: {
    flex: 1,
    // marginTop: -120 //170 android
  },
});
export default OrderConfirmationScreen;
