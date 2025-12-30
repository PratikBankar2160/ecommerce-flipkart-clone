import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100 shadow-sm">

        <img
          src="https://via.placeholder.com/300"
          // src="https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/a/c/k/-original-imagtc5fuzkvczr7.jpeg?q=70"
          className="card-img-top"
          alt={product.name}
        />

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>

          <p className="card-text text-muted small">
            {product.description}
          </p>

          <div className="mb-2">
            <span className="fw-bold text-success fs-5">
              ₹{product.price}
            </span>

            {product.oldPrice && (
              <span className="text-muted text-decoration-line-through ms-2">
                ₹{product.oldPrice}
              </span>
            )}
          </div>

          <button className="btn btn-primary mt-auto">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
