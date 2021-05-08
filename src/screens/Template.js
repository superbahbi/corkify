import React, { useContext, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Modal,
  Pressable,
} from "react-native";
import { Context as OfferContext } from "../context/store";
import { Block, Text, theme, Card } from "galio-framework";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { nowTheme } from "../../constants/";
import {
  Button,
  Form,
  FormButton,
  FormField,
  FormErrorMessage,
} from "../../components";

const { width, height } = Dimensions.get("screen");

function truncator(numToTruncate, intDecimalPlaces) {
  var numPower = Math.pow(10, intDecimalPlaces);
  return ~~(numToTruncate * numPower) / numPower;
}
const ShippingScreen = ({ navigation }) => {
  const { state } = useContext(OfferContext);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Block flex center>
      <Block flex style={styles.container}>
        <Modal transparent={true} animationType={"none"} visible={modalVisible}>
          <Block style={styles.modalBackground}>
            <Block style={styles.modalView}>
              <Form
                initialValues={{
                  streetAddressLine1: "",
                  streetAddressLine2: "",
                  addressState: "",
                  addressCity: "",
                  postalCode: "",
                  addressState: "",
                }}
                // validationSchema={validationSchema}
                onSubmit={(values) => handleOnSubmit(values)}
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
                  group
                  start
                  name="streetAddressLine1"
                  placeholder="Address line 1"
                  keyboardType="default"
                  textContentType="streetAddressLine1"
                  returnKeyType="next"
                />
                <FormField
                  group
                  name="streetAddressLine2"
                  placeholder="Address line 2"
                  keyboardType="default"
                  textContentType="streetAddressLine2"
                  returnKeyType="next"
                />

                <FormField
                  group
                  name="addressCity"
                  placeholder="City"
                  keyboardType="default"
                  textContentType="addressCity"
                  returnKeyType="next"
                />
                <FormField
                  group
                  name="postalCode"
                  placeholder="ZIP"
                  keyboardType="default"
                  textContentType="postalCode"
                  returnKeyType="next"
                />

                <FormField
                  group
                  end
                  name="addressState"
                  placeholder="State"
                  keyboardType="default"
                  textContentType="addressState"
                  returnKeyType="next"
                />

                <Block center>
                  <FormButton center title={"Save"} />
                </Block>
              </Form>
            </Block>
          </Block>
        </Modal>

        <Block flex={1} style={{ borderWidth: 1 }}>
          <Text style={styles.title}>Pay Corkify</Text>
        </Block>
        {/* <Block style={styles.divider} /> */}
        {/* <Block flex={0.1}></Block>

          <Block flex={0.3}></Block> */}
        <Block>
          <Pressable
            onPress={() => {
              navigation.navigate("Shipping");
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>NEXT</Text>
          </Pressable>
        </Block>
      </Block>
    </Block>
  );
};
export default ShippingScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 120,
    marginHorizontal: 30,
    borderWidth: 1,
    height: height * 0.85,
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
    color: nowTheme.COLORS.TEXT,
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
  },
  buttonText: {
    color: nowTheme.COLORS.WHITE,
    fontSize: 14,
    fontWeight: "400",
    textTransform: "uppercase",
  },
});
