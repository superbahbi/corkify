import React, { useState, useEffect, useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable,
  Image,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Button } from "../../components";
import { nowTheme } from "../../constants";
import { Context as OfferContext } from "../context/OfferContext";
import { Context as AuthContext } from "../context/AuthContext";
const { width, height } = Dimensions.get("screen");

function truncator(numToTruncate, intDecimalPlaces) {
  var numPower = Math.pow(10, intDecimalPlaces);
  return ~~(numToTruncate * numPower) / numPower;
}
const CartScreen = ({ navigation }) => {
  const { state, currentCart } = useContext(OfferContext);
  const { state: authState } = useContext(AuthContext);
  const [offer, setOffer] = useState(state.offer);
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    if (offer) {
      if (count < 1) {
        setCount(1);
      } else if (count >= 12) {
        setCount(12);
      }
      var amount = offer.ourPrice;

      const tax = truncator((+amount * +count) / 10.0, 2);
      const subtotal = truncator(+amount * +count, 2);
      const total = truncator(+subtotal + +tax, 2);

      // console.log("Tax: " +  Number.parseFloat(tax))
      // console.log("Subtotal: " + subtotal)
      // console.log(+subtotal + +tax )

      setPrice(subtotal);
      setTax(tax);
      setFinalPrice(total);
      // currentCart(total);
    }
  }, [count]);
  return (
    <Block flex center>
      <Block flex={0.9} style={styles.container}>
        <Block flex={0.35}>
          <Text style={styles.title}>Pay Corkify</Text>
          <Text style={styles.price}>${finalPrice}</Text>
          <Block row flex style={styles.subtotal}>
            <Image style={styles.image} source={{ uri: offer.image }} />
            <Text style={styles.product}>
              {offer.year +
                " " +
                offer.title +
                " " +
                offer.size +
                "\n$" +
                offer.ourPrice +
                " each"}{" "}
            </Text>
          </Block>
        </Block>
        <Block style={styles.divider} />

        <Block flex={0.07}>
          <Block
            flex
            row
            style={{
              backgroundColor: nowTheme.COLORS.PRIMARY,
              width: 120,
              borderRadius: 21.5,
            }}
          >
            <Pressable
              style={{
                borderRightWidth: 1,
                borderColor: nowTheme.COLORS.WHITE,
                width: 40,
                alignSelf: "center",
                alignItems: "center",
              }}
              disabled={count === 1}
              onPress={() => setCount(count - 1)}
            >
              <Text style={{ padding: 10, color: nowTheme.COLORS.WHITE }}>
                -
              </Text>
            </Pressable>
            <Text
              style={{
                paddingHorizontal: 15,
                alignSelf: "center",
                fontSize: 18,
                color: nowTheme.COLORS.WHITE,
                width: 40,
              }}
            >
              {count}
            </Text>
            <Pressable
              style={{
                borderLeftWidth: 1,
                borderColor: nowTheme.COLORS.WHITE,
                width: 40,
                alignSelf: "center",
                alignItems: "center",
              }}
              disabled={count === 12}
              onPress={() => setCount(count + 1)}
            >
              <Text
                style={{
                  padding: 10,
                  color: nowTheme.COLORS.WHITE,
                }}
              >
                +
              </Text>
            </Pressable>
          </Block>
        </Block>
        <Block flex={0.3}>
          <Block row space="between" style={{ paddingTop: 7 }}>
            <Text
              style={{ fontFamily: "montserrat-regular" }}
              color={nowTheme.COLORS.TEXT}
            >
              Subtotal
            </Text>
            <Text style={{ paddingRight: 20 }}>${price}</Text>
          </Block>
          <Block row space="between" style={{ paddingTop: 7 }}>
            <Text
              style={{ fontFamily: "montserrat-regular" }}
              color={nowTheme.COLORS.TEXT}
            >
              Sales tax (10%)
            </Text>
            <Text style={{ paddingRight: 20 }}>${tax}</Text>
          </Block>
          <Block row space="between" style={{ paddingTop: 7 }}>
            <Text
              style={{ fontFamily: "montserrat-regular" }}
              color={nowTheme.COLORS.TEXT}
            >
              Shipping
            </Text>
            <Text style={{ paddingRight: 20 }}>Free</Text>
          </Block>
          <Block style={styles.divider} />
          <Block row space="between" style={{ paddingTop: 7 }}>
            <Text
              style={{ fontFamily: "montserrat-regular" }}
              color={nowTheme.COLORS.TEXT}
            >
              Total due
            </Text>
            <Text style={{ paddingRight: 20 }}>${finalPrice}</Text>
          </Block>
        </Block>
      </Block>

      <Button
        onPress={() => {
          navigation.navigate("Shipping");
        }}
        full
        color="primary"
        round
        title="Procced to checkout"
      />
    </Block>
  );
};
export default CartScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 120,
    marginHorizontal: 50,
    height: height * 0.85,
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
    color: nowTheme.COLORS.TEXT,
  },
  price: {
    fontSize: 40,
    fontWeight: "500",
    fontFamily: "montserrat-regular",
  },
  product: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    color: nowTheme.COLORS.HEADER,
  },
  image: {
    width: 50,
    height: 50,
    alignContent: "center",
  },
  subtotal: {
    paddingTop: 30,
  },
  heading: {
    fontSize: 20,
    marginTop: 20,
  },
  divider: {
    backgroundColor: nowTheme.COLORS.BORDER,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(136, 152, 170, 0.3)",
    marginVertical: 20,
  },
  counter: {
    marginVertical: 10,
    padding: 5,
  },
  incrementText: {
    fontSize: 20,
    width: 26,
    height: 26,
    borderRadius: 26 / 2,
    borderWidth: 1,
    textAlign: "center",
    marginTop: 5,
    color: nowTheme.COLORS.MUTED,
    borderColor: nowTheme.COLORS.MUTED,
  },
  quantity: {
    marginTop: 0,
    borderRadius: 0,
    borderColor: nowTheme.COLORS.PRIMARY,
  },
  button: {
    borderRadius: 21.5,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: width * 0.8,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: nowTheme.COLORS.PRIMARY,
    alignSelf: "center",
    justifyContent: "flex-end",
  },
  buttonText: {
    color: nowTheme.COLORS.WHITE,
    fontSize: 14,
    fontWeight: "400",
    textTransform: "uppercase",
  },
});
