import createDataContext from "./createDataContext";
import firestore from '@react-native-firebase/firestore'
// import { confirmCardPayment } from '../api/stripe' 
const offerReducer = (state, action) => {
  switch (action.type) {
    case "add_to_cart":
      return { ...state, cart: action.payload}
    case "fetch_offer":
      return { ...state, offer: action.payload }
    case "current_cart":
      return { ...state, totalPrice: action.payload}
    case "process_payment":
      return { ...state, payRequestConfirmation: action.payload }
    case "client_secret":
      return { ...state, clientSecret: action.payload }
    case "add_user":
      return { ...state, user: action.payload }
    case "add_token":
      return { ...state, token: action.payload }
    case "get_session_id":
      return { ...state, sessionID: action.payload }
    default:
      return state;
  }
};
const addToCart = (dispatch) => async () =>{
    dispatch({ type: "add_to_cart", payload: true});
}
const fetchOffer = (dispatch) => async () => {

    const usersRef = firestore().collection('offer')
    usersRef
    .doc("offer1")
    .get()
    .then(firestoreDocument => {
        if (!firestoreDocument.exists) {
            console.log("Account does not exist.")
            return;
        }
        dispatch({ type: "fetch_offer", payload: firestoreDocument.data() });
    })
    .catch(error => {
      console.log(error)
    });
}
const currentCart = (dispatch) => async(price) => {
  dispatch({ type: "current_cart", payload: price})
}
const payRequest = (dispatch) => async(values, clientSecret) => {
  const data = {
    creditCardNumber: values.creditCardNumber, 
    month: values.expMonth, 
    year: values.expYear, 
    cvc: values.cvc, 
    nameOnCard: values.cardName,
    address_city: values.addressCity,
    address_state: values.addressState,
    address_zip: values.postalCode,
    address_line1: values.streetAddressLine1,
    address_line2: values.streetAddressLine2
  }

  // confirmCardPayment( clientSecret, data)
  
  // console.log(clientSecret)
  dispatch({ type: "process_payment", payload: values})
}
const paymentIntent = (dispatch) => async(token, totalPrice) =>{
  fetch("http://192.168.1.101:5001/corkify-41a8d/us-central1/api/createPaymentIntent", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify({amount: parseInt(totalPrice * 100)})
  })
  .then(res => {
    return res.json()
  })
  .then(data => {
    dispatch({ type: "client_secret", payload: data})
  });
}
const addUser = (dispatch) => async(user) => {
  dispatch({ type: "add_user", payload: user})
}
const addToken = (dispatch) => async(token) => {
  dispatch({ type: "add_token", payload: token})
}
const getSessionID = (dispatch) => async(token) => {
  fetch("http://192.168.1.101:5001/corkify-41a8d/us-central1/api/createSessionID", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    // body: JSON.stringify({amount: parseInt(totalPrice * 100)})
  })
  .then(res => {
    return res.json()
  })
  .then(data => {
    dispatch({ type: "get_session_id", payload: data})
  });
}
export const { Context, Provider } = createDataContext(
    offerReducer,
  {
    fetchOffer, addToCart, currentCart, payRequest, paymentIntent, addUser, addToken, getSessionID
  }, { offer: {}, cart: false, payRequestConfirmation: {}, user: {}, clientSecret: {}, sessionID:{}}
);