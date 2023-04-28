const express = require("express");
const { Product, conn } = require("../db"); // Import conn from db file
const app = express.Router();

module.exports = app;

app.get("/", async (req, res, next) => {
  try {
    res.send(await Product.findAll());
  } catch (ex) {
    next(ex);
  }
});

// for creating new products
app.post("/", async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).send(product);
  } catch (ex) {
    next(ex);
  }
});
