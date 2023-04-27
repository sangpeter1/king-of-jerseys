import axios from "axios";

const products = (state = [], action) => {
  if (action.type === "SET_PRODUCTS") {
    return action.products;
  }
  return state;
};

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/products");
      dispatch({ type: "SET_PRODUCTS", products: response.data });
    } catch (error) {
      console.error("Error fetching products:", error);
      // dispatch an error action here if we want to handle in Redux Store
      // dispatch({ type: 'SET_PRODUCTS_ERROR', error });
    }
  };
};

export default products;
