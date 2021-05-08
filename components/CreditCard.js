import React, { useContext, useState } from "react";
import { StyleSheet, Dimensions, Pressable } from "react-native";
import { Block, Text, Card } from "galio-framework";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { nowTheme } from "../constants";
import { SvgXml } from "react-native-svg";
import { decode as atob, encode as btoa } from "base-64";

const { width, height } = Dimensions.get("screen");

const CreditCard = ({
  type,
  number,
  name,
  exp_month,
  exp_year,
  onPress,
}) => {
  return (
    <Block flex style={{ paddingRight: 10 }}>
      <Pressable onPress={onPress}>
        <LinearGradient
          style={styles.container}
          colors={[
            nowTheme.CREDIT_CARD[type].color1,
            nowTheme.CREDIT_CARD[type].color2,
          ]}
          start={[0, 0]}
          end={[1, 1]}
          location={[0.25, 0.4, 1]}
        >
          <Block flex={0.5}>
            <Block style={styles.chip}>
              <SvgXml xml={atob(nowTheme.LOGO.CHIP)} width={30} height={30} />
            </Block>
            <Block style={styles.logo}>
              <SvgXml xml={atob(nowTheme.LOGO[type])} width={30} height={30} />
            </Block>
          </Block>
          <Block>
            <Text style={styles.cardnumber}>
              xxxx xxxx xxxx {number.substring(number.length - 4)}
            </Text>
          </Block>
          <Block flex={0.2} row>
            <Text style={styles.fullname}>{name}</Text>
            <Text style={styles.exp}>
              {exp_month} / {exp_year}
            </Text>
          </Block>
        </LinearGradient>
      </Pressable>
    </Block>
  );
};
export default CreditCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    width: 220,
    height: 130,
    elevation: 3,
  },
  chip: {
    marginLeft: 15,
    marginTop: 5,
  },
  logo: {
    position: "absolute",
    right: 0,
    marginRight: 5,
    marginTop: 5,
  },
  cardnumber: {
    color: nowTheme.COLORS.WHITE,
    fontSize: 18,
    marginLeft: 15,
    paddingVertical: 10,
  },
  fullname: {
    color: nowTheme.COLORS.WHITE,
    fontSize: 12,
    marginLeft: 15,
  },
  exp: {
    color: nowTheme.COLORS.WHITE,
    fontSize: 12,
    position: "absolute",
    right: 0,
    marginRight: 15,
  },
  isSelected: {
    paddingTop: 5,
    paddingLeft: 15,
  },
});
