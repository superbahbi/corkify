import React, { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import StripeCheckout from "react-native-stripe-checkout-webview";
// Context
import { Context as AuthContext } from "../context/AuthContext";
import { Context as UserContext } from "../context/UserContext";
import { Context as OfferContext } from "../context/OfferContext";

const TestScreen = ({ navigation }) => {
  const { state: authState } = useContext(AuthContext);
  const { state: userState } = useContext(UserContext);
  const { state: offerState } = useContext(OfferContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      console.clear();
      console.log(authState);
      console.log(userState);
      console.log(offerState);
    });
    return unsubscribe;
  }, [navigation]);
  return <View style={styles.flex}></View>;
};
const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
export default TestScreen;
