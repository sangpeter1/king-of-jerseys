const conn = require("./conn");
const { BOOLEAN, INTEGER, TEXT, STRING, UUID, UUIDV4 } = conn.Sequelize;

const Product = conn.define("product", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  review: {
    type: TEXT,
  },
  image: {
    type: TEXT,
  },

  price: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 4000,
  }
});

module.exports = Product;
