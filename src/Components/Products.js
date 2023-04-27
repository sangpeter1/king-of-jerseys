import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Products = () => {
  const { products } = useSelector(state => state);
  return (
    <div>
      <ul>
        {
          products.map( product => {
            return(
              <li key={product.id}>
                {product.name}
              </li>
            )
          })
        }
      </ul>
    </div>
  );
};

export default Products;

