import React, { useRef } from "react";
import HomeCard from "../component/HomeCard";
import { useSelector } from "react-redux";
import CardFeature from "../component/CardFeature";
import { GrPrevious, GrNext } from "react-icons/gr";
import AllProduct from "../component/AllProduct";

const Home = () => {
    const productData = useSelector((state) => state.product.productList);
    const homeProductCardList = productData.slice(0, 4);
    const homeProductCardListFeatured = productData.filter(
        (product) => product.category === "monitors",
        []
    );
    const loadingArray = new Array(4).fill(null);
    const loadingArrayFeature = new Array(10).fill(null);
    const slideProductRef = useRef();

    const nextProduct = () => {
        slideProductRef.current.scrollLeft += 200;
    };

    const prevProduct = () => {
        slideProductRef.current.scrollLeft -= 200;
    };

    return (
        <div className="p-2 md:p-4">
            <div className="md:flex gap-4 py-2">
                <div className="md:w-1/2">
                    <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
                        <p className="text-sm font-medium text-slate-900">
                            Bike Delivery
                        </p>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
                            className="h-7"
                        />
                    </div>
                    <h2 className="text-4xl md:text-7xl font-bold py-3">
                        The fasted Delivery in
                        <span className="text-red-600 text-"> Your Home</span>
                    </h2>
                    <p className="py-3 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Volutpat ac tincidunt vitae semper quis
                        lectus. Suspendisse interdum consectetur libero id
                        faucibus nisl tincidunt eget. Tortor pretium viverra
                        suspendisse potenti nullam ac tortor vitae. In vitae
                        turpis massa sed. Interdum varius sit amet mattis
                        vulputate enim. Vel orci porta non pulvinar neque
                        laoreet suspendisse interdum consectetur. Donec ac odio
                        tempor orci dapibus ultrices in. Ut ornare lectus sit
                        amet est placerat in egestas. Quam pellentesque nec nam
                        aliquam sem et tortor consequat id. Vitae elementum
                        curabitur vitae nunc sed velit dignissim sodales.
                        Ultrices sagittis orci a scelerisque purus semper eget
                        duis at. Nisi est sit amet facilisis magna etiam tempor
                        orci. Egestas integer eget aliquet nibh praesent
                        tristique magna. Tempor orci eu lobortis elementum nibh.
                        Eleifend donec pretium vulputate sapien. Gravida arcu ac
                        tortor dignissim convallis.
                    </p>
                    <button className="font-bold bg-red-500 text-slate-200 px-4 py-2 rounderd-md">
                        Order Now
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
                    <h2 className="font-bold text-2xl text-slate-800 mb-4">
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
            <AllProduct header={"All Products"} />
        </div>
    );
};

export default Home;
