import React, { useContext, useState, useEffect, useRef } from "react";
import { StyleSheet, Dimensions, Modal, Pressable } from "react-native";
import * as Haptics from "expo-haptics";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Block, Text } from "galio-framework";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { nowTheme } from "../../constants/";
import { Button, Form, FormButton, FormField } from "../../components";
import { firebase } from "../firebase/config";

import { Context as AuthContext } from "../context/AuthContext";
import { Context as UserContext } from "../context/UserContext";
const { width, height } = Dimensions.get("screen");
function fn(text, count) {
  return text.slice(0, count) + (text.length > count ? "..." : "");
}
function ShippingScreen({ navigation }) {
  const { state: authState } = useContext(AuthContext);
  const { state: userState, addShippingData } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSelected, setSelected] = useState(0);
  return (
    <Block flex center>
      <Block flex={0.9} style={styles.container}>
        <Modal transparent={true} animationType={"none"} visible={modalVisible}>
          <Block style={styles.modalBackground}>
            <KeyboardAwareScrollView>
              <Block style={styles.modalView}>
                <Form
                  initialValues={{
                    streetAddressLine1: "",
                    streetAddressLine2: "",
                    addressState: "",
                    addressCity: "",
                    postalCode: "",
                  }}
                  // validationSchema={validationSchema}
                  onSubmit={(values) => {
                    addShippingData(authState.uid, values);
                    setModalVisible(false);
                  }}
                >
                  <Block style={{ position: "absolute", right: 0, margin: 15 }}>
                    <Pressable
                      onPress={() => {
                        setModalVisible(false);
                      }}
                    >
                      <MaterialCommunityIcons
                        name="close-circle-outline"
                        size={30}
                        color={nowTheme.COLORS.PRIMARY}
                      />
                    </Pressable>
                  </Block>

                  <Text style={styles.heading}>Shipping information</Text>
                  <FormField
                    name="streetAddressLine1"
                    placeholder="Address line 1"
                    keyboardType="default"
                    textContentType="streetAddressLine1"
                    returnKeyType="next"
                    autoFocus={true}
                    blurOnSubmit={false}
                  />
                  <FormField
                    name="streetAddressLine2"
                    placeholder="Address line 2"
                    keyboardType="default"
                    textContentType="streetAddressLine2"
                    returnKeyType="next"
                    blurOnSubmit={false}
                  />

                  <FormField
                    name="addressCity"
                    placeholder="City"
                    keyboardType="default"
                    textContentType="addressCity"
                    returnKeyType="next"
                  />
                  <FormField
                    name="postalCode"
                    placeholder="ZIP"
                    keyboardType="default"
                    textContentType="postalCode"
                    returnKeyType="next"
                  />

                  <FormField
                    name="addressState"
                    placeholder="State"
                    keyboardType="default"
                    textContentType="addressState"
                    returnKeyType="done"
                  />
                  <Block center>
                    <FormButton center title={"Save"} />
                  </Block>
                </Form>
              </Block>
            </KeyboardAwareScrollView>
          </Block>
        </Modal>

        <Block style={styles.cardContainer}>
          <Text style={styles.title}>Select your delivery address</Text>
          {userState.user.shipping &&
            userState.user.shipping.map((item, index) => {
              return (
                <Pressable
                  key={index}
                  onLongPress={() => {
                    console.log("Long Press");
                  }}
                  onPress={() => setSelected(index)}
                >
                  {isSelected === index ? (
                    <Block
                      style={[
                        styles.itemContainer,
                        { backgroundColor: nowTheme.COLORS.PRIMARY },
                      ]}
                    >
                      <Block>
                        {/* <MaterialCommunityIcons
                          name="check-circle-outline"
                          size={24}
                          color={nowTheme.COLORS.WHITE}
                        />
                        <MaterialCommunityIcons
                          name="trash-can-outline"
                          size={24}
                          color={nowTheme.COLORS.WHITE}
                        /> */}
                        <Text
                          style={[
                            styles.addressText,
                            { color: nowTheme.COLORS.WHITE },
                          ]}
                        >
                          {`${fn(item.streetAddressLine1, 14)},`}
                        </Text>
                        <Text
                          style={[
                            styles.addressText,
                            { color: nowTheme.COLORS.WHITE },
                          ]}
                        >
                          {`${fn(item.addressCity, 14)},`}
                        </Text>
                        <Text
                          style={[
                            styles.addressText,
                            { color: nowTheme.COLORS.WHITE },
                          ]}
                        >
                          {`${item.addressState} ${item.postalCode}`}
                        </Text>
                      </Block>
                    </Block>
                  ) : (
                    <Block
                      style={[
                        styles.itemContainer,
                        { backgroundColor: nowTheme.COLORS.WHITE },
                      ]}
                    >
                      <Block>
                        <Block>
                          <Text
                            style={[
                              styles.addressText,
                              { color: nowTheme.COLORS.PRIMARY },
                            ]}
                          >
                            {`${fn(item.streetAddressLine1, 14)},`}
                          </Text>
                          <Text
                            style={[
                              styles.addressText,
                              { color: nowTheme.COLORS.PRIMARY },
                            ]}
                          >
                            {`${fn(item.addressCity, 14)},`}
                          </Text>
                          <Text
                            style={[
                              styles.addressText,
                              { color: nowTheme.COLORS.PRIMARY },
                            ]}
                          >
                            {`${item.addressState} ${item.postalCode}`}
                          </Text>
                        </Block>
                      </Block>
                    </Block>
                  )}
                </Pressable>
              );
            })}

          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              setModalVisible(!modalVisible);
            }}
          >
            <Block
              style={[
                styles.itemContainer,
                {
                  borderStyle: "dashed",
                  backgroundColor: nowTheme.COLORS.WHITE,
                },
              ]}
            >
              <MaterialCommunityIcons
                name="plus-circle-outline"
                size={40}
                color={nowTheme.COLORS.PRIMARY}
              />
              <Text style={styles.addressText}>Add new address</Text>
            </Block>
          </Pressable>
        </Block>
      </Block>
      <Block>
        <Button
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            navigation.navigate("Payment");
          }}
          full
          color="primary"
          round
          title="NEXT"
        />
      </Block>
    </Block>
  );
}
export default ShippingScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 120,
    marginHorizontal: 30,
    // borderWidth: 1,
    height: height * 0.85,
  },
  title: {
    fontSize: 18,
    fontWeight: "400",
    color: nowTheme.COLORS.SECONDARY,
    marginLeft: 15,
  },
  divider: {
    backgroundColor: nowTheme.COLORS.BORDER,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(136, 152, 170, 0.3)",
    marginVertical: 20,
  },
  button: {
    borderRadius: 21.5,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: width * 0.8,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: nowTheme.COLORS.PRIMARY,
    alignSelf: "center",
    justifyContent: "flex-end",
  },
  buttonText: {
    color: nowTheme.COLORS.WHITE,
    fontSize: 14,
    fontWeight: "400",
    textTransform: "uppercase",
  },
  cardContainer: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  itemContainer: {
    borderWidth: 1,
    width: width / 2 - 60,
    borderRadius: nowTheme.SIZES.RADIUS,
    borderColor: nowTheme.COLORS.MUTED,
    // borderStyle: "dotted",
    height: 150,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "#00000040",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "baseline",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  addressText: {
    fontSize: 12,
    color: nowTheme.COLORS.BLACK,
    alignSelf: "flex-start",
  },
  selectedCard: {
    alignSelf: "flex-end",
    position: "absolute",
    top: 0,
    padding: 10,
  },
});
