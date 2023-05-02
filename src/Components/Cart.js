import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItemFromCart, checkout } from "../store/cart";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Cart = () => {
  const { cart, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (product, quantityToRemove) => {
    dispatch(removeItemFromCart(product, quantityToRemove));
  };

  const handleCheckout = () => {
    dispatch(checkout());
  };

  console.log(cart.lineItems);

  return (
    <div className="cart-container">
      <h1 className="cart-title">Cart</h1>
      {auth.id && cart.id
        ? cart.lineItems.map((item) => (
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

              <Button
                style={{ margin: ".1rem" }}
                variant="danger"
                size="sm"
                onClick={() => handleRemove(item.product, 1)}
              >
                Remove 1
              </Button>
              <Button
                style={{ margin: ".1rem" }}
                size="sm"
                variant="danger"
                onClick={() => handleRemove(item.product, item.quantity)}
              >
                Remove All
              </Button>
            </div>
          ))
        : null}
      <div className="cart-buttons">
        <Button variant="success" onClick={handleCheckout}>
          Checkout
        </Button>
        <Button
          variant="success"
          onClick={() => {
            navigate("/products");
          }}
        >
          Add Items To Cart
        </Button>
      </div>
    </div>
  );
};

export default Cart;
