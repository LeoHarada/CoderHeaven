import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const userData = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleShowMenu = () => {
        setShowMenu((prev) => !prev);
    };

    const handleLogout = () => {
        dispatch(logoutRedux());
        toast("Logged out successfully.");
    };

    const cartItemNumber = useSelector((state) => state.product.cartItem);

    return (
        <header className="fixed shadow-md w-full h-23 px-2 md:px-4 z-50 bg-white">
            {/* desktop */}

            <div className="flex mt-1 items-center h-full justify-between">
                <Link to={""}>
                    <div className="h-20">
                        <img src={logo} className="h-full" />
                    </div>
                </Link>

                <div className="flex items-center gap-4 md:gap-7">
                    <nav className="gap-4 md:gap-6 text-base font-bold md:text-lg hidden md:flex">
                        <Link className="hover:text-red-500" to={""}>
                            Home
                        </Link>
                        <Link className="hover:text-red-500" to={"products"}>
                            Products
                        </Link>
                        <Link className="hover:text-red-500" to={"about"}>
                            About
                        </Link>
                        <Link className="hover:text-red-500" to={"contact"}>
                            Contact
                        </Link>
                    </nav>
                    <div className="text-2xl text-slate-600 relative hover:text-red-500">
                        <Link to={"/cart"}>
                            <BsCartFill />
                            <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center">
                                {cartItemNumber.length}
                            </div>
                        </Link>
                    </div>
                    <div className="text-slate-600" onClick={handleShowMenu}>
                        <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md hover:text-red-500">
                            {userData.image ? (
                                <img
                                    src={userData.image}
                                    className="h-full w-full"
                                />
                            ) : (
                                <HiOutlineUserCircle className="hover:text-red-500" />
                            )}
                        </div>
                        {showMenu && (
                            <div className="absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                                {userData.email ===
                                    process.env.REACT_APP_ADMIN_EMAIL && (
                                    <Link
                                        to={"newproduct"}
                                        className="whitespace-nowrap cursor-pointer px-2 hover:text-red-500"
                                    >
                                        New Product
                                    </Link>
                                )}
                                {userData.firstName ? (
                                    <p
                                        className="cursor-pointer font-semibold text-white px-2 bg-red-500 hover:bg-purple-600 rounded-sm"
                                        onClick={handleLogout}
                                    >
                                        Logout ({userData.firstName}){" "}
                                    </p>
                                ) : (
                                    <Link
                                        to={"login"}
                                        className="whitespace-nowrap cursor-pointer px-2 hover:text-red-500"
                                    >
                                        Login
                                    </Link>
                                )}
                                <nav className="text-base md:text-lg flex flex-col md:hidden">
                                    <Link to={""} className="px-2 py-1">
                                        Home
                                    </Link>
                                    <Link to={"products"} className="px-2 py-1">
                                        Products
                                    </Link>
                                    <Link to={"about"} className="px-2 py-1">
                                        About
                                    </Link>
                                    <Link to={"contact"} className="px-2 py-1">
                                        Contact
                                    </Link>
                                </nav>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* mobile */}
        </header>
    );
};

export default Header;
