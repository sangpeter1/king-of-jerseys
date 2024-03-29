const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
app.use(express.json());

app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/static", express.static(path.join(__dirname, "../static")));
app.use(cors( {
  origin: 'http://localhost:3000',
}));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../static/index.html"))
);

app.use('/api/auth', require('./api/auth'));
app.use('/api/orders', require('./api/orders'));
app.use('/api/products', require('./api/products'));
// app.use('/api/stripe', require('/api/stripe'));

module.exports = app;
