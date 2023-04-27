import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItemFromCart, checkout } from "../store/cart"; // make sure this path is correct
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleRemove = (product, quantityToRemove) => {
    dispatch(removeItemFromCart(product, quantityToRemove));
  };

  const handleCheckout = () => {
    dispatch(checkout());
  };

  return (
    <div>
      <h1>Cart</h1>
      {cart.lineItems.map((item) => (
        <div key={item.id}>
          <span>
            {item.product.name} - {item.quantity}
          </span>
          <button onClick={() => handleRemove(item.product, 1)}>
            Remove 1
          </button>
          <button onClick={() => handleRemove(item.product, item.quantity)}>
            Remove All
          </button>
        </div>
      ))}
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default Cart;
