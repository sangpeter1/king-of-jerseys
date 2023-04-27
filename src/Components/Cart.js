import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItemFromCart, checkout } from "../store/cart"; // make sure this path is correct
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
      <button onClick={() => dispatch(checkout())}>Checkout</button>
      <button onClick={()=>{navigate("/products")}}>Add Items To Cart</button>
    </div>
  );
};

export default Cart;
