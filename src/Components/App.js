import React, { useEffect } from "react";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Cart from "./Cart";
import PastOrders from "./PastOrders";
import Profile from "./Profile";
import Product from "./Product";
import ViewAllProducts from "./ViewAllProducts"; // Corrected import
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  loginWithToken,
  fetchCart,
  addProductToCart,
  logout,
} from "../store";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const { auth, cart } = useSelector((state) => state); // get cart state from the store
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loginWithToken());
    dispatch(fetchProducts());
    if (auth.id) {
      dispatch(addProductToCart());
    }
  }, []);

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchCart());
    }
  }, [auth]);

  const _logout = () => {
    dispatch(logout());
    navigate("/login");
  };

  let totalQuantity = 0;
  function getQuantityOfItems() {
    for (let i = 0; i < cart.lineItems.length; i++) {
      const item = cart.lineItems[i];
      totalQuantity += item.quantity;
    }
  }

  getQuantityOfItems();

  return (
    <div>
      <h1>Acme Shopping</h1>
      {auth.id ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignContent: "space-evenly",
            alignItems: "baseline",
            gap: ".5rem",
            margin: "1%",
          }}
        >
          Welcome,{" "}
          <Link
            style={{ textDecoration: "none", color: "green" }}
            to="/profile"
          >
            {" "}
            {auth.username}!
          </Link>
          <Link to="/cart">
            <FontAwesomeIcon
              style={{ color: "#30b03f" }}
              icon={faCartShopping}
              size="xl"
            />
          </Link>
          {totalQuantity}
          <Button variant="warning" size="sm" onClick={() => _logout()}>
            Logout
          </Button>
        </div>
      ) : (
        ""
      )}
      {auth.id ? (
        <nav>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/past">Past Orders</Link>
        </nav>
      ) : (
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
        </nav>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/past" element={<PastOrders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<ViewAllProducts />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
