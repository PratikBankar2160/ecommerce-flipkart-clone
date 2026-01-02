import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyOrder.css";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const userId = localStorage.getItem("userId");

    const formatOrderDate = (date) => {
        if (!date) return "Date not available";

        return new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };


    useEffect(() => {
        axios
            .get(`http://localhost:8080/orders/user/${userId}`)
            .then(res => setOrders(res.data))
            .catch(() => alert("Failed to load orders"));
    }, [userId]);

    return (
        <div className="container my-orders-page mt-4">
            <h3 className="mb-4 fw-bold">
                <i className="bi bi-bag-check-fill text-primary me-2"></i>
                My Orders
            </h3>

            {orders.length === 0 ? (
                <div className="empty-orders">
                    <i className="bi bi-box-seam"></i>
                    <p>No orders found</p>
                </div>
            ) : (
                orders.map(order => (
                    <div key={order.id} className="order-card">
                        <div className="order-header">
                            <div>
                                <h5>
                                    <i className="bi bi-receipt me-2"></i>
                                    Order #{order.id}
                                </h5>

                                <p className="order-date">
                                    <i className="bi bi-calendar-event me-1"></i>
                                    {formatOrderDate(order.order_date)}
                                </p>
                            </div>

                            {/* <span className={`order-status ${order.status.toLowerCase()}`}>
                {order.status}
              </span> */}
                            <span className={`order-status ${order.status.toLowerCase()}`}>
                                {order.status === "PLACED" && <i className="bi bi-clipboard-check"></i>}
                                {order.status === "PAID" && <i className="bi bi-credit-card"></i>}
                                {order.status === "SHIPPED" && <i className="bi bi-truck"></i>}
                                {order.status === "OUT_FOR_DELIVERY" && <i className="bi bi-geo-alt"></i>}
                                {order.status === "DELIVERED" && <i className="bi bi-check-circle-fill"></i>}
                                {order.status === "CANCELLED" && <i className="bi bi-x-circle-fill"></i>}
                                {order.status.replaceAll("_", " ")}
                            </span>

                        </div>

                        {/* ITEMS */}
                        {order.items.map((item, index) => (
                            <div className="order-item-row" key={index}>
                                <div className="item-name">
                                    <i className="bi bi-box"></i>
                                    {item.product.name}
                                </div>

                                <div className="item-qty">
                                    Qty: {item.quantity}
                                </div>

                                <div className="item-price">
                                    ₹{item.price}
                                </div>
                            </div>
                        ))}

                        <div className="d-flex justify-content-between align-items-center mb-2 total-amount-row">
                            <span className="fw-semibold text-muted">
                                Total Amount
                            </span>

                            <span className="order-total">
                                <i className="bi bi-currency-rupee me-1"></i>
                                {order.totalAmount}
                            </span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default MyOrders;
