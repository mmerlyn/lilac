import React from "react";

const Collage = () => {
  return (
    <div className="">
      <div className="grid grid-cols-3 gap-4 my-4">
        <div className="bg-white py-36 px-10"></div>
        <div className="bg-white p-4"></div>
        <div className="bg-white p-4"></div>
      </div>
      <div className="grid grid-cols-4 gap-4 my-4">
        <div className="bg-white py-36"></div>
        <div className="bg-white py-24"></div>
        <div className="bg-white py-24"></div>
        <div className="bg-white py-24"></div>
      </div>
    </div>
  );
};

export default Collage;
