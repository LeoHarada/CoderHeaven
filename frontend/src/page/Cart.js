import React from "react";
import CartProduct from "../component/CartProduct";
import emptyCartImage from "../assets/empty.gif";

const Cart = () => {
    const productCartItem = useSelector((state) => state.product.cartItem);
    const totalPrice = productCartItem.reduce(
        (acc, curr) => acc + parseInt(curr.total),
        0
    );
    const totalQty = productCartItem.reduce(
        (acc, curr) => acc + parseInt(curr.qty),
        0
    );

    return (
        <>
            <div className="p-2 md:p-4">
                <h2 className="text-lg md:-text-2xl font-bold text-slate-600">
                    Your Cart Items
                </h2>
                {productCartItem[0] ? (
                    <div className="my-4 flex gap-3">
                        {/* display cart items */}
                        <div className="w-full max-w-3xl ">
                            {productCartItem.map((product) => {
                                return (
                                    <CartProduct
                                        key={product._id}
                                        id={product._id}
                                        name={product.name}
                                        image={product.image}
                                        category={product.category}
                                        qty={product.qty}
                                        total={product.total}
                                        price={product.price}
                                    />
                                );
                            })}
                        </div>

                        {/* total cart items */}
                        <div className="w-full max-w-sm ml-auto">
                            <h2 className="bg-blue-500 text-white p-2 text-lg">
                                Summary
                            </h2>
                            <div className="flex w-full py-2 text-lg border-b">
                                <p>Total Quantity :</p>
                                <p className="ml-auto w-32 font-bold">
                                    {totalQty}
                                </p>
                            </div>
                            <div className="flex w-full py-2 text-lg border-b">
                                <p>Total Price</p>
                                <p className="ml-auto w-32 font-bold">
                                    <span className="text-red-500">$</span>
                                    {totalPrice}
                                </p>
                            </div>
                            <button className="bg-red-500 text-lg font-bold py-2 text-white">
                                Payment
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex w-full justify-center items-center">
                            <img
                                src={emptyCartImage}
                                className="w-full max-w-sm"
                            />
                            <p className="text-slate-500 text-3xl font-bold">
                                Cart is empty!
                            </p>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Cart;
