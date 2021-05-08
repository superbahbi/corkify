import React from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { nowTheme } from "../constants";

export default class Loader extends React.Component {
  componentDidMount() {
    this.animation.play();
  }

  render() {
    return (
      <View style={styles.animationContainer}>
        <LottieView
          ref={(animation) => {
            this.animation = animation;
          }}
          style={{
            // width: 400,
            height: 100,
            backgroundColor: nowTheme.COLORS.PRIMARY,
          }}
          source={require("../assets/wineglasslottie.json")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});
