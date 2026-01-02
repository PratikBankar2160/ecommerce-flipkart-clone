import React, { useEffect, useState } from "react";
import axios from "axios";
import CartItem from "./CartItem";
import "./CartPage.css";

const CartPage = () => {

  const userId = JSON.parse(localStorage.getItem("userId"));

  const [cart, setCart] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/cart/${userId}`)
      .then(res => setCart(res.data))
      .catch(err => console.log(err));
  }, [userId]);

  if (!cart) {
    return <h3 className="text-center mt-5">Loading Cart...</h3>;
  }

  // Calculations
  const totalItems = cart.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalOldPrice = cart.items.reduce(
    (sum, item) => sum + item.oldPrice * item.quantity,
    0
  );

  const youSaved = totalOldPrice - cart.totalAmount;

  return (
    <div className="container mt-4">
      <div className="row">

        {/* LEFT SIDE */}
        <div className="col-md-8">
          <h4 className="mb-3">
            My Cart ({totalItems} items)
          </h4>

          {cart.items.map(item => (
            <CartItem
              key={item.itemId}
              item={item}
              setCart={setCart}
            />
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="col-md-4">
          <div className="cart-summary card p-3">
            <h5>PRICE DETAILS</h5>
            <hr />

            <div className="d-flex justify-content-between">
              <span>Total Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="d-flex justify-content-between">
              <span>Total Amount</span>
              <span>₹{cart.totalAmount}</span>
            </div>

            <hr />

            <h6 className="text-success">
              You saved ₹{youSaved}
            </h6>

            <button className="btn btn-warning w-100 mt-3">
              Place Order
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartPage;
