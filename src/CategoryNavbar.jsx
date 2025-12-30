import React, { useEffect, useState } from "react";
import "./CategoryNavbar.css";
import axios from "axios";

const CategoryNavbar = ({ onCategorySelect }) => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/categories")
            .then(res => setCategories(res.data))
            .catch(() => alert("Error fetching categories"));
    }, []);

    return (
        <div className="category-navbar">
            {categories.map((cat) => (
                <div
                    key={cat.id}
                    className="category-item"
                    onClick={() => onCategorySelect(cat.id)}
                >
                    {cat.name}
                </div>
            ))}
        </div>
    );
};

export default CategoryNavbar;