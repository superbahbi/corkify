import React, { useContext } from "react";
import { ScrollView, StyleSheet, Dimensions, Platform } from "react-native";
import * as Haptics from "expo-haptics";
import { Block, theme } from "galio-framework";
import { useSafeArea } from "react-native-safe-area-context";
import { DrawerItem as DrawerCustomItem, Icon } from "../components";
import nowTheme from "../constants/Theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Context as AuthContext } from "../src/context/AuthContext";
const { width } = Dimensions.get("screen");
const headerMarginIcon = Platform.OS === "android" ? 25 : 40;
const headerMarginXbtn = Platform.OS === "android" ? -30 : -30;

function CustomDrawerContent({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  ...rest
}) {
  const insets = useSafeArea();
  const { state: authState } = useContext(AuthContext);

  const screens = [];
  screens.push("Offer");
  screens.push("Invite");
  if (authState?.uid) {
    screens.push("Account");
    screens.push("Logout");
  } else {
    screens.push("Login");
    screens.push("Signup");
  }

  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block style={styles.header}>
        <MaterialCommunityIcons
          style={styles.logo}
          name="fruit-grapes"
          size={35}
          color={nowTheme.COLORS.WHITE}
        />
        <Block right style={styles.headerIcon}>
          <MaterialCommunityIcons
            style={styles.logo}
            name="close"
            size={15}
            color={nowTheme.COLORS.WHITE}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              navigation.closeDrawer();
            }}
          />
        </Block>
      </Block>
      <Block flex style={styles.menu}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          })}
          <Block
            flex
            style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}
          >
            <Block
              style={{
                borderColor: "white",
                width: "93%",
                borderWidth: StyleSheet.hairlineWidth,
                marginHorizontal: 10,
              }}
            />
          </Block>
          <DrawerCustomItem title="Terms" navigation={navigation} />
          <DrawerCustomItem title="Privacy" navigation={navigation} />
          <DrawerCustomItem title="Accessibility" navigation={navigation} />
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingRight: 0,
    paddingLeft: 40,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: headerMarginIcon,
    justifyContent: "center",
  },
  headerIcon: {
    marginTop: headerMarginXbtn,
  },
  logo: {
    height: 40,
    width: 40,
  },
  menu: {
    paddingLeft: 8,
    paddingRight: 14,
  },
});

export default CustomDrawerContent;
