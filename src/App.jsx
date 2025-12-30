import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Navbar from './Navbar';
import Products from './Products';
import CategoryNavbar from './CategoryNavbar';
import BrandList from './BrandList';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  return (
    <div>
      <Navbar />
      <CategoryNavbar onCategorySelect={setSelectedCategory} />
      <BrandList categoryId={selectedCategory} />
      <Routes>
        <Route path="/products" element={<Products />} />
      </Routes>

    </div>
  );
}

export default App;
