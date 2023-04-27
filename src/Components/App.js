<<<<<<< HEAD
import React, { useEffect } from "react";
import Home from "./Home";
import Login from "./Login";
import Cart from "./Cart";
import { useSelector, useDispatch } from "react-redux";
import { loginWithToken, fetchCart } from "../store";
import { Link, Routes, Route } from "react-router-dom";
=======
import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import Cart from './Cart';
import Products from './Products';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken, fetchCart, fetchProducts } from '../store';
import { Link, Routes, Route } from 'react-router-dom';
>>>>>>> main

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithToken());
    dispatch(fetchProducts())
  }, []);

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchCart());
    }
  }, [auth]);

  return (
    <div>
      <h1>Acme Shopping</h1>
<<<<<<< HEAD
      {auth.id ? <Home /> : <Login />}
      {!!auth.id && (
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/cart">Cart</Link>
          </nav>
          <Routes>
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      )}
=======
      {
        auth.id ? 
        <Home /> : <Login />
      }
      {
        !!auth.id  && (
          <div>
            <nav>
              <Link to='/'>Home</Link>
              <Link to='/products'>Products</Link>
              <Link to='/cart'>Cart</Link>
            </nav>
            <Routes>
              <Route path='/cart' element={ <Cart /> } />
              <Route path='/products' element={ <Products /> } />
            </Routes>
          </div>
        )
      }
>>>>>>> main
    </div>
  );
};

export default App;
