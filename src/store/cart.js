import axios from "axios";

export const SET_CART = "SET_CART";
export const CHECKOUT = "CHECKOUT";

const cart = (state = { lineItems: [] }, action) => {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    case CHECKOUT:
      return { lineItems: [] }; // clear the cart after checkout
    default:
      return state;
  }
};

const _checkout = (order) => {
  return {
    type: CHECKOUT,
    order,
  };
};

// functionality to get the cart
export const fetchCart = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.get("/api/orders/cart", {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: SET_CART, cart: response.data });
  };
};

// functionality to remove items from cart
export const removeItemFromCart = (product, quantityToRemove) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.put(
      "/api/orders/cart",
      {
        product,
        quantityToRemove,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch({ type: SET_CART, cart: response.data });
  };
};

export const addProductToCart = (product, quantity) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.post(
      "/api/orders/cart",
      {
        product,
        quantity,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch({ type: SET_CART, cart: response.data });
  };
};

export const checkout = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const { data: order } = await axios.post(
      "/api/orders/checkout",
      {},
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch(_checkout(order));
    alert("Checkout successful!");
    dispatch({ type: "CLEAR_CART" }); // clear the cart after checkout
  };
};

export default cart;
