const conn = require("./conn");
const { BOOLEAN, TEXT, STRING, UUID, UUIDV4 } = conn.Sequelize;

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
});

module.exports = Product;
