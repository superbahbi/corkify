import React from "react";
import { withNavigation } from "@react-navigation/compat";
import * as Haptics from "expo-haptics";
import StepIndicator from "react-native-step-indicator";
import { StyleSheet, Platform, Dimensions } from "react-native";
import { Block, NavBar, theme, Button as GaButton } from "galio-framework";

import { nowTheme } from "../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const { height, width } = Dimensions.get("window");
const iPhoneX = () =>
  Platform.OS === "ios" &&
  (height === 812 || width === 812 || height === 896 || width === 896);

class Header extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    return back ? navigation.goBack() : navigation.openDrawer();
  };
  render() {
    const {
      back,
      title,
      white,
      transparent,
      bgColor,
      iconColor,
      titleColor,
      navigation,
      progress,
      notitle,
      ...props
    } = this.props;

    const navbarStyles = [
      styles.navbar,
      bgColor && { backgroundColor: bgColor },
    ];
    const customStyles = {
      stepIndicatorSize: 15,
      currentStepIndicatorSize: 20,
      separatorStrokeWidth: 3,
      currentStepStrokeWidth: 0,
      stepStrokeCurrentColor: nowTheme.COLORS.PRIMARY, // outside border current
      stepStrokeWidth: 4,
      stepStrokeUnFinishedColor: nowTheme.COLORS.PRIMARY,
      stepStrokeFinishedColor: nowTheme.COLORS.PRIMARY, // outside border done
      stepStrokeUnFinishedColor: nowTheme.COLORS.PRIMARY, // unfinsh inside fill
      stepIndicatorCurrentColor: nowTheme.COLORS.PRIMARY,
      separatorFinishedColor: nowTheme.COLORS.PRIMARY, // finish line
      separatorUnFinishedColor: nowTheme.COLORS.PRIMARY, // unfinsh line
      stepIndicatorFinishedColor: nowTheme.COLORS.WHITE, // finish inside fill
      stepIndicatorUnFinishedColor: nowTheme.COLORS.WHITE, //unfinish inside fill
      stepIndicatorLabelFontSize: 0,
      currentStepIndicatorLabelFontSize: 0,
      stepIndicatorLabelCurrentColor: "transparent",
      stepIndicatorLabelFinishedColor: "transparent",
      stepIndicatorLabelUnFinishedColor: "transparent",
    };
    return (
      <Block>
        <NavBar
          back={false}
          title={
            progress !== null && !title && !notitle ? (
              <Block style={styles.progress}>
                <StepIndicator
                  customStyles={customStyles}
                  currentPosition={progress}
                  stepCount={4}
                />
              </Block>
            ) : (
              title
            )
          }
          style={navbarStyles}
          transparent={transparent}
          left={
            <MaterialCommunityIcons
              name={back ? "arrow-left" : "format-align-justify"}
              size={26}
              onPress={this.handleLeftPress}
              color={
                iconColor ||
                (white ? nowTheme.COLORS.WHITE : nowTheme.COLORS.TEXT)
              }
            />
          }
          titleStyle={[
            styles.title,
            { color: nowTheme.COLORS[white ? "WHITE" : "PRIMARY"] },
            titleColor && { color: titleColor },
          ]}
          {...props}
        />
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  title: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "montserrat-regular",
  },
  progress: {
    width: "70%",
    marginTop: -1,
  },
});

export default withNavigation(Header);
