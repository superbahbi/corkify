import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import React, { useState } from "react";
import { Image, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Block, GalioProvider } from "galio-framework";
import Screens from "./navigation/Screens";
import { Images, nowTheme } from "./constants";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as UserProvider } from "./src/context/UserContext";
import { Provider as OfferProvider } from "./src/context/OfferContext";
import { navigationRef } from "./src/navigationRef";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
// cache app images
const assetImages = [Images.CardFront, Images.CardBack];
function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
export default function App() {
  const [loading, setLoading] = useState(false);
  const [fontLoading, setFontLoading] = useState(false);

  _loadResourcesAsync = async () => {
    await Font.loadAsync({
      "montserrat-regular": require("./assets/font/Montserrat-Regular.ttf"),
      "montserrat-bold": require("./assets/font/Montserrat-Bold.ttf"),
    });

    setFontLoading(true);
    return Promise.all([...cacheImages(assetImages)]);
  };

  _handleLoadingError = (error) => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    if (fontLoading) {
      setLoading(true);
    }
  };
  return loading === false ? (
    <AppLoading
      startAsync={_loadResourcesAsync}
      onFinish={_handleFinishLoading}
      onError={_handleLoadingError}
    />
  ) : (
    <AuthProvider>
      <UserProvider>
        <OfferProvider>
          <NavigationContainer ref={navigationRef}>
            <GalioProvider theme={nowTheme}>
              <Block flex>
                <Screens />
              </Block>
            </GalioProvider>
          </NavigationContainer>
        </OfferProvider>
      </UserProvider>
    </AuthProvider>
  );
}
