import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {

  let navigate = useNavigate();

  const addToCart = () => {

    let userId = 3;
    localStorage.setItem("userId", JSON.stringify(userId));

    


    let productId = product.id;

    axios.post("http://localhost:8080/cart/add", {
      userId,
      productId,
      quantity: 1
    })
      .then(() => {
        alert("Product added to cart");
        navigate("/cart")
      })
      .catch(() => {
        alert("Failed to add product");
      });


  }
  const discount =
    product.oldPrice
      ? Math.round(
        ((product.oldPrice - product.price) / product.oldPrice) * 100
      )
      : 0;

  return (
    <div className="product-card d-flex p-3 mb-3">

      {/* Image */}
      <div className="product-img">
        <img
          src={product.image || "https://via.placeholder.com/200"}
          alt={product.name}
        />
      </div>

      {/* Details */}
      <div className="product-details flex-grow-1 ms-4">
        <h5 className="product-title">{product.name}</h5>

        <div className="rating mb-2">
          <span className="badge bg-success me-2">4.6 ★</span>
          <span className="text-muted small">
            {product.brand}
          </span>
        </div>

        <ul className="product-specs">
          <li>{product.description}</li>
        </ul>

        <button
          className="btn btn-primary mt-auto"
          onClick={() => addToCart(product.id) }
        >
          Add to Cart
        </button>

      </div>

      {/* Price */}
      <div className="product-price text-end">
        <h4 className="fw-bold">₹{product.price}</h4>

        {product.oldPrice && (
          <div>
            <span className="text-muted text-decoration-line-through">
              ₹{product.oldPrice}
            </span>
            {/* 15% off */}
            <span className="text-success ms-2">
              {discount}% off
            </span>
          </div>
        )}

        <p className="text-danger small mt-1">Only {product.quantity} left</p>
        <p className="text-success small">Bank Offer</p>
      </div>
    </div>
  );
};

export default ProductCard;
