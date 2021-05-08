import React from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { nowTheme } from "../../constants";
import { Block, Text } from "galio-framework";
export default function AppTextInput({
  leftIcon,
  rightIcon,
  handlePasswordVisibility,
  group,
  start,
  end,
  half,
  errors,
  touched,
  title,
  value,
  ...otherProps
}) {
  const borderColor = errors
    ? nowTheme.COLORS.ERROR
    : value
    ? nowTheme.COLORS.SUCCESS
    : nowTheme.COLORS.PRIMARY;
  return (
    <Block>
      <Block row style={{marginVertical: 10}}>
        <Block style={{ alignSelf: "center"}}>
          {leftIcon && (
            <MaterialCommunityIcons
              name={leftIcon}
              size={20}
              color={nowTheme.COLORS.BORDER}
              style={styles.icon}
            />
          )}
        </Block>
        <Block style={[{ borderColor: borderColor }, [styles.container]]}>
          <TextInput
            selectionColor={nowTheme.COLORS.MUTED}
            style={styles.input}
            placeholderTextColor={nowTheme.COLORS.MUTED}
            value={value}
            {...otherProps}
          />
          <Block style={styles.rightIconStyles}>
            {rightIcon ? (
              <TouchableOpacity onPress={handlePasswordVisibility}>
                <MaterialCommunityIcons
                  name={rightIcon}
                  size={20}
                  color={nowTheme.COLORS.MUTED}
                />
              </TouchableOpacity>
            ) : errors ? (
              <MaterialCommunityIcons
                name="close-circle-outline"
                size={23}
                color={nowTheme.COLORS.ERROR}
              />
            ) : value ? (
              <MaterialCommunityIcons
                name="check-circle-outline"
                size={23}
                color={nowTheme.COLORS.SUCCESS}
              />
            ) : null}
          </Block>
        </Block>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "90%",
    color: nowTheme.COLORS.MUTED,
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginLeft: 10
  },
  icon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    width: "100%",
    fontSize: 14,
    color: nowTheme.COLORS.TEXT,
    paddingTop: 6,
  },
  rightIconStyles: {
    alignSelf: "center",
  },
});
