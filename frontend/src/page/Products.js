import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import AllProduct from "../component/AllProduct";
import { useSelector, useDispatch } from "react-redux";
import { addCartItem } from "../redux/productSlice";

const Products = () => {
    const { filterBy } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const productData = useSelector((state) => state.product.productList);
    const productDisplay = productData.filter(
        (product) => product._id === filterBy
    )[0];

    const handleAddCartProduct = (e) => {
        dispatch(addCartItem(productDisplay));
    };

    const handleBuy = () => {
        dispatch(addCartItem(productDisplay));
        navigate("/cart");
    };

    return (
        <div className="p-2 mt-10 md:p-4">
            <div className="w-full max-w-4xl flex flex-col items-center m-auto bg-white">
                <div className="overflow-hidden p-5">
                    <img
                        src={productDisplay.image}
                        className="hover:scale-105 transition-all h-full w-full max-w-lg flex justify-center items-center"
                    />
                </div>
                <div className="flex flex-col items-center gap-1">
                    <h3 className="font-semibold text-slate-600 capitalize text-2xl md:text-4xl">
                        {productDisplay.name}
                    </h3>
                    <p className="text-slate-500 font-medium text-2xl">
                        {productDisplay.category}
                    </p>
                    <p className="font-bold md:text-2xl">
                        <span className="text-red-500">$</span>
                        <span>{productDisplay.price}</span>
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={handleBuy}
                            className="bg-red-500 text-white font-bold py-1 mt-2 rounded hover:bg-white min-w-[100px]"
                        >
                            Buy
                        </button>
                        <button
                            onClick={handleAddCartProduct}
                            className="bg-red-500 text-white font-bold py-1 mt-2 rounded hover:bg-white min-w-[100px]"
                        >
                            Add to Cart
                        </button>
                    </div>
                    <div className="flex flex-col p-4">
                        <p className="text-slate-600 font-bold">
                            Description :{" "}
                        </p>
                        <p>{productDisplay.description}</p>
                    </div>
                </div>
            </div>
            <AllProduct headering={"Related Products"} />
        </div>
    );
};

export default Products;
