import React, { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import StripeCheckout from "react-native-stripe-checkout-webview";
import { Loader } from "../../components";
import { nowTheme } from "../../constants";
const StripeWebViewScreen = ({ navigation, route }) => {
  const { session } = route.params;
  const options = {
    htmlContentLoading: '<h1 id="sc-loading">Loading...</h1>',
    htmlContentError: '<div id="sc-error-message"></div>',
    htmlContentHead: "",
  };
  return (
    <View style={styles.flex}>
      <StripeCheckout
        stripePublicKey={
          "pk_test_51INshdA9dfpX7QKvbUw2t586S7OXFOZAh3IMYVcLYgl6f5zYK9mpE0TjYejWI7x4DCyiiokUBV13VcbxntTBDLy5003NboIrft"
        }
        checkoutSessionInput={{
          sessionId: session,
        }}
        onSuccess={({ checkoutSessionId }) => {
          navigation.goBack();
          console.log(
            `Stripe checkout session succeeded. session id: ${checkoutSessionId}.`
          );
        }}
        onCancel={() => {
          navigation.goBack();
          console.log(`Stripe checkout session cancelled.`);
        }}
        loader={() => <Loader size="large" color={nowTheme.COLORS.WHITE} />}
        style={{ backgroundColor: "white" }}
        options={options}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  flex: {
    flex: 1,
    marginTop: 50, //170 android
  },
  webview: {
    backgroundColor: "white",
  },
});
export default StripeWebViewScreen;
