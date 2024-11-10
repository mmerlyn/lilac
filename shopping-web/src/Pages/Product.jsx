import React, { useState } from "react";
import { useEffect } from "react";
import { getProduct } from "../Services/product.service";
import { useSearchParams } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";

const Product = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [query] = useSearchParams();

  const { userId, productId } = {
    userId: query.get("userId"),
    productId: query.get("productId"),
  };

  const [imageId, setImage] = useState(1);

  const handleClick = (i) => {
    setImage(i);
  };

  useEffect(() => {
    getProduct(userId, productId).then((response) => {
      setData(response);
      setIsLoading(false);
    });
  }, [userId, productId]);

  return (
    <div className="antialiased mx-2 lg:my-24 md:my-20 sm:my-32 my-32">
      <div className="flex flex-col lg:flex-row mx-auto justify-center">
        <div className=" shadow-md items-justify-center bg-white">
          {isLoading ? (
            <div className="grid justify-items-center mt-[30vh]">
              <Spinner color="blue" className="h-16 w-16" />
            </div>
          ) : (
            <>
              <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <a href="/" className="hover:underline hover:text-gray-600">
                    Home
                  </a>
                  <span>
                    <svg
                      className="h-5 w-5 leading-none text-gray-300"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                  <a href="/" className="hover:underline hover:text-gray-600">
                    Electronics
                  </a>
                  <span>
                    <svg
                      className="h-5 w-5 leading-none text-gray-300"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                  <span>Headphones</span>
                </div>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 ">
                <div className="flex flex-col md:flex-row -mx-4">
                  <div className="md:flex-1 px-4">
                    <div x-data="{ image: 1 }" x-cloak>
                      <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                        {data.payload.imageUrl.map((item, index) => (
                          <div
                            id={index}
                            className={`h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center ${
                              index === imageId ? "block" : "hidden"
                            }`}
                          >
                            <img
                              src={item}
                              alt=""
                              className="h-72 bg-cover"
                            ></img>
                          </div>
                        ))}
                      </div>

                      <div className="flex -mx-2 mb-4">
                        {data.payload.imageUrl.map((item, index) => (
                          <div key={index} className="flex-1 px-2">
                            <button
                              onClick={() => handleClick(index)}
                              className={`focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center ${
                                imageId === index
                                  ? "ring-2 ring-indigo-300 ring-inset"
                                  : ""
                              }`}
                            >
                              <img src={item} alt="" className="bg-cover"></img>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="md:flex-1 px-4">
                    <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                      {data.payload.title}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      By{" "}
                      <a href="/" className="text-indigo-600 hover:underline">
                        {data.payload.brand}
                      </a>
                    </p>

                    <div className="flex items-center space-x-4 my-4">
                      <div>
                        <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                          <span className="text-indigo-400 mr-1 mt-1">$</span>
                          <span className="font-bold text-indigo-600 text-3xl">
                            {data.payload.listPrice}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-green-500 text-xl font-semibold">
                          {data.payload.discount}
                        </p>
                        <p className="text-gray-400 text-sm">
                          Inclusive of all Taxes.
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-500">{data.payload.description}</p>

                    <div className="flex py-4 space-x-4">
                      <div className="relative">
                        <div className="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold">
                          Qty
                        </div>
                        <select className="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 flex items-end pb-1">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select>

                        <svg
                          className="w-5 h-5 text-gray-400 absolute right-0 bottom-0 mb-2 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                          />
                        </svg>
                      </div>

                      <button
                        type="button"
                        className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
