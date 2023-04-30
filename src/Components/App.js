import React, { useEffect } from "react";
import Home from "./Home";
import Login from "./Login";
import Register from './Register';
import Cart from "./Cart";
import PastOrders from "./PastOrders";
import Profile from "./Profile";
import ViewAllProducts from "./ViewAllProducts"; // Corrected import
import CreateProduct from "./CreateProduct";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  loginWithToken,
  fetchCart,
  addProductToCart,
} from "../store";
import { Link, Routes, Route } from "react-router-dom";

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(loginWithToken());
    dispatch(fetchProducts());
    dispatch(addProductToCart());
  }, []);

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchCart());
    }
  }, [auth]);

  return (
    <div>
      <h1>Acme Shopping</h1>
      {auth.id ?
          <nav>
            <Link to="/">Home</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/past">Past Orders</Link>
            <Link to="/products">Products</Link>
            {/* <Link to="/create">Create Product</Link> */}
          </nav> : 
          <div> 
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link> 
            <Link to="/cart">Cart</Link>
            <Link to="/products">Products</Link>
          </div>
      }
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/past" element={<PastOrders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<ViewAllProducts />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />}/>
        {/* <Route path="/create" element={<CreateProduct />} /> */}
      </Routes>
    </div>
  );
};

export default App;
