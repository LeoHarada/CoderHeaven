import React from "react";
import cancelled from "../assets/cancelled.gif";

const Cancel = () => {
    return (
        <div className="mt-10 flex flex-col w-full justify-center items-center">
            <img src={cancelled} className="w-full max-w-sm" />
            <p className="text-slate-500 text-3xl font-bold mt-5">
                Payment was cancelled!
            </p>
        </div>
    );
};

export default Cancel;
