import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProductToCart, createProduct } from "../store";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const Products = () => {
  const { products } = useSelector((state) => state);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const handleAdd = (product) => {
    dispatch(addProductToCart(product));
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const save = async (ev) => {
    ev.preventDefault();
    try {
      await dispatch(createProduct({ name }));
      setName("");
      setErrors[[]];
    } catch (ex) {
      setErrors(ex.response.data.error.errors);
    }
    navigate("/products");
  };

  return (
    <>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <Form onSubmit={save}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                />
                <Button
                  onClick={handleClose}
                  variant="outline-success"
                  type="submit"
                >
                  Submit
                </Button>
                <ul>
                  {errors.map((error, idx) => {
                    return <li key={idx}>{error.message}</li>;
                  })}
                </ul>
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
      <div>
        <ul>
          {products.map((product) => {
            return (
              <li key={product.id}>
                {product.name}
                <button
                  onClick={() => {
                    handleAdd(product);
                  }}
                >
                  Add Item To Cart
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Products;
