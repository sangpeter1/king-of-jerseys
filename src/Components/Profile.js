import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { auth } = useSelector((state) => state);
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.id) {
      setUsername(auth.username);
    }
  }, [auth]);

  const _update = async (ev) => {
    ev.preventDefault();
    dispatch(updateAuth({ username }));
  };

  return (
    <form onSubmit={_update}>
      <label>Username</label>
      <input
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />

      <button disabled={username === auth.username}>Update</button>
    </form>
  );
};

export default Profile;
