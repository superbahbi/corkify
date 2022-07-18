import createDataContext from "./createDataContext";
import { firebaseUpdateData, firebaseGetUser } from "../api/firebase";
import { API_URL } from "@env";
const userReducer = (state, action) => {
  switch (action.type) {
    case "user_data":
      return { ...state, user: action.payload };
    case "remove_user_data":
      return { ...state, user: {}, payment: {}, stripe_session: "" };
    case "shipping_data":
      return { ...state, user: action.payload };
    case "payment_method":
      return { ...state, payment: action.payload };
    case "customer_session":
      return { ...state, stripe_session: action.payload };
    default:
      return state;
  }
};

const addUserData = (dispatch) => async (user) => {
  dispatch({ type: "user_data", payload: user });
};
const UserRemoveData = (dispatch) => () => {
  dispatch({ type: "remove_user_data" });
};
const addShippingData = (dispatch) => async (uid, values) => {
  const data = {
    streetAddressLine1: values.streetAddressLine1,
    streetAddressLine2: values.streetAddressLine2,
    addressState: values.addressState,
    addressCity: values.addressCity,
    postalCode: values.postalCode,
  };
  await firebaseUpdateData(uid, data, "shipping");
  // dispatch({ type: "shipping_data" });
};
const getStripeCard = (dispatch) => async (customer_id, token) => {
  const url = `${API_URL}/customers/${customer_id}`;
  const payment_method = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.json());
  dispatch({ type: "payment_method", payload: payment_method });
};
const getStripeSessionID = (dispatch) => async (token, data) => {
  const url = `${API_URL}/createSessionID`;
  const session = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
  dispatch({ type: "customer_session", payload: session.id });
};
export const { Provider, Context } = createDataContext(
  userReducer,
  {
    addUserData,
    UserRemoveData,
    addShippingData,
    getStripeCard,
    getStripeSessionID,
  },
  { user: {}, payment: {}, stripe_session: "" }
);
