import axios from "axios";

export const SET_CART = "SET_CART";
export const CHECKOUT = "CHECKOUT";
export const SET_CART_ITEM_COUNT = "SET_CART_ITEM_COUNT";

const cart = (state = { lineItems: [], itemCount: 0 }, action) => {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    case CHECKOUT:
      return { lineItems: [], itemCount: 0 }; // clear the cart after checkout
    case SET_CART_ITEM_COUNT:
      return { ...state, itemCount: action.itemCount };
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

const _guestCheckout = () => {
  return {
    type: CHECKOUT,

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

const localCart = () => {
  let cart = JSON.parse(window.localStorage.getItem("cart"));
  if (!cart) {
    cart = { lineItems: [] };
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
};

const localCartToServer = async () => {
  const cart = localCart();
  const lineItems = cart.lineItems;
  for (let i = 0; i < lineItems.length; i++) {
    const { product, quantity } = lineItems[i];
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
  }
  window.localStorage.removeItem("cart");
};

// functionality to get the cart
export const fetchCart = () => {
  return async (dispatch, getState) => {
    if (getState().auth.id) {
      await localCartToServer();
      const token = window.localStorage.getItem("token");
      const response = await axios.get("/api/orders/cart", {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: SET_CART, cart: response.data });
    } else {
      dispatch({ type: SET_CART, cart: localCart() });
    }
  };
};

export const removeItemFromCart = (product, quantityToRemove) => {
  return async (dispatch, getState) => {
    if (getState().auth.id) {
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
    } else {
      const cart = localCart();
      const lineItem = cart.lineItems.find(
        (lineItem) => lineItem.product.id === product.id
      );
      if (lineItem.quantity !== 0) {
        lineItem.quantity--;
      }

      window.localStorage.setItem("cart", JSON.stringify(cart));
      dispatch(fetchCart());
    }
  };
};

export const addProductToCart = (product) => {
  return async (dispatch, getState) => {
    if (getState().auth.id) {
      const token = window.localStorage.getItem("token");
      const response = await axios.post(
        "/api/orders/cart",
        {
          product,
          quantity: 1,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(fetchCart());
    } else {
      const cart = localCart();
      const lineItem = cart.lineItems.find(
        (lineItem) => lineItem.product.id === product.id
      );
      if (!lineItem) {
        cart.lineItems.push({ product, quantity: 1 });
      } else {
        lineItem.quantity++;
      }
      window.localStorage.setItem("cart", JSON.stringify(cart));
      dispatch(fetchCart());
    }
  };
};

// export const addProductToCart = (product) => {
//   return async (dispatch, getState) => {
//     if (getState().auth.id) {
//       const token = window.localStorage.getItem("token");
//       const response = await axios.post(
//         "/api/orders/cart",
//         {
//           product,
//           quantity: 1,
//         },
//         {
//           headers: {
//             authorization: token,
//           },
//         }
//       );
//       dispatch(fetchCart());
//     } else {
//       const cart = localCart();
//       const lineItem = cart.lineItems.find(
//         (lineItem) => lineItem.product.id === product.id
//       );
//       if (!lineItem) {
//         cart.lineItems.push({ product, quantity: 1 });
//       } else {
//         lineItem.quantity++;
//       }
//       window.localStorage.setItem("cart", JSON.stringify(cart));
//       dispatch(fetchCart());
//     }
//   };
// };

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
