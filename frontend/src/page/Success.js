import React from "react";
import success from "../assets/success.gif";

const Success = () => {
    return (
        <div className="mt-10 flex flex-col w-full justify-center items-center">
            <img src={success} className="w-full max-w-sm" />
            <p className="text-slate-500 text-3xl font-bold mt-5">
                Payment was successful! Thank you for your purchase.
            </p>
        </div>
    );
};

export default Success;
