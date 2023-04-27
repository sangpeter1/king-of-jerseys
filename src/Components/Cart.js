import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';
import { Link } from 'react-router-dom';

const Cart = ()=> {
  const { cart } = useSelector(state => state);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {
          cart.lineItems.map(item => {
            return(
              <li key={item.id}>
                {item.product.name}
              </li>
            )
          })
        }
      </ul>    
    </div>
  );
};

export default Cart;
