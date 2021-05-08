import React from "react";
import { StyleSheet, Text, Dimensions } from "react-native";
import { nowTheme } from "../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useFormikContext } from "formik";
const { width, height } = Dimensions.get("screen");
export default function AppButton({ title, onPress, disabled }) {
  const { errors } = useFormikContext();
  const color = Object.keys(errors).length
    ? nowTheme.COLORS.MUTED
    : nowTheme.COLORS.PRIMARY;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor: color }]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 21.5,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: width * 0.75,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: nowTheme.COLORS.WHITE,
    fontSize: 14,
    fontWeight: "400",
    textTransform: "uppercase",
  },
});
