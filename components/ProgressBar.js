import React, { useState } from "react";
import { withNavigation } from "@react-navigation/compat";
import PropTypes from "prop-types";
import { StyleSheet, Image, TouchableWithoutFeedback } from "react-native";
import { Block, Text } from "galio-framework";
import { nowTheme } from "../constants";
const Progressbar = (props) => {
  const { textStyle, label, id, checkboxStyle, _onChange } = props;
  const [isChecked, setIsChecked] = useState(true);

  return (
    <Block row style={styles.container}>
      <Block style={styles.circle} />
      <Block style={styles.line}></Block>

    </Block>
  );
};
export default Progressbar;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 10,
    width: 80,

    alignSelf: "center",
  },
  line: {
    backgroundColor: nowTheme.COLORS.PRIMARY,
    width: 40,
    borderColor: nowTheme.COLORS.BLOCK,
    padding: 0,
    margin: 0,

  },
  scale: {
    backgroundColor: nowTheme.COLORS.BLOCK,
    borderWidth: 0.5,
    borderColor: nowTheme.COLORS.BLOCK,
    padding: 2,
    margin: 0,
    borderRightColor: nowTheme.COLORS.BLACK,
    borderLeftColor: nowTheme.COLORS.BLACK,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 100 / 2,

    backgroundColor: nowTheme.COLORS.PRIMARY,
  },
});
