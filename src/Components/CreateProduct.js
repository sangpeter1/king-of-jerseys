import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/products";
import { addProductToCart } from "../store/cart";
import CreateProduct from "./CreateProduct";

const ViewAllProducts = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addProductToCart(product, 1));
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="view-all-products-container">
      <CreateProduct />
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="product-list-container">
        {filteredProducts.map((product) => {
          return (
            <div className="product-item" key={product.id}>
              <h3>{product.name}</h3>
              <button onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewAllProducts;
