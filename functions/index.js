"use strict";

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// const language = require('@google-cloud/language');
// const client = new language.LanguageServiceClient();
const express = require("express");
const fetch = require("node-fetch");
const app = express();
const stripe = require("stripe")(functions.config().stripe.secret_key);

const authenticate = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    res.status(403).send("Unauthorized api version 0.1");
    return;
  }
  const idToken = req.headers.authorization.split("Bearer ")[1];
  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedIdToken;
    next();
    return;
  } catch (e) {
    res.status(403).send("Unauthorized api version 0.1");
    return;
  }
};

app.use(authenticate);

app.get("/", async (req, res) => {
  res.status(200).json("v0.1");
});

app.post("/createPaymentIntent", async (req, res) => {
  const { amount } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
app.post("/createSessionID", async (req, res) => {
  const { customer_id } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "setup",
    customer: customer_id,
    success_url:
      "https://us-central1-corkify-41a8d.cloudfunctions.net/api/success?sc_checkout=success&sc_sid={CHECKOUT_SESSION_ID}",
    cancel_url:
      "https://us-central1-corkify-41a8d.cloudfunctions.net/api/cancel?sc_checkout=cancel",
  });

  res.json({ id: session.id });
});

app.get("/customers/:id", async (req, res) => {
  const id = req.params.id;
  const paymentMethods = await stripe.paymentMethods.list({
    customer: id,
    type: "card",
  });
  res.json({ data: paymentMethods.data });
});
exports.api = functions.https.onRequest(app);

//  // POST /api/messages
//  // Create a new message, get its sentiment using Google Cloud NLP,
//  // and categorize the sentiment before saving.
//  app.post('/messages', async (req, res) => {
//     const message = req.body.message;
//     try {
//       const results = await client.analyzeSentiment({document: message});
//       const category = categorizeScore(results[0].documentSentiment.score);
//       const data = {message: message, sentiment: results, category: category};
//       const snapshot = await admin.database().ref(`/users/${req.user.uid}/messages`).push(data);
//       const val = snapshot.val();
//       res.status(201).json({message: val.message, category: val.category});
//     } catch(error) {
//       console.log('Error detecting sentiment or saving message', error.message);
//       res.sendStatus(500);
//     }
//   });

//   // GET /api/messages?category={category}
//   // Get all messages, optionally specifying a category to filter on
//   app.get('/messages', async (req, res) => {
//     const category = req.query.category;
//     let query = admin.database().ref(`/users/${req.user.uid}/messages`);

//     if (category && ['positive', 'negative', 'neutral'].indexOf(category) > -1) {
//       // Update the query with the valid category
//       query = query.orderByChild('category').equalTo(category);
//     } else if (category) {
//       res.status(404).json({errorCode: 404, errorMessage: `category '${category}' not found`});
//       return;
//     }
//     try {
//       const snapshot = await query.once('value');
//       let messages = [];
//       snapshot.forEach((childSnapshot) => {
//         messages.push({key: childSnapshot.key, message: childSnapshot.val().message});
//       });

//       res.status(200).json(messages);
//     } catch(error) {
//       console.log('Error getting messages', error.message);
//       res.sendStatus(500);
//     }
//   });

//   // GET /api/message/{messageId}
//   // Get details about a message
//   app.get('/message/:messageId', async (req, res) => {
//     const messageId = req.params.messageId;
//     try {
//       const snapshot = await admin.database().ref(`/users/${req.user.uid}/messages/${messageId}`).once('value');
//       if (!snapshot.exists()) {
//         return res.status(404).json({errorCode: 404, errorMessage: `message '${messageId}' not found`});
//       }
//       return res.set('Cache-Control', 'private, max-age=300');
//     } catch(error) {
//       console.log('Error getting message details', messageId, error.message);
//       return res.sendStatus(500);
//     }
//   });
