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

import { nowTheme } from "../../constants/";
import { Button } from "../../components";

import { Context as AuthContext } from "../context/AuthContext";
import { Context as UserContext } from "../context/UserContext";
import { Context as OfferContext } from "../context/OfferContext";

const { width, height } = Dimensions.get("screen");
function fn(text, count) {
  return text.slice(0, count) + (text.length > count ? "..." : "");
}

function ShippingScreen({ navigation }) {
  const { state: authState } = useContext(AuthContext);
  const { state: userState, addShippingData } = useContext(UserContext);
  const { state: offerState, addShipping } = useContext(OfferContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSelected, setSelected] = useState(0);
  useStatusBar("dark-content");
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Select a shipping address</Text>
      <FlatList
        data={userState.user.shipping}
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
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.address}>{item.streetAddressLine1}</Text>
                  <Text style={styles.address}>
                    {item.addressCity}, {item.addressState} {item.postalCode}
                  </Text>
                  <Text style={styles.address}>{item.country}</Text>
                </Block>
              </Block>
              {isSelected == item.id && (
                <Block>
                  <Button
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                      addShipping(userState.user.shipping[item.id]);
                      navigation.navigate("Payment");
                    }}
                    full
                    round
                    title="Deliver to this address"
                  />
                  <Button
                    onPress={() =>
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                    }
                    full
                    round
                    title="Edit address"
                  />
                  <Button
                    onPress={() =>
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                    }
                    full
                    round
                    title="Add delivery instructions"
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
              onPress={() =>
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
              }
            >
              <Block row space="between">
                <Text style={styles.footer}>Add a new address</Text>

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
  );
}
export default ShippingScreen;
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
});
