import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Product = () => {
  const { id } = useParams();
  const { products } = useSelector((state) => state);

  return (
    <div>
      {products
        .filter((product) => product.id === id)
        .map((product) => {
          return (
            <div key={product.id}>
              <h1>{product.name}</h1>
            </div>
          );
        })}
    </div>
  );
};

export default Product;
