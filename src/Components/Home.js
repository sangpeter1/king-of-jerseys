import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const _logout = ()=> {
    dispatch(logout());
    navigate('/login');
  }

  return (
    <div>
      <div>
        <h1>Welcome {auth.username}!!</h1>
        <button className="logout-btn" onClick={() => _logout()}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
