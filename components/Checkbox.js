import React, { useState } from "react";
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Ionicons";
import { Text } from "galio-framework";

const Checkbox = (props) => {
  const { textStyle, label, id, checkboxStyle, onPress, isChecked } = props;
  _onPress = () => {
    setIsChecked(!isChecked);
  };
  return (
    <TouchableWithoutFeedback key={id} onPress={onPress}>
      <View style={styles.checkboxContainer}>
        <Icon
          style={{ ...checkboxStyle }}
          name={isChecked ? "md-checkbox" : "ios-square-outline"}
          size={20}
        />
        <View style={{ marginLeft: 5 }}>
          <Text style={{ ...textStyle }}>{"" + label}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default Checkbox;
Checkbox.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  iconColor: PropTypes.string,
  checked: PropTypes.bool,
  onChecked: PropTypes.func,
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});
