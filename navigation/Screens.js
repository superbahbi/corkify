import React, { useContext } from "react";
import { Easing, Animated, Dimensions, LogBox } from "react-native";
import { Context as AuthContext } from "../src/context/AuthContext";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
// screens
import Offer from "../src/screens/OfferScreen";
import Register from "../src/screens/RegisterScreen";
import Login from "../src/screens/LoginScreen";
import Logout from "../src/screens/LogoutScreen";
import Cart from "../src/screens/CartScreen";
import Invite from "../src/screens/InviteScreen";
// import Checkout from "../src/screens/CheckoutScreen";
import Test from "../src/screens/TestScreen";
import OrderConfirmation from "../src/screens/OrderConfirmationScreen";
import Shipping from "../src/screens/ShippingScreen";
import Payment from "../src/screens/PaymentScreen";
import ForgotPassword from "../src/screens/ForgotPasswordScreen";
import StripeWebView from "../src/screens/StripeWebViewScreen";
// drawer
import CustomDrawerContent from "./Menu";
// header for screens
import { Header } from "../components";
import { nowTheme } from "../constants";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const data = {};
function CartStack({ navigation }) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              title=""
              navigation={navigation}
              scene={scene}
              progress={0}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}
function InviteStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Invite"
        component={Invite}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Invite" navigation={navigation} scene={scene} />
          ),
          backgroundColor: "#FFFFFF",
        }}
      />
    </Stack.Navigator>
  );
}
function CheckoutStack({ navigation }) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        // options={{
        //   headerLeft: () => (
        //     <HeaderBackButton
        //       tintColor={nowTheme.COLORS.TEXT}
        //       onPress={() => {
        //         navigation.goBack();
        //       }}
        //     />
        //   ),
        // }}
      />
    </Stack.Navigator>
  );
}
function RegisterStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Account"
        component={Register}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              title=""
              navigation={navigation}
              scene={scene}
              notitle
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}
function LoginStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              title=""
              navigation={navigation}
              scene={scene}
              notitle
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}
function LogoutStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Logout"
        component={Logout}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              title=""
              navigation={navigation}
              scene={scene}
              notitle
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}
function ForgotPasswordStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              title=""
              navigation={navigation}
              scene={scene}
              notitle
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}
function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              white
              title="Profile"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}
function OfferStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Offer"
        component={Offer}
        options={{
          headerTransparent: true,
          header: ({ navigation, scene }) => (
            <Header
              title=""
              navigation={navigation}
              scene={scene}
              transparent
              notitle
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function TestStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Test"
        component={Test}
        options={{
          headerTransparent: true,
          header: ({ navigation, scene }) => (
            <Header
              transparent
              title="Test"
              navigation={navigation}
              scene={scene}
              rightTitle="Cancel"
              bgColor={nowTheme.COLORS.WHITE}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
function ShippingStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Shipping"
        component={Shipping}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              navigation={navigation}
              scene={scene}
              progress={1}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}
function PaymentStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              navigation={navigation}
              scene={scene}
              progress={2}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}
function StripeWebViewStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="StripeWebView"
        component={StripeWebView}
        options={{
          header: ({ navigation, scene }) => <></>,
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}
function OrderConfirmationStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="OrderConfirmation"
        component={OrderConfirmation}
        options={{
          headerTransparent: true,
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              title="Order Confirmation"
              navigation={navigation}
              scene={scene}
              rightTitle="x"
              bgColor={nowTheme.COLORS.WHITE}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default function AppStack(props) {
  const { state, AuthSignOut, clearErrorMessage } = useContext(AuthContext);
  // LogBox.ignoreLogs(["Warning: ..."]);
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={(props, state) => <CustomDrawerContent {...props} />}
      drawerStyle={{
        color: nowTheme.COLORS.PRIMARY,
        backgroundColor: nowTheme.COLORS.PRIMARY,
        width: width * 0.8,
      }}
      drawerContentOptions={{
        activeTintcolor: nowTheme.COLORS.WHITE,
        inactiveTintColor: nowTheme.COLORS.WHITE,
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden",
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal",
        },
      }}
      initialRouteName="Offer"
    >
      <Drawer.Screen name="Offer" component={OfferStack} />
      <Drawer.Screen name="Cart" component={CartStack} />
      <Drawer.Screen name="Invite" component={InviteStack} />
      <Drawer.Screen name="Login" component={LoginStack} />
      <Drawer.Screen name="Logout" component={LogoutStack} />
      <Drawer.Screen name="Signup" component={RegisterStack} />
      {/* <Drawer.Screen name="Checkout" component={CheckoutStack} /> */}
      <Drawer.Screen name="Test" component={TestStack} />
      <Drawer.Screen name="Shipping" component={ShippingStack} />
      <Drawer.Screen name="Payment" component={PaymentStack} />
      <Drawer.Screen name="StripeWebView" component={StripeWebViewStack} />
      <Drawer.Screen name="ForgotPassword" component={ForgotPasswordStack} />
      <Drawer.Screen
        name="OrderConfirmationScreen"
        component={OrderConfirmationStack}
      />
    </Drawer.Navigator>
  );
}
