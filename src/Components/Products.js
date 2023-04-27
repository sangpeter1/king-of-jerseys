import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { addProductToCart } from '../store';
import {useNavigate} from "react-router-dom";


const Products = () => {
  const { products } = useSelector(state => state);
  const dispatch = useDispatch();
  
  const handleAdd = (product) => {
    dispatch(addProductToCart(product));
  }
  return (
    <div>
      <ul>
        {
          products.map( product => {
            return(
              <li key={product.id}>
                {product.name}
                <button onClick={()=>{handleAdd(product)}}>Add Item To Cart</button>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
};

export default Products;

