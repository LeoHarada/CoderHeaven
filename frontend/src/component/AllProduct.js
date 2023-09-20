import React, { useEffect, useState } from "react";
import FilteredProducts from "./FilteredProducts";
import CardFeature from "./CardFeature";
import { useSelector } from "react-redux";

const AllProduct = ({ heading }) => {
    const productData = useSelector((state) => state.product.productList);
    const categoryList = [
        ...new Set(productData.map((product) => product.category)),
    ];
    const [dataFilter, setDataFilter] = useState([]);

    useEffect(() => {
        setDataFilter(productData);
    }, [productData]);

    const handleFilteredProducts = (category) => {
        const filter = productData.filter(
            (product) =>
                product.category.toLowerCase() === category.toLowerCase()
        );
        setDataFilter(() => {
            return [...filter];
        });
    };

    return (
        <div className="my-5">
            <h2 className="font-bold text-2xl text-slate-800 mb-4">
                {heading}
            </h2>
            <div className="flex gap-4 justify-center overflow-scroll scrollbar-none">
                {categoryList[0] &&
                    categoryList.map((product) => {
                        return (
                            <FilteredProducts
                                category={product}
                                onClick={() => handleFilteredProducts(product)}
                            />
                        );
                    })}
            </div>
            <div className="flex flex-wrap justify-center gap-4 my-4">
                {dataFilter.map((product) => {
                    return (
                        <CardFeature
                            key={product._id}
                            id={product._id}
                            name={product.name}
                            category={product.category}
                            price={product.price}
                            image={product.image}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default AllProduct;
