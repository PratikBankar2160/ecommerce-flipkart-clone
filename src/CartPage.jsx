import React, { useEffect, useState } from "react";
import axios from "axios";
import CartItem from "./CartItem";
import "./CartPage.css";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const cartId = userId;
  const [cart, setCart] = useState(null);

  let navigate = useNavigate();

  const checkout = async () => {
  await axios.post(
    // `http://localhost:8080/orders/checkout/${userId}`
    `http://localhost:8080/orders/checkout/${userId}/${cartId}`
  );

  alert("Order placed successfully");
  navigate("/my-orders"); // 🔁 redirect
};


  // Fetch cart from backend
  const fetchCart = () => {
    axios
      .get(`http://localhost:8080/cart/${userId}`)
      .then((res) => setCart(res.data))
      .catch(() => alert("Failed to load cart"));
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  if (!cart) {
    return <h3 className="text-center mt-5">Loading Cart...</h3>;
  }

  // Cart calculations
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalOldPrice = cart.items.reduce(
    (sum, item) => sum + item.oldPrice * item.quantity,
    0
  );
  const youSaved = totalOldPrice - cart.totalAmount;

  return (
    <div className="container mt-4">
      <div className="row g-4">

        {/* LEFT SIDE - Items */}
        <div className="col-md-8">
          <h4 className="mb-3 fw-bold d-flex align-items-center">
            <i className="bi bi-cart-fill me-2 fs-4 text-primary"></i>
            My Cart ({totalItems} items)
          </h4>

          {cart.items.map((item) => (
            <CartItem key={item.itemId} item={item} setCart={setCart} />
          ))}
        </div>

        {/* RIGHT SIDE - Summary */}
        <div className="col-md-4">
          <div className="cart-summary card shadow-sm p-4 rounded-3">
            
            {/* Heading with Icon */}
            <h5 className="mb-3 fw-bold border-bottom pb-2 d-flex align-items-center">
              <i className="bi bi-currency-rupee me-2 fs-5 text-success"></i>
              PRICE DETAILS
            </h5>

            {/* Price Info */}
            <div className="d-flex justify-content-between mb-2">
              <span>Total Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span>Total Amount</span>
              <span>₹{cart.totalAmount}</span>
            </div>

            <hr />

            {/* Savings */}
            <h6 className="text-success d-flex align-items-center">
              <i className="bi bi-patch-check-fill me-2"></i>
              You saved ₹{youSaved}
            </h6>

            {/* Place Order Button */}
            <button className="btn btn-warning w-100 mt-3 fw-bold shadow-sm" onClick={checkout}>
              <i className="bi bi-bag-check me-2"></i>
              Place Order
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartPage;
