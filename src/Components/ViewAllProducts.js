import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/products"; // change this to your action to fetch all products
import { addProductToCart } from "../store/cart";

const ViewAllProducts = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products); // ensure this corresponds to the products in your redux state

  // This effect will fetch all products when the component mounts
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addProductToCart(product, 1)); // Added quantity parameter
  };

  // Filter products based on search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredProducts.map((product) => {
        return (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <button onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>{" "}
          </div>
        );
      })}
    </div>
  );
};

export default ViewAllProducts;
