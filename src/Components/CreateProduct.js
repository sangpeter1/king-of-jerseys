import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../store/products";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(createProduct({ name }));
    setName("");
  };

  return (
    <div className="create-product-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a new product..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="add-product=btn" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
