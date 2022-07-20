import React, { useContext, useState, useEffect } from "react";
import {
  Dimensions,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import useStatusBar from "../../hooks/useStatusBar";
import * as Haptics from "expo-haptics";

import { Block } from "galio-framework";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Images, nowTheme } from "../../constants/";
import { Button, CreditCard } from "../../components";

import { Context as AuthContext } from "../context/AuthContext";
import { Context as UserContext } from "../context/UserContext";
import { Context as OfferContext } from "../context/OfferContext";

const { width, height } = Dimensions.get("screen");

const PaymentScreen = ({ navigation }) => {
  const { state: authState } = useContext(AuthContext);
  const {
    state: userState,
    getStripeCard,
    getStripeSessionID,
  } = useContext(UserContext);
  const { state: offerState, addPayment } = useContext(OfferContext);
  const [isSelected, setSelected] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      await getStripeCard(userState.user.stripe_id, authState.token);
    });
    return unsubscribe;
  }, [navigation]);
  useStatusBar("dark-content");
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Select a payment method</Text>
      <FlatList
        data={userState.payment.data}
        renderItem={({ item }) => (
          <Block>
            <Pressable onPress={() => setSelected(item.id)} style={styles.item}>
              <Block row>
                <Block style={styles.leftIcon}>
                  {isSelected == item.id ? (
                    <MaterialCommunityIcons
                      name="check-circle-outline"
                      size={24}
                      color={nowTheme.COLORS.PRIMARY}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="circle-outline"
                      size={24}
                      color={nowTheme.COLORS.PRIMARY}
                    />
                  )}
                </Block>
                <Block>
                  <CreditCard
                    key={item.id}
                    id={item.id}
                    type={item.card.brand.toUpperCase()}
                    imageFront={Images.CardFront}
                    imageBack={Images.CardBack}
                    shiny={false}
                    bar={false}
                    focused={false}
                    number={item.card.last4}
                    name={item.billing_details.name}
                    exp_month={item.card.exp_month}
                    exp_year={item.card.exp_year}
                    isSelected={isSelected}
                    onPress={() => setSelected(item.id)}
                  />
                </Block>
              </Block>
              {isSelected == item.id && (
                <Block>
                  <Button
                    onPress={async () => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                      await addPayment(isSelected);
                      // navigation.navigate("Test");
                    }}
                    full
                    round
                    title="Continue"
                  />
                </Block>
              )}
            </Pressable>
          </Block>
        )}
        keyExtractor={(item) => item.id}
        ListFooterComponent={
          <Block
            style={{
              borderWidth: 1,
              borderColor: "#CED0CE",
              marginHorizontal: 10,

              backgroundColor: nowTheme.COLORS.WHITE,
            }}
          >
            <TouchableOpacity
              style={{
                paddingVertical: 20,
              }}
              onPress={async () => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                // await getStripeSessionID(authState.token, {
                //   customer_id: userState.user.stripe_id,
                // });
                navigation.navigate("StripeWebView", {
                  screen: "StripeWebView",
                  params: { session: userState.stripe_session },
                });
              }}
            >
              <Block row space="between">
                <Text style={styles.footer}>Add a new card</Text>

                <MaterialCommunityIcons
                  style={styles.footer}
                  name="arrow-right"
                  size={24}
                  color={nowTheme.COLORS.PRIMARY}
                />
              </Block>
            </TouchableOpacity>
          </Block>
        }
      />
    </SafeAreaView>
    // <Block flex center>
    //   <Block flex={0.9} style={styles.container}>
    //     <Block flex style={styles.cardContainer}>
    //       <Text style={styles.title}>Select your payment method</Text>
    //       <Block row flex={0.3} style={styles.itemContainer}>
    //         <ScrollView
    //           horizontal={true}
    //           decelerationRate={0}
    //           snapToInterval={200} //your element width
    //           snapToAlignment={"center"}
    //         >
    //           {userState.payment.data?.map((item, index) => {
    //             return (
    //               <CreditCard
    //                 key={index}
    //                 id={item.id}
    //                 type={item.card.brand.toUpperCase()}
    //                 imageFront={Images.CardFront}
    //                 imageBack={Images.CardBack}
    //                 shiny={false}
    //                 bar={false}
    //                 focused={false}
    //                 number={item.card.last4}
    //                 name={item.billing_details.name}
    //                 exp_month={item.card.exp_month}
    //                 exp_year={item.card.exp_year}
    //                 isSelected={isSelected}
    //                 onPress={() => setSelected(item.id)}
    //               />
    //             );
    //           })}
    //         </ScrollView>
    //       </Block>
    //       <Block>
    //         <Button
    //           round
    //           full
    //           title="Add new card"
    //           icon="card-plus-outline"
    //           onPress={async () => {
    //             Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    //             // await getStripeSessionID(authState.token, {
    //             //   customer_id: userState.user.stripe_id,
    //             // });
    //             navigation.navigate("StripeWebView", {
    //               screen: "StripeWebView",
    //               params: { session: userState.stripe_session },
    //             });
    //           }}
    //         />
    //       </Block>
    //     </Block>
    //   </Block>
    //   <Block>
    //     <Button
    //       onPress={() => {
    //         Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    //         navigation.navigate("Shipping");
    //       }}
    //       full
    //       color="primary"
    //       round
    //       title="PROCESSED FOR PAYMENT"
    //     />
    //   </Block>
    // </Block>
  );
};
export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 90,
    marginHorizontal: 5,
  },
  item: {
    backgroundColor: nowTheme.COLORS.WHITE,
    borderColor: nowTheme.COLORS.BORDER,
    borderWidth: 0.5,
    padding: 20,
    marginHorizontal: 10,
  },
  leftIcon: {
    marginRight: 10,
    alignSelf: "center",
  },
  header: {
    color: nowTheme.COLORS.SECONDARY,
    fontSize: 24,
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "500",
    color: nowTheme.COLORS.SECONDARY,
  },
  address: {
    fontSize: 14,
    textTransform: "uppercase",
    color: nowTheme.COLORS.SECONDARY,
  },
  footer: {
    paddingHorizontal: 30,
    fontSize: 18,
    fontWeight: "600",
    color: nowTheme.COLORS.SECONDARY,
  },
  // container: {
  //   marginTop: 120,
  //   marginHorizontal: 30,
  //   height: height * 0.85,
  // },
  // title: {
  //   fontSize: 18,
  //   fontWeight: "400",
  //   color: nowTheme.COLORS.SECONDARY,
  // },
  // divider: {
  //   backgroundColor: nowTheme.COLORS.BORDER,
  //   borderBottomWidth: StyleSheet.hairlineWidth,
  //   borderColor: "rgba(136, 152, 170, 0.3)",
  //   marginVertical: 20,
  // },
  // button: {
  //   borderRadius: 21.5,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   padding: 10,
  //   width: width * 0.8,
  //   marginTop: 10,
  //   marginBottom: 10,
  //   backgroundColor: nowTheme.COLORS.PRIMARY,
  //   alignSelf: "center",
  // },
  // buttonText: {
  //   color: nowTheme.COLORS.WHITE,
  //   fontSize: 14,
  //   fontWeight: "400",
  //   textTransform: "uppercase",
  // },
  // cardContainer: {
  //   marginLeft: 15,
  // },
  // itemContainer: {
  //   marginTop: 10,
  // },
  // modalBackground: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginTop: 22,
  //   backgroundColor: "#00000040",
  // },
  // modalView: {
  //   margin: 20,
  //   backgroundColor: "white",
  //   borderRadius: 20,
  //   padding: 35,
  //   alignItems: "baseline",
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5,
  // },
  // addressText: {
  //   fontSize: 12,
  //   color: nowTheme.COLORS.BLACK,
  //   marginHorizontal: 10,
  // },
});
