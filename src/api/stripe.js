const STRIPE_ERROR = "Payment service error. Try again later.";
const SERVER_ERROR = "Server error. Try again later.";
const STRIPE_PUBLISHABLE_KEY =
  "pk_test_51INshdA9dfpX7QKvbUw2t586S7OXFOZAh3IMYVcLYgl6f5zYK9mpE0TjYejWI7x4DCyiiokUBV13VcbxntTBDLy5003NboIrft";

const getCreditCardToken = (data) => {
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

const subscribeUser = (creditCardToken) => {
  return new Promise((resolve) => {
    console.log("Credit card token\n", creditCardToken);
    setTimeout(() => {
      resolve({ status: true });
    }, 1000);
  });
};
const confirmCardPayment = (clientSecret, data) => {
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

  stripe
    .confirmCardPayment(client, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: "Jenny Rosen",
        },
      },
    })
    .then(function (result) {
      // Handle result.error or result.paymentIntent
    });

  // return fetch('https://api.stripe.com/v1/charges', {
  //   headers: {
  //     // Use the correct MIME type for your server
  //     Accept: 'application/json',
  //     // Use the correct Content Type to send data to Stripe
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     // Use the Stripe publishable key as Bearer
  //     Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`
  //   },
  //   // Use a proper HTTP method
  //   method: 'post',
  //   // Format the credit card data to a string of key-value pairs
  //   // divided by &
  //   body: Object.keys(card)
  //     .map(key => key + '=' + card[key])
  //     .join('&')
  // }).then(response => response.json());
};
export { getCreditCardToken, subscribeUser, confirmCardPayment };
