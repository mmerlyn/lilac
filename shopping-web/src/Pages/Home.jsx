import React from "react";
import Banner from "../Components/HomePage/Banner";
import SectionList from "../Components/HomePage/SectionList";
import Collage from "../Components/HomePage/Collage";

const Home = () => {
  return (
    <div className="mx-24 lg:mt-24 md:mt-20 sm:mt-32 mt-32 mb-10">
      <Collage />
      <SectionList />
    </div>
  );
};

export default Home;
