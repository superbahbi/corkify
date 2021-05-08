import createDataContext from "./createDataContext";
import {
  getToken,
  firebaseGetToken,
  firebaseGetUser,
  firebaseLogin,
  firebaseSignOut,
  firebaseSignUp,
  firebaseAddData,
  firebasePasswordReset,
} from "../api/firebase";
import { API_URL } from "@env";
import * as RootNavigation from "../navigationRef";
const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload, token: null };
    case "store_data":
      return {
        ...state,
        errorMessage: "",
        token: action.token,
        expirationTime: action.expirationTime,
        refreshToken: action.refreshToken,
        uid: action.uid,
        is_logged_in: action.is_logged_in,
      };
    case "loading":
      return { loading: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "sign_out":
      return {
        token: null,
        errorMessage: "",
        uid: "",
        is_logged_in: false,
      };
    case "is_logged":
      return { ...state, is_logged_in: action.payload };
    default:
      return state;
  }
};
const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};
const AuthSignUp = (dispatch) => async (values) => {
  try {
    const response = await firebaseSignUp(values);
    const url = `${API_URL}/${createCustomer}`;
    if (response.user.uid) {
      const token = await firebaseGetToken();

      const customer = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => response.json());
      const data = {
        id: response.user.uid,
        email: values.email,
        name: values.name,
        stripe_id: customer.id,
        shipping: [],
        billing: [],
      };
      await firebaseAddData(response.user.uid, data);
      dispatch({
        type: "store_data",
        uid: response.user.uid,
        token,
        is_logged_in: true,
      });
    } else {
    }
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with registration",
    });
  }
};

const AuthLogIn = (dispatch) => async (
  { resetForm },
  uid,
  accessToken,
  expirationTime,
  refreshToken
) => {
  try {
    if (uid) {
      dispatch({
        type: "store_data",
        uid: uid,
        token: accessToken,
        expirationTime: expirationTime,
        refreshToken: refreshToken,
        is_logged_in: true,
      });
    }
  } catch (err) {
    resetForm({});
    console.log(err);
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in",
    });
  }
};
const AuthSignOut = (dispatch) => async () => {
  dispatch({ type: "sign_out" });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    AuthLogIn,
    AuthSignUp,
    AuthSignOut,
    clearErrorMessage,
  },
  {
    errorMessage: "",
    uid: "",
    token: "",
    expirationTime: "",
    refreshToken: "",
    is_logged_in: false,
  }
);
