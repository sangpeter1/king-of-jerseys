import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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
    <>
      <div>
        <h1>Update Profile</h1>
      </div>
      <div style={{ marginTop: "1rem" }}>
        <Form onSubmit={_update}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
            />
          </Form.Group>
          <Button
            disabled={username === auth.username}
            variant="success"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Profile;
