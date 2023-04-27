import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store';

const Cart = ()=> {
  const { cart } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      <button onClick={()=>{navigate("/products")}}>Add Items To Cart</button>
    </div>
  );
};

export default Cart;
