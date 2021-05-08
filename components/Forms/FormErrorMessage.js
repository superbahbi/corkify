import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { nowTheme } from "../../constants";

export default function FormErrorMessage({ error, visible }) {
  if (!error || !visible) {
    return null;
  }

  return <Text style={styles.errorText}>{error}</Text>;
}

const styles = StyleSheet.create({
  errorText: {
    marginLeft: 15,
    color: nowTheme.COLORS.ERROR,
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '400'
  }
});