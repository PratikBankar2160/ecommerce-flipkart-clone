import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

const Products = () => {
  // const products = [
  //   {
  //     id: 1,
  //     name: "Samsung Galaxy S24",
  //     description: "Samsung flagship smartphone",
  //     price: 69999,
  //     oldPrice: 79999
  //   },
  //   {
  //     id: 2,
  //     name: "iPhone 15",
  //     description: "Apple flagship smartphone",
  //     price: 79999,
  //     oldPrice: 89999
  //   }
  // ];

  const [products, setProducts] = useState([]);



  useEffect(() => {
    axios.get("http://localhost:8080/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        alert("Something wrong in get method.")
      })
  },[])

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Products</h3>

      <div className="row">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default Products;
