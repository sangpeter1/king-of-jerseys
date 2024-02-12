require('dotenv').config()
const express = require("express");
const app = express.Router();
const { User } = require("../db");
const STRIPE = process.env.STRIPE;
const stripe = require('stripe')(STRIPE);
const PORT = 'http://localhost:3000';

app.post("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.createOrder());
  } catch (ex) {
    next(ex);
  }
});

app.get("/cart", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.getCart());
  } catch (ex) {
    next(ex);
  }
});

app.post("/cart", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.addToCart(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.put("/cart", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.removeFromCart(req.body));
  } catch (ex) {
    next(ex);
  }
});

// route to checkout
// app.post("/checkout", async (req, res, next) => {
//   try {
//     const user = await User.findByToken(req.headers.authorization);
//     const order = await user.checkout();
//     res.send(order);
//   } catch (ex) {
//     next(ex);
//   }
// });

app.post('/checkout', async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1OB02eCHRL8kzvfyOO7QfEOZ',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${PORT}?success=true`,
      cancel_url: `${PORT}?canceled=true`,
      automatic_tax: {enabled: true},
    });
    res.json({ url: session.url });

  } catch (ex) {
    next(ex);
  }
});

// route to get past orders
app.get("/past", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const pastOrders = await user.getPastOrders();
    res.send(pastOrders);
  } catch (ex) {
    next(ex);
  }
});

module.exports = app;
