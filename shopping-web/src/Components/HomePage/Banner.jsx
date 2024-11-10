import React, { useState, useEffect } from "react";
import { Carousel } from "@material-tailwind/react";
import { getBanner } from "../../Services/home.services";

const Banner = () => {
  const [Images, setImages] = useState([]);
  const [Error, setError] = useState("");

  // useEffect(
  //   // () => async () => {
  //   //   const response = await getBanner();
  //   //   if (!response.status.error) {
  //   //     setImages(response.payload);
  //   //   } else {
  //   //     setError(response.status.message);
  //   //   }
  //   // },
  //   []
  // );

  return (
    <>
      {Error !== "" ? (
        <h2>Error</h2>
      ) : (
        <Carousel
          className="max-h-96 overflow-hidden lg:h-96 md:64 sm:64"
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                    activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
        >
          {Images.map((item) => (
            <img src={item} alt="" className="object-fill w-full h-full" />
          ))}
        </Carousel>
      )}
    </>
  );
};

export default Banner;
