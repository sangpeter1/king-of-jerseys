import React, { useEffect } from "react";
import Home from "./Home";
import Login from "./Login";
import Cart from "./Cart";
import PastOrders from "./PastOrders";
import { useSelector, useDispatch } from "react-redux";
import { loginWithToken, fetchCart, fetchProducts } from "../store";
import { Link, Routes, Route } from "react-router-dom";

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithToken());
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchCart());
    }
  }, [auth]);

  return (
    <div>
      <h1>Acme Shopping</h1>
      {auth.id ? <Home /> : <Login />}
      {!!auth.id && (
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/past">Past Orders</Link>
          </nav>
          <Routes>
            <Route path="/cart" element={<Cart />} />
            <Route path="/past" element={<PastOrders />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
