import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import PropTypes from "prop-types";
import { Block, Button, Text } from "galio-framework";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import nowTheme from "../constants/Theme";
const { width, height } = Dimensions.get("screen");
class ArButton extends React.Component {
  render() {
    const {
      small,
      shadowless,
      children,
      color,
      style,
      fontSize,
      round,
      title,
      full,
      icon,
      ...props
    } = this.props;

    const colorStyle = color && nowTheme.COLORS[color.toUpperCase()];

    const buttonStyles = [
      small && styles.smallButton,
      full && styles.fullButton,
      colorStyle === "neutral"
        ? { backgroundColor: "rgba(0,0,0,0)" }
        : color && { backgroundColor: colorStyle },
      round && { borderRadius: nowTheme.SIZES.BASE * 2 },
      !shadowless && styles.shadow,
      { ...style },
    ];
    return (
      <Button
        style={buttonStyles}
        shadowless
        textStyle={{ fontSize: fontSize || 12, fontWeight: "700" }}
        {...props}
      >
        <Block row>
          <Block style={{ justifyContent: "center" }}>
            <Text style={styles.buttonText}>{title}</Text>
          </Block>

          {icon ? (
            <Block style={{ paddingLeft: 10 }}>
              <MaterialCommunityIcons name={icon} size={24} color="white" />
            </Block>
          ) : null}
        </Block>
      </Button>
    );
  }
}

ArButton.propTypes = {
  small: PropTypes.bool,
  shadowless: PropTypes.bool,
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([
      "default",
      "primary",
      "info",
      "error",
      "success",
      "warning",
      "simple",
      "neutral",
    ]),
  ]),
};

const styles = StyleSheet.create({
  smallButton: {
    width: 75,
    height: 28,
  },
  fullButton: {
    width: width * 0.8,
  },
  buttonText: {
    color: nowTheme.COLORS.WHITE,
    fontSize: 14,
    fontWeight: "400",
    textTransform: "uppercase",
    alignSelf: "center",
    justifyContent: "center",
  },
});

export default ArButton;
