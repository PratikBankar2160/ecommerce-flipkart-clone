import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const location = useLocation();
  const { categoryId, brand } = location.state || {};

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!categoryId || !brand) return;

    setLoading(true);
    axios
      .get(`http://localhost:8080/products/category/${categoryId}/brand/${brand}`)
      .then(res => setProducts(res.data))
      .catch(() => alert("Error loading products"))
      .finally(() => setLoading(false));
  }, [categoryId, brand]);

  if (!categoryId || !brand) {
    return (
      <div className="container mt-4">
        <h5>Please select a category and brand</h5>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Products - {brand}</h4>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {products.length > 0 ? (
            products.map(p => (
              <ProductCard key={p.id} product={p} />
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
