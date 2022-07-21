import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Animated,
  ImageBackground,
} from "react-native";

// Galio components
import { Block, Text, Button as GaButton, theme } from "galio-framework";

// Now UI themed components
import { Images, nowTheme, articles, tabs } from "../../constants";
import {
  Button,
  Select,
  Icon,
  Input,
  Header,
  Switch,
  Card,
} from "../../components";

import Img from "../../components/Img";

const { width } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

const InviteScreen = (props) => {
  // const { data } = props.route.params
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (count <= 0) {
      setCount(0);
    } else if (count >= 12) {
      setCount(12);
    }
  }, [count]);
  return (
    <Block flex center>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30, width }}
      >
        <Block
          flex
          style={{ paddingHorizontal: theme.SIZES.BASE, paddingTop: 100 }}
        >
          <Block flex row>
            <Text size={16} style={styles.title}></Text>
          </Block>
        </Block>
      </ScrollView>
      <Block flex center style={styles.footer}>
        <Button
          size={"large"}
          flex
          textStyle={{ fontFamily: "montserrat-regular", fontSize: 16 }}
        >
          PROCEED TO CHECKOUT
        </Button>
      </Block>
    </Block>
  );
};

export default InviteScreen;

const styles = StyleSheet.create({
  title: {
    fontFamily: "montserrat-bold",
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 22,
    color: nowTheme.COLORS.HEADER,
  },
  image: {
    width: 300,
    height: 300,
    alignContent: "center",
  },
  heading: {
    fontSize: 20,
    marginTop: 20,
  },
  cartDescription: {
    paddingHorizontal: 30,
  },
  counter: {
    marginVertical: 10,
    //borderWidth: 1,
    //borderRadius: 5,
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
  counterText: {
    marginHorizontal: 10,
    textAlign: "center",
    fontSize: 30,
  },
  priceText: {
    fontSize: 20,
    fontWeight: "700",
  },
  summary: {
    width: 300,
    height: 100,
  },

  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: nowTheme.COLORS.PRIMARY,
    height: 80,
  },
});
