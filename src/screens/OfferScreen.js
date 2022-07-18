import React, { useState, useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import useStatusBar from "../../hooks/useStatusBar";
import * as Haptics from "expo-haptics";
import { Block, Text } from "galio-framework";
import { getOffer } from "../api/firebase";

// Local components
import { Offer, Loader, Button } from "../../components";
import { nowTheme } from "../../constants";

// Context
import { Context as AuthContext } from "../context/AuthContext";
import { Context as UserContext } from "../context/UserContext";
import { Context as OfferContext } from "../context/OfferContext";

const OfferScreen = ({ navigation }) => {
  useStatusBar("light-content");
  const [isLoading, setLoading] = useState(true);
  const { state: authState } = useContext(AuthContext);
  const { state: userState } = useContext(UserContext);
  const {
    state: offerState,
    addOffer,
    addToCart,
    resetData,
  } = useContext(OfferContext);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      if (!offerState?.id) {
        setLoading(true);
        // await resetData();
        let offer;
        try {
          offer = await getOffer();
        } catch (error) {
          console.log(error);
        } finally {
          addOffer(offer);
          setLoading(false);
        }
      }
    });
    return unsubscribe;
  }, [navigation]);
  if (isLoading) {
    return <Loader size="large" color={nowTheme.COLORS.WHITE} />;
  }
  return (
    <Block flex center style={styles.offer}>
      <Block flex>
        <Offer item={offerState?.offer} full />
      </Block>

      <Block style={styles.footer}>
        <Block middle row style={{}}>
          <Block row middle style={styles.footerItem}>
            <Block flex center>
              <Block style={{ flexDirection: "row" }}>
                <Text
                  style={[{ fontSize: 20, lineHeight: 30 }, styles.footerText]}
                >
                  ${parseInt(offerState.offer?.originalPrice)}
                </Text>
                <Text style={{ fontSize: 10, lineHeight: 18 }}>
                  {offerState.offer?.originalPrice.toString().substr(-2)}
                </Text>
              </Block>
              <Text>Retail</Text>
            </Block>
          </Block>
          <Block row middle style={styles.footerItem}>
            <Block flex center>
              <Block style={{ flexDirection: "row" }}>
                <Text
                  style={[{ fontSize: 20, lineHeight: 30 }, styles.footerText]}
                >
                  ${parseInt(offerState.offer?.webPrice)}
                </Text>
                <Text style={{ fontSize: 10, lineHeight: 18 }}>
                  {offerState.offer?.webPrice.toString().substr(-2)}
                </Text>
              </Block>
              <Text>Web</Text>
            </Block>
          </Block>
          <Block row middle style={styles.footerItem}>
            <Block flex center>
              <Block style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 20, lineHeight: 30 }}>
                  ${parseInt(offerState.offer?.ourPrice)}
                </Text>
                <Text style={{ fontSize: 10, lineHeight: 18 }}>
                  {offerState.offer?.ourPrice.toString().substr(-2)}
                </Text>
              </Block>
              <Text>Corkify</Text>
            </Block>
          </Block>
          <Block>
            <Button
              title="Purchase"
              round
              size={20}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                navigation.navigate(authState.uid ? "Cart" : "Login");
              }}
            />
          </Block>
        </Block>
      </Block>
    </Block>
  );
};
const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: nowTheme.COLORS.PRIMARY,
    width: "100%",
  },
  offer: {
    marginTop: -20,
    width: "100%",
    backgroundColor: nowTheme.COLORS.WHITE,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: nowTheme.COLORS.WHITE,
    height: 80,
  },
  footerItem: {
    width: nowTheme.SIZES.BASE * 3,
    height: nowTheme.SIZES.BASE * 3,
    marginHorizontal: 10,
  },
  footerText: {
    textDecorationColor: nowTheme.COLORS.PRIMARY,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
  item: {
    width: "100%",
    fontFamily: "montserrat-regular",
    paddingBottom: 100,
  },
});

export default OfferScreen;
