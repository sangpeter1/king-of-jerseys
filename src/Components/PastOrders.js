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
      {orders.map((order) => (
        <div key={order.id}>{/* display the order details */}</div>
      ))}
    </div>
  );
};

export default PastOrders;
