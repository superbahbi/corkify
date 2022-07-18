import createDataContext from "./createDataContext";
const offerReducer = (state, action) => {
  switch (action.type) {
    case "fetch_offer":
      return { ...state, offer: action.payload };
    case "add_to_cart":
      return { ...state, cart: action.payload };
    case "add_shipping":
      return { ...state, shipping: action.payload };
    case "add_payment":
      return { ...state, payment: action.payload };
    case "reset_data":
      return { offer: {}, cart: false, shipping: {}, payment: "" };
    default:
      return state;
  }
};

const addOffer = (dispatch) => async (data) => {
  dispatch({ type: "fetch_offer", payload: data });
};
const addToCart = (dispatch) => async (data) => {
  dispatch({ type: "add_to_cart", payload: true });
};
const addShipping = (dispatch) => async (data) => {
  dispatch({ type: "add_shipping", payload: data });
};
const addPayment = (dispatch) => async (data) => {
  dispatch({ type: "add_payment", payload: data });
};
const resetData = (dispatch) => async () => {
  dispatch({ type: "reset_data" });
};
export const { Provider, Context } = createDataContext(
  offerReducer,
  { addOffer, addToCart, addShipping, addPayment, resetData },
  { offer: {}, cart: false, shipping: {}, payment: "" }
);
