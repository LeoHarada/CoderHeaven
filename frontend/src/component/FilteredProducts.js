import React from "react";
import { LiaShoppingBagSolid } from "react-icons/lia";

const FilteredProducts = ({ category, onClick, isActive }) => {
    return (
        <div onClick={onClick}>
            <div
                className={`text-3xl p-5 bg-yellow-500 rounded-full cursor-pointer ${
                    isActive ? "bg-red-600 text-white" : "bg-yellow-500"
                }`}
            >
                <LiaShoppingBagSolid />
            </div>
            <p className="text-center font-medium text-xs my-1 capitalize">
                {category}
            </p>
        </div>
    );
};

export default FilteredProducts;
