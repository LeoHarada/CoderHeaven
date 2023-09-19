import React from "react";
import { LiaShoppingBagSolid } from "react-icons/lia";

const FilteredProducts = ({ category, onClick }) => {
    return (
        <div onClick={onClick}>
            <div className="text-3xl p-5 bg-yellow-500 rounded-full cursor-pointer">
                <LiaShoppingBagSolid />
            </div>
            <p className="text-center font-medium my-1 capitalize">
                {category}
            </p>
        </div>
    );
};

export default FilteredProducts;
