import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItemFromCart, checkout } from "../store/cart";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (product, quantityToRemove) => {
    dispatch(removeItemFromCart(product, quantityToRemove));
  };

  const handleCheckout = () => {
    dispatch(checkout());
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Cart</h1>
      {cart.lineItems.map((item) => (
        <div key={item.id} className="cart-item">
          <img
            style={{
              display: !item.product.image ? "none" : "",
            }}
            width="100"
            height="100"
            src={item.product.image}
          />
          <span className="cart-item-name">
            {item.product.name} - {item.quantity}
          </span>

          <button
            className="cart-remove-btn"
            onClick={() => handleRemove(item.product, 1)}
          >
            Remove 1
          </button>
          <button
            className="cart-remove-btn"
            onClick={() => handleRemove(item.product, item.quantity)}
          >
            Remove All
          </button>
        </div>
      ))}
      <div className="cart-buttons">
        <button className="cart-btn" onClick={handleCheckout}>
          Checkout
        </button>
        <button
          className="add-to-cart-btn"
          onClick={() => {
            navigate("/products");
          }}
        >
          Add Items To Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
