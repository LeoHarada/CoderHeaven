import React, { useEffect, useState } from "react";
import FilteredProducts from "./FilteredProducts";
import CardFeature from "./CardFeature";
import { useSelector } from "react-redux";

const AllProduct = () => {
    const productData = useSelector((state) => state.product.productList);
    const categoryList = [
        ...new Set(productData.map((product) => product.category)),
    ];
    const [filterBy, setFilterBy] = useState("");
    const [dataFilter, setDataFilter] = useState([]);

    useEffect(() => {
        setDataFilter(productData);
    }, [productData]);

    const handleFilteredProducts = (category) => {
        setFilterBy(category);
        const filter = productData.filter(
            (product) =>
                product.category.toLowerCase() === category.toLowerCase()
        );
        setDataFilter(() => {
            return [...filter];
        });
    };

    const loadingArrayFeature = new Array(10).fill(null);

    return (
        <div className="mt-10">
            <div className="flex md:flex-wrap gap-4 md:justify-center overflow-scroll scrollbar-none">
                {categoryList[0] ? (
                    categoryList.map((product) => {
                        return (
                            <FilteredProducts
                                category={product}
                                key={product}
                                isActive={
                                    product.toLowerCase() ===
                                    filterBy.toLowerCase()
                                }
                                onClick={() => handleFilteredProducts(product)}
                            />
                        );
                    })
                ) : (
                    <div className="min-h-[150px] flex justify-center items-center">
                        <p>Loading...</p>
                    </div>
                )}
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
                {dataFilter[0]
                    ? dataFilter.map((product) => {
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
                      })
                    : loadingArrayFeature.map((product, index) => (
                          <CardFeature
                              loading="Loading..."
                              key={index + "allProducts"}
                          />
                      ))}
            </div>
        </div>
    );
};

export default AllProduct;
