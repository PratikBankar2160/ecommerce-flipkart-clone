import React, { useEffect, useState } from "react";
import "./BrandList.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BrandList = ({ categoryId }) => {
    const [brands, setBrands] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (!categoryId) return;

        axios.get(`http://localhost:8080/products/brands/${categoryId}`)
            .then((res) => {
                setBrands(res.data)
            })
            .catch(() => alert("Error fetching brands"));
    }, [categoryId]);

    const handleBrandClick = (brand) => {
        navigate("/brandProducts", {
            state: {
                categoryId,
                brand
            }
        });
    };

    return (
        <div>
            <div className="col-md-3">
                <div className="brand-sidebar p-3">
                    <h5 className="mb-3 fw-bold border-bottom pb-2">
                        Brands
                    </h5>

                    <ul className="nav flex-column brand-list">
                        {brands.map((brand, index) => (
                            <li className="nav-item" key={index}>
                                <span className="nav-link brand-item"
                                onClick={() => handleBrandClick(brand)}
                                >
                                    {brand}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>


    );
};

export default BrandList;
