import React from "react";
import axios from "axios";

const CartItem = ({ item, setCart }) => {

  const userId = JSON.parse(localStorage.getItem("userId"));

  const updateQty = (itemId, change) => {
    axios.put(`http://localhost:8080/cart/quantity/${itemId}`, null, {
      params: { change, userId }
    })
    .then(res => setCart(res.data))
    .catch(() => alert("Failed to update quantity"));
  };

  return (
    <div className="card mb-3 p-3">
      <div className="row align-items-center">

        <div className="col-md-6">
          <h6>{item.productName}</h6>
          <p className="text-muted small">
            Product ID: {item.productId}
          </p>
        </div>

        <div className="col-md-2">
          <div className="d-flex align-items-center">
            <button
              className="btn btn-outline-secondary btn-sm"
              disabled={item.quantity === 1}
              onClick={() => updateQty(item.itemId, -1)}
            >
              −
            </button>

            <span className="mx-2">{item.quantity}</span>

            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => updateQty(item.itemId, 1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="col-md-4 text-end">
          <h6>₹{item.subTotal}</h6>
        </div>

      </div>
    </div>
  );
};

export default CartItem;
