import React, { useState } from "react";
import UserIcon from "../assets/profileIcon.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const handleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = data;
        if (email && password) {
            alert("Logged-in successfully!");
        } else {
            alert("Username and/or Password are incorrect.");
        }
    };

    return (
        <div className="p-3 md:p-4">
            <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
                {/* <h1 className='text-center text-2xl font-bold'>Sign up</h1> */}
                <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
                    <img src={UserIcon} className="w-full" />
                </div>

                <form
                    className="w-full py-3 flex flex-col"
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="email">Email</label>
                    <input
                        type={"email"}
                        id="email"
                        name="email"
                        className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                        value={data.email}
                        onChange={handleOnChange}
                    />

                    <label htmlFor="password">Password</label>
                    <div className="flex bg-slate-200 px-2 py-1 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            className="w-full bg-slate-200 border-none outline-none"
                            value={data.password}
                            onChange={handleOnChange}
                        />
                        <span
                            className="flex text-xl"
                            onClick={handleShowPassword}
                        >
                            {showPassword ? <BiShow /> : <BiHide />}
                        </span>
                    </div>

                    <button className="max-w-[120px] w-full bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4">
                        Login
                    </button>
                </form>
                <p className="text-left text-sm mt-2">
                    Don't have an existing account?{" "}
                    <Link to={"/signup"} className="text-red-500 underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
