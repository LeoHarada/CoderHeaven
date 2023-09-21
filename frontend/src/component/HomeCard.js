import React from "react";
import { Link } from "react-router-dom";

const HomeCard = ({ name, image, price, category, loading, id }) => {
    return (
        <div className="bg-white shadow-md p-2 rounded min-w-[150px] drop-shadow-lg hover:shadow-lg">
            {name ? (
                <>
                    <Link
                        to={`/products/${id}`}
                        onClick={() =>
                            window.scrollTo({
                                top: "0",
                                behavior: "smooth",
                            })
                        }
                        className="flex flex-col justify-center items-center"
                    >
                        <div className="w-40 min-h-[150px]">
                            <img src={image} className="h-full w-full" />
                        </div>
                        <h3 className="font-semibold text-slate-600 text-center capitalize text-lg">
                            {name}
                        </h3>
                        <p className="text-center text-slate-500 font-medium">
                            {category}
                        </p>
                        <p className="text-center font-bold">
                            <span className="text-red-500">$</span>
                            <span>{price}</span>
                        </p>
                    </Link>
                </>
            ) : (
                <div className="flex justify-center items-center h-full">
                    <p>{loading}</p>
                </div>
            )}
        </div>
    );
};

export default HomeCard;
