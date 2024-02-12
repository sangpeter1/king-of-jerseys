require('dotenv').config()
const conn = require("./conn");
const User = require("./User");
const Product = require("./Product");
const Order = require("./Order");
const LineItem = require("./LineItem");
const STRIPE = process.env.STRIPE;
const stripe = require('stripe')(STRIPE);

Order.belongsTo(User);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);
LineItem.belongsTo(Product);

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [admin, moe, lucy, larry, ethyl] = await Promise.all([
    User.create({ username: "admin", password: "123", isAdmin: true }), // set isAdmin to true for the admin user
    User.create({ username: "moe", password: "123" }),
    User.create({ username: "lucy", password: "123" }),
    User.create({ username: "larry", password: "123" }),
    User.create({ username: "ethyl", password: "123" }),
  ]);
  const [hurts] = await Promise.all([
    Product.create({
      name: "Jalen Hurts Philadelphia Eagles Nike Legend Jersey",
      review: "Amazing!",
      image: "static/images/jalenhurts.avif",
      price:  6999,
    }),
  ]);
  const [rodgers] = await Promise.all([
    Product.create({
      name: "Aaron Rodgers New York Jets Nike Game Jersey",
      review: "One of the best I found!",
      image: "static/images/aaronrodgers.avif",
      price: 6599
    }),
  ]);
  const [brunson] = await Promise.all([
    Product.create({
      name: "Jalen Brunson New York Knicks Jersey",
      review: "My dad will love it!",
      image: "static/images/jalenbrunson.webp",
      price: 8999
    }),
  ]);
  const [jeter] = await Promise.all([
    Product.create({
      name: "Derek Jeter New York Yankees Nike 2020 Hall of Fame Induction Home Replica Player Name Jersey",
      review: "Great addition to my collection",
      image: "static/images/jeter.avif",
      price: 7549
    }),
  ]);
  const [kane] = await Promise.all([
    Product.create({
      name: "Patrick Kane New York Rangers Authentic Home Jersey",
      review: "Looks even better in person!",
      image: "static/images/kane.avif",
      price: 8899
    }),
  ]);
  const [messi] = await Promise.all([
    Product.create({
      name: "Lionel Messi Argentina National Team adidas 2022 Winners Home Jersey",
      review: "A must have for any fan",
      image: "static/images/messi.webp",
      price: 8599
    }),
  ]);
  const [mahomes] = await Promise.all([
    Product.create({
      name: "Patrick Mahomes Kansas City Chiefs Nike Super Bowl LVII Patch Game Jersey",
      review: "MVP",
      image: "static/images/mahomes.avif",
      price: 9199
    }),
  ]);
  const [lebron] = await Promise.all([
    Product.create({
      name: "LeBron James Los Angeles Lakers Jordan Brand 2022-23 Statement Edition Swingman Jersey",
      review: "My 55th Lebron jersey and I don't regret it!",
      image: "static/images/lebron.webp",
      price: 6999,
    }),
  ]);
  const [ovechkin] = await Promise.all([
    Product.create({
      name: "Alexander Ovechkin Washington Capitals Authentic Home Jersey",
      review: "Quality with comfort, highly recommend",
      image: "static/images/ovechkin.jpeg",
      price: 8499,
    }),
  ]);
  
  // Cart for Ethyl
  const ethylCart = await ethyl.getCart();
  await ethyl.addToCart({
    product: rodgers,
    quantity: 3,
  });
  await ethyl.addToCart({
    product: brunson,
    quantity: 2,
  });

  // Cart for Moe
  const moeCart = await moe.getCart();
  await moe.addToCart({ product: kane, quantity: 1 });
  await moe.addToCart({ product: brunson, quantity: 3 });

  // Cart for Larry
  const larryCart = await larry.getCart();
  await larry.addToCart({ product: rodgers, quantity: 2 });
  await larry.addToCart({ product: jeter, quantity: 1 });

  // Cart for Lucy
  const lucyCart = await lucy.getCart();
  await lucy.addToCart({ product: jeter, quantity: 3 });
  await lucy.addToCart({ product: hurts, quantity: 1 });

  return {
    users: {
      admin,
      moe,
      lucy,
      larry,
    },
    products: {
      hurts,
      rodgers,
      brunson,
      jeter,
      kane,
      messi,
      mahomes,
      lebron,
      ovechkin,
    },
  };
};

module.exports = {
  syncAndSeed,
  User,
  Product,
};
