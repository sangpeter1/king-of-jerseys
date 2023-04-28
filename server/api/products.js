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

// search for product by name
app.get("/search", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        name: {
          [conn.Sequelize.Op.iLike]: "%" + req.query.q + "%", // Use the iLike operator for case-insensitive search
        },
      },
    });
    res.send(products);
  } catch (ex) {
    next(ex);
  }
});
