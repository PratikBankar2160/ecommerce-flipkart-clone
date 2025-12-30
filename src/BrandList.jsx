import React, { useEffect, useState } from "react";
import axios from "axios";

const BrandList = ({ categoryId }) => {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        if (!categoryId) return;

        axios.get(`http://localhost:8080/products/brands/${categoryId}`)
            .then((res) => {
                setBrands(res.data)
                console.log(res.data);
            })


            .catch(() => alert("Error fetching brands"));
    }, [categoryId]);

    return (
        <div className="container mt-3">
            <h5>Brands</h5>
            <div className="d-flex gap-3 flex-wrap">
                {brands.map(brand => (
                    <span key={brand.id} className="badge bg-secondary">
                        {brand}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default BrandList;
