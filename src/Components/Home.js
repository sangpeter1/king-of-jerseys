import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";
import { useNavigate } from "react-router-dom";
import Jerseys from "../Images/SportJerseys.jpeg";

const Home = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const _logout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (auth.id) {
    return (
      <div>
        <div>
          <img
            style={{ width: "100%", borderRadius: "5px" }}
            src={Jerseys}
            height={500}
          />
        </div>
      </div>
    );
  } else {
    return <h1>Welcome To Our Store</h1>;
  }
};

export default Home;
