import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Navbar from './Navbar';
import Products from './Products';
import CategoryNavbar from './CategoryNavbar';
import BrandList from './BrandList';
import ProductList from './ProductList';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  return (
    <div>
      <Navbar />
      <CategoryNavbar onCategorySelect={setSelectedCategory} />
        <BrandList categoryId={selectedCategory} />

      <Routes>
        {/* Home */}
        {/* <Route
          path="/"
          element={
            <>
            </>
          }
        /> */}

        {/* Products */}
        <Route path="/products" element={<Products />} />
        <Route path="/brandProducts" element={<ProductList />} />

        {/* Login */}
        <Route path="/login" element={<h2>Login Page</h2>} />
        <Route path="/cart" element={<h2>Cart Page</h2>} />
      </Routes>
    </div>
  );
}

export default App;
