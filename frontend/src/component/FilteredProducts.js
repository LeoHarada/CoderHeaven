import React from "react";
import { FcFilledFilter } from "react-icons/fc";

const FilteredProducts = ({ category, onClick, isActive }) => {
    return (
        <div onClick={onClick}>
            <div
                className={`text-3xl p-5 hover:bg-red-500 rounded-full cursor-pointer ${
                    isActive ? "bg-red-500 text-white" : "bg-white"
                }`}
            >
                <FcFilledFilter />
            </div>
            <p className="text-center font-bold text-xs my-1 capitalize">
                {category}
            </p>
        </div>
    );
};

export default FilteredProducts;
