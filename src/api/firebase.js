import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

import firebaseConfig from "./config";
// Initialize Firebase App

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();

export const loginWithEmail = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const registerWithEmail = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export const logout = () => auth.signOut();

export const passwordReset = (email) => auth.sendPasswordResetEmail(email);

export const getUserData = (uid) =>
  db
    .collection("users")
    .doc(uid)
    .get()
    .then((response) => response.data());

export const getOffer = () =>
  db
    .collection("offer")
    .doc("current")
    .get()
    .then((response) => response.data());

export const getToken = () => {
  return auth.currentUser.getIdToken(true).then((response) => response);
};

const firebaseSignUp = (values) => {
  const { name, email, password } = values;
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((response) => response);
};
const firebaseLogin = (values) => {
  const { email, password } = values;
  console.log(email, password);
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((response) => response);
};
const firebaseGetUser = (uid) => {
  return firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .get()
    .then((response) => response.data());
};
const firebaseGetToken = () => {
  return firebase
    .auth()
    .currentUser.getIdToken(true)
    .then((response) => response);
};
const firebaseAddData = (uid, data) => {
  const usersRef = firebase.firestore().collection("users");
  usersRef
    .doc(uid)
    .set(data)
    .then(() => {
      console.log("Data added!");
    });
};
const firebaseUpdateData = (uid, data, field) => {
  console.log(uid);
  const updateRef = firebase.firestore().collection("users").doc(uid);
  console.log(updateRef);
  updateRef
    .update({ shipping: firebase.firestore.FieldValue.arrayUnion(data) })
    .then(() => {
      console.log("Data updated!");
    });
};
const firebasePasswordReset = (values) => {
  firebase
    .auth()
    .sendPasswordResetEmail(values.email)
    .then(() => console.log("Email sent"));
};
const firebaseSignOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => console.log("User signed out!"));
};
const firebaseVerifyToken = () => {
  firebase
    .auth()
    .currentUser.getIdToken(true)
    .then((response) => response);
};
const example = (data) => {
  const card = {
    "card[number]": data.creditCardNumber,
    "card[exp_month]": data.month,
    "card[exp_year]": data.year,
    "card[cvc]": data.cvc,
    "card[name]": data.nameOnCard,
    "card[address_city]": data.address_city,
    "card[address_state]": data.address_state,
    "card[address_zip]": data.address_zip,
    "card[address_line1]": data.address_line1,
    "card[address_line2]": data.address_line2,
  };
  return fetch("https://api.stripe.com/v1/tokens", {
    headers: {
      // Use the correct MIME type for your server
      Accept: "application/json",
      // Use the correct Content Type to send data to Stripe
      "Content-Type": "application/x-www-form-urlencoded",
      // Use the Stripe publishable key as Bearer
      Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`,
    },
    // Use a proper HTTP method
    method: "post",
    // Format the credit card data to a string of key-value pairs
    // divided by &
    body: Object.keys(card)
      .map((key) => key + "=" + card[key])
      .join("&"),
  }).then((response) => response.json());
};
export {
  firebaseLogin,
  firebaseGetUser,
  firebaseGetToken,
  firebaseSignOut,
  firebaseSignUp,
  firebaseAddData,
  firebasePasswordReset,
  firebaseVerifyToken,
  firebaseUpdateData,
  example,
};
