import React, { useEffect, useState } from "react";
import axios from "axios";

const PastOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = window.localStorage.getItem("token");
      const response = await axios.get("/api/orders/past", {
        headers: {
          authorization: token,
        },
      });
      setOrders(response.data);
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Past Orders</h1>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} className="order-box">
            <h2>Order ID: {order.id}</h2>
            <p>Order Date: {new Date(order.createdAt).toLocaleString()}</p>
            <h3>Items:</h3>
            <ul>
              {order.lineItems.map((item) => (
                <li key={item.id}>
                  {item.product.name} - Quantity: {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <h3 style={{ textAlign: "center" }}>No past orders.</h3>
      )}
    </div>
  );
};

export default PastOrders;
