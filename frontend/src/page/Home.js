import React, { useRef } from "react";
import HomeCard from "../component/HomeCard";
import { useSelector } from "react-redux";
import CardFeature from "../component/CardFeature";
import { GrPrevious, GrNext } from "react-icons/gr";
import AllProduct from "../component/AllProduct";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const productData = useSelector((state) => state.product.productList);
    const navigate = useNavigate();

    const copiedProductData = [...productData];
    const shuffledProducts = copiedProductData.sort(() => Math.random() - 0.5);
    const homeProductCardList = shuffledProducts.slice(0, 6);

    const homeProductCardListFeatured = shuffledProducts.slice(0, 15);

    const loadingArray = new Array(4).fill(null);
    const loadingArrayFeature = new Array(10).fill(null);
    const slideProductRef = useRef();

    const nextProduct = () => {
        slideProductRef.current.scrollLeft += 200;
    };

    const prevProduct = () => {
        slideProductRef.current.scrollLeft -= 200;
    };

    const startShopping = () => {
        navigate("/products");
    };

    return (
        <div className="p-2 mt-7 md:p-4">
            <div className="md:flex gap-4 py-2">
                <div className="md:w-1/2">
                    <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
                        <p className="text-sm font-medium text-slate-900">
                            Fast Delivery
                        </p>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/726/726455.png"
                            className="h-7"
                        />
                    </div>
                    <h2 className="text-4xl md:text-7xl font-bold py-3">
                        The fastest Delivery to
                        <span className="text-red-500 text-"> Your Home</span>
                    </h2>
                    <p className="py-3 text-base">
                        Welcome to our one-stop destination for web developer
                        accessories! Discover the perfect gear to enhance your
                        coding experience, whether you're a seasoned programmer
                        or just starting your journey in web development.
                        Explore a wide range of essentials like high-quality
                        headphones for immersive coding sessions, responsive
                        keyboards that amplify your typing speed, crystal-clear
                        monitors for optimal display, ergonomic mice for precise
                        navigation, and webcams for seamless virtual meetings.
                        Our curated selection of accessories is designed to
                        elevate your productivity and provide the tools you need
                        to excel in your web development endeavors. Browse our
                        collection and equip yourself with the best tech gear to
                        make coding both efficient and enjoyable. Start shopping
                        today and elevate your web development game!
                    </p>
                    <button
                        className="font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md hover:bg-white hover:text-red-500 mt-4"
                        onClick={startShopping}
                    >
                        Start Shopping
                    </button>
                </div>
                <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
                    {homeProductCardList[0]
                        ? homeProductCardList.map((product) => {
                              return (
                                  <HomeCard
                                      key={product._id}
                                      id={product._id}
                                      image={product.image}
                                      name={product.name}
                                      price={product.price}
                                      category={product.category}
                                  />
                              );
                          })
                        : loadingArray.map((product, index) => {
                              return (
                                  <HomeCard
                                      key={index + "loading"}
                                      loading={"Loading..."}
                                  />
                              );
                          })}
                </div>
            </div>
            <div className="">
                <div className="flex w-full items-center">
                    <h2 className="font-bold text-2xl text-slate-800 mb-4 mt-10">
                        Featured Products
                    </h2>
                    <div className="ml-auto flex gap-4">
                        <button
                            onClick={prevProduct}
                            className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
                        >
                            <GrPrevious />
                        </button>
                        <button
                            onClick={nextProduct}
                            className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
                        >
                            <GrNext />
                        </button>
                    </div>
                </div>
                <div
                    className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
                    ref={slideProductRef}
                >
                    {homeProductCardListFeatured[0]
                        ? homeProductCardListFeatured.map((product) => {
                              return (
                                  <CardFeature
                                      key={product._id + "homeproducts"}
                                      id={product._id}
                                      name={product.name}
                                      category={product.category}
                                      price={product.price}
                                      image={product.image}
                                  />
                              );
                          })
                        : loadingArrayFeature.map((product, index) => (
                              <CardFeature
                                  loading="Loading..."
                                  key={index + "cartLoading"}
                              />
                          ))}
                </div>
            </div>
            <h2 className="font-bold text-2xl text-slate-800 mt-10 flex justify-center">
                All Products
            </h2>
            <AllProduct />
        </div>
    );
};

export default Home;
