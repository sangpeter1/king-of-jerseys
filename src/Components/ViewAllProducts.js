import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createProduct, fetchProducts } from "../store/products";
import { addProductToCart } from "../store/cart";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const ViewAllProducts = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const products = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth); // get the user from auth state
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addProductToCart(product, 1));
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const save = async (ev) => {
    ev.preventDefault();
    await dispatch(createProduct({ name }));
    setName("");
    navigate("/products");
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          style={{ display: !auth.isAdmin ? "none" : "" }}
          variant="success"
          size="lg"
          onClick={handleShow}
        >
          Create
        </Button>
      </div>
      <div className="view-all-products-container">
        {" "}
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
                </Form.Group>

                <Button
                  onClick={handleClose}
                  variant="outline-success"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="product-list-container">
          {filteredProducts.map((product) => {
            return (
              <div className="product-item" key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <img
                    style={{
                      display: !product.image ? "none" : "",
                    }}
                    width="150"
                    height="150"
                    src={product.image}
                  />
                </Link>

                <Link
                  style={{ textDecoration: "none" }}
                  to={`/products/${product.id}`}
                >
                  <h3 style={{ color: " #6c757d", textAlign: "center" }}>
                    {product.name}
                  </h3>
                </Link>

                <Button
                  variant="outline-success"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ViewAllProducts;
