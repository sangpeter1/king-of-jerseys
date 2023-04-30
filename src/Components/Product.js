import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addProductToCart } from "../store/cart";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

const Product = () => {
  const { id } = useParams();
  const { products, auth } = useSelector((state) => state);
  const [Reviews, setReviews] = useState("");
  const [Reviews_, setReviews_] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (ev) => {
    setReviews(ev.target.value);
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    await setReviews_([Reviews, ...Reviews_]);
  };

  const handleAddToCart = (product) => {
    dispatch(addProductToCart(product, 1));
  };

  return (
    <>
      <div className="view-all-products-container">
        {products
          .filter((product) => product.id === id)
          .map((product) => {
            return (
              <>
                <div className="view-all-products-container" key={product.id}>
                  <h1>{product.name}</h1>
                  <img
                    style={{
                      display: !product.image ? "none" : "",
                    }}
                    width="400"
                    height="400"
                    src={product.image}
                  />
                  <button
                    style={{ margin: "1rem" }}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>

                <div style={{ margin: "2rem" }}>
                  <Form onSubmit={onSubmit}>
                    <Form.Group
                      className="mb-3"
                      controlId="inputGroup-sizing-lg"
                    >
                      <Form.Label>My Review</Form.Label>
                      <Form.Control
                        value={Reviews}
                        as="textarea"
                        rows={5}
                        placeholder="I love this product because..."
                        onChange={onChange}
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>

                  <div className="view-all-products-container">
                    <h3>Reviews</h3>
                    <Card
                      style={{
                        display: !product.review ? "none" : "",
                        width: "18rem",
                        margin: "1rem",
                      }}
                    >
                      <Card.Body>
                        <Card.Text>{product.review}</Card.Text>
                      </Card.Body>
                    </Card>
                    {Reviews_.map((item) => (
                      <Card style={{ width: "18rem", margin: "1rem" }}>
                        <Card.Body>
                          <Card.Text>{item}</Card.Text>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default Product;
