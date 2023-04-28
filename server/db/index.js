const conn = require("./conn");
const User = require("./User");
const Product = require("./Product");
const Order = require("./Order");
const LineItem = require("./LineItem");

Order.belongsTo(User);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);
LineItem.belongsTo(Product);

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [admin, moe, lucy, larry, foo, bar, bazz, ethyl] = await Promise.all([
    User.create({ username: "admin", password: "123" }),

    User.create({ username: "moe", password: "123" }),
    User.create({ username: "lucy", password: "123" }),
    User.create({ username: "larry", password: "123" }),
    Product.create({ name: "foo" }),
    Product.create({ name: "bar" }),
    Product.create({ name: "bazz" }),
    User.create({ username: "ethyl", password: "123" }),
  ]);

  // Cart for Ethyl
  const ethylCart = await ethyl.getCart();
  await ethyl.addToCart({ product: bazz, quantity: 3 });
  await ethyl.addToCart({ product: foo, quantity: 2 });

  // Cart for Moe
  const moeCart = await moe.getCart();
  await moe.addToCart({ product: bar, quantity: 1 });
  await moe.addToCart({ product: foo, quantity: 3 });

  // Cart for Larry
  const larryCart = await larry.getCart();
  await larry.addToCart({ product: foo, quantity: 2 });
  await larry.addToCart({ product: bar, quantity: 1 });

  // Cart for Lucy
  const lucyCart = await lucy.getCart();
  await lucy.addToCart({ product: bazz, quantity: 3 });
  await lucy.addToCart({ product: foo, quantity: 1 });

  return {
    users: {
      admin,
      moe,
      lucy,
      larry,
    },
    products: {
      foo,
      bar,
      bazz,
    },
  };
};

module.exports = {
  syncAndSeed,
  User,
  Product,
};
